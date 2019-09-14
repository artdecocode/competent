import write from '@wrote/write'
import { join } from 'path'

const makeProps = (props) => {
  const keys = Object.keys(props)
  return `{
  ${keys.map((key) => {
    const k = /-/.test(key) ? `'${key}'` : key
    return `${k}: '${`${props[key]}`.replace(/'/g, '\\\'')}'`
  }).join(',\n  ')}${keys.length ? ',' : ''}
}`
}

/**
 * @param {!_competent.ExportedComponent} component
 */
const makeComponent = (component) => {
  const arr = []
  arr.push(`key: '${component.key}'`)
  // arr.push(`Comp: ${cc(component.key)}`)
  arr.push(`id: '${component.id}'`)
  if (Object.keys(component.props).length)
    arr.push(`props: ${makeProps(component.props)}`)
  const c = component.children.filter(Boolean)
  if (c.length)
    arr.push(`children: ${JSON.stringify(component.children)}`)
  const j = arr.map((l) => l.replace(/^/mg, '  ')).join(',\n') + ','
  return `{
${j}
}`
}

/**
 * Page-specific meta object of how to invoke components.
 * @param {!Array<!_competent.ExportedComponent>} components
 */
const makeJs = (components) => {
  const s = components.map((c) => makeComponent(c))
  return `/** @type {!Array<!preact.PreactProps>} */
const meta = [${s.join(',\n')}]`
}

// todo: test escaped \"prop\": value
/**
 * @param {boolean|!Object} io
 */
export const defineIo = (io = true) => {
  if (!io) return ''
  return `const io = makeIo(${typeof io != 'boolean' ? JSON.stringify(io)
    .replace(/([^\\])"([^"]+?)":/g, (m, n, k) => {
      return `${n == ',' ? ', ' : n}${k}: `
    })
    .replace(/^{/, '{ ')
    .replace(/}$/, ' }') : ''})`
}

// /**
//  * @param {!Array<!_competent.ExportedComponent>} components The list of exported components
//  */
// const makeNamed = (components) => {
//   if (!components.length) throw new Error('No components were given')
//   const c = components
//     .map(({ key }) => cc(key))
//     .filter((e, i, a) => a.indexOf(e) == i)
//     .join(', ')
//   return `{ ${c} }`
// }

const cc = (key) => {
  return key.replace(/(?:^|-)(.)/g, (m, l) => l.toUpperCase())
}

/**
 * @param {!Array<!_competent.ExportedComponent>} components The list of exported components
 */
const makeNamedMap = (components) => {
  const c = components
    .map(({ key }) => `'${key}': ${cc(key)}`)
    .filter((e, i, a) => a.indexOf(e) == i)
    .join(',\n  ')
  const map = `const __components = {\n  ${c},\n}`
  return map
}

/**
 * @param {!Array<!_competent.ExportedComponent>} components The list of exported components
 * @param {!Object<string, Array<?string>>} map The map of where to find components.
 */
const makeImports = (components, map) => {
  const keys = components.reduce((acc, { key }) => {
    if (acc.includes(key)) return acc
    acc.push(key)
    return acc
  }, [])
  const locs = {}
  keys.forEach((key) => {
    Object.entries(map).forEach(([file, array]) => {
      const i = array.indexOf(key)
      if (i < 0) return
      if (!locs[file]) locs[file] = []
      locs[file][i] = key
    })
  })
  const res = Object.entries(locs).map(([key, val]) => {
    return makeImport(val, key)
  })
  return res
}

/**
 * @param {!Array<?string>} values The array with imports, where the default one always has index of 0.
 */
const makeImport = (values, location, components = true) => {
  let [def, ...rest] = values
  rest = rest.filter(Boolean)
  let s = 'import '
  if (def) s += components ? cc(def) : def
  if (rest.length) {
    s += def ? ', ' : ''
    s += `{ ${(components ? rest.map(cc) : rest).join(', ')} }`
  }
  s += ` from '${location}'`
  return s
}


// ensured during the build step without compilation
const init = require(/*depack*/'./init')
const makeIo = require(/*depack*/'./make-io')

export const writeAssets = async (path) => {
  await write(join(path, './__competent-lib.js'), `export ${init.toString()}

export ${makeIo.toString()}`)
}

/**
 * From the array of exported components, creates an ES6 modules script that will render them on a page using Preact.
 * @param {!Array<!_competent.ExportedComponent>} components The list of exported components
 * @param {!_competent.MakeCompsConfig} opts
 */
export default function makeComponentsScript(components, opts) {
  if (typeof opts != 'object') throw new Error('Options are required with at least a map.')
  const { map, externalAssets = false, io = false,
    includeH = false, props = {} } = opts

  // if (!assetsPath) throw new Error('Please specify the path where to write lib files.')
  if (!map) throw new Error('The map of where to import components from is required.')

  const imports = [
    makeImport([null, 'render', ...(includeH ? ['h'] : [])], 'preact', false),
    ...(externalAssets ? [
      makeImport([null, ...(io ? ['makeIo'] : []), 'init'], './__competent-lib', false),
      // ...(io ? [makeImport(['makeIo'], './make-io', false)] : []),
      // makeImport(['init'], './init', false),
    ] : []),
    ...makeImports(components, map),
  ].join('\n')

  const extendProps = Object.keys(props).map((propName) => {
    const val = props[propName]
    const s = `props.${propName} = ${val}`
    return s
  }).join('\n')

  const r = 'render(h(Comp, props, children), parent, el)'
  const ifIo = io ? `el.render = () => {
    ${r}
  }
  el.render.meta = { key, id }
  io.observe(el)` : r

  let s = imports + '\n\n'
  const Components = makeNamedMap(components)
  s += Components + '\n\n'
  if (!externalAssets) {
    s += init.toString() + '\n\n'
    if (io) s += makeIo.toString() + '\n\n'
  }
  if (io) s += defineIo(io) + '\n\n'
  s += makeJs(components)
  s += `
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const { parent, el } = init(id, key)
  const Comp = __components[key]
${extendProps ? `  ${extendProps}` : ''}
  ${ifIo}
})
`
  return s
}

// render(h(Comp, props, children), parent, el)

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').MakeCompsConfig} _competent.MakeCompsConfig
 */