import write from '@wrote/write'
import { join } from 'path'

const makeProps = (props) => {
  const keys = Object.keys(props)
  return `{
    ${keys.map((key) => {
    const k = /-/.test(key) ? `'${key}'` : key
    return `${k}: '${props[key]}'`
  }).join(',\n')}${keys.length ? ',' : ''}
  }`
}

/**
 * @param {!_competent.ExportedComponent} component
 */
const makeComponent = (component) => {
  const arr = []
  arr.push(`key: '${component.key}'`)
  arr.push(`id: '${component.id}'`)
  if (Object.keys(component.props).length)
    arr.push(`props: ${makeProps(component.props)}`)
  const c = component.children.filter(Boolean)
  if (c.length)
    arr.push(`children: ${JSON.stringify(component.children)}`)
  const j = arr.map((l) => `  ${l}`).join(',\n') + ','
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
  return '[' + s.join(',\n') + ']'
}

const defineIo = (io = true) => {
  if (!io) return ''
  return `const io = makeIo(${typeof io != 'boolean' ? JSON.stringify(io)
    .replace(/(,?)"(.+?)":/g, (m, c, k) => `${c ? ', ' : ''}${k}: `)
    .replace(/^{/, '{ ')
    .replace(/}$/, ' }') : ''});`
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
  const map = `const Components = {\n  ${c},\n}`
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
  const [def, ...rest] = values
  let s = 'import '
  if (def) s += components ? cc(def) : def
  if (rest.length) {
    s += def ? ', ' : ''
    s += `{ ${(components ? rest.map(cc) : rest).join(', ')} }`
  }
  s += ` from '${location}'`
  return s
}

/**
 * From the array of exported components, creates an ES6 modules script that will render them on a page using Preact.
 * @param {!Array<!_competent.ExportedComponent>} components The list of exported components
 * @param {!_competent.MakeCompsConfig} opts
 */
export default async function makeComponentsScript(components, opts) {
  if (typeof opts != 'object') throw new Error('Options are required with at least a map.')
  const { map, assetsPath, io = false,
    includeH = false, props = {} } = opts

  // if (!assetsPath) throw new Error('Please specify the path where to write lib files.')
  if (!map) throw new Error('The map of where to import components from is required.')

  // ensured during the build step without compilation
  const init = require(/*depack*/'./init')
  const makeIo = require(/*depack*/'./make-io')

  const Components = makeNamedMap(components)
  if (assetsPath) {
    await write(join(assetsPath, './init'), `${Components}

  export default${init.toString()}`)
    await write(join(assetsPath, './make-io'), `export default ${makeIo.toString()}`)
  }

  const imports = [
    makeImport([null, 'render', ...(includeH ? ['h'] : [])], 'preact', false),
    ...(assetsPath ? [
      ...(io ? [makeImport(['makeIo'], './make-io', false)] : []),
      makeImport(['init'], './init', false),
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
  if (!assetsPath) {
    s += Components + '\n\n'
    s += init.toString() + '\n\n'
    if (io) s += makeIo.toString() + '\n\n'
  }
  if (io) s += defineIo(io) + '\n\n'
  s += makeJs(components)
  s += `
  .map(({ key, id, props = {}, children }) => {
    const { Comp, parent, el } = init(id, key)
    if (!Comp) return
${extendProps ? `    ${extendProps}` : ''}
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