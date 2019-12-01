import write from '@wrote/write'
import { join } from 'path'
import { createHash } from 'crypto'

const surround = (s) => {
  return `'${s}'`
}
const makeProps = (props) => {
  const keys = Object.keys(props)
  return `{
  ${keys.map((key) => {
    const k = /-/.test(key) ? `'${key}'` : key
    const value = props[key]
    const val = typeof value == 'string' ?
      surround(value.replace(/'/g, '\\\'')) : value
    return `${k}: ${val}`
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

const checkIds = (components) => {
  const ids = components.reduce((acc, { id }) => {
    if (!acc[id]) acc[id] = 0
    acc[id]++
    return acc
  }, {})
  Object.entries(ids).forEach(([key, value]) => {
    if (value > 1) console.error('[components] ID %s encountered %s times.', key, value)
  })
}
/**
 * Page-specific meta object of how to invoke components.
 * @param {!Array<!_competent.ExportedComponent>} components
 */
const makeJs = (components, preact) => {
  const cs = components.map(({ id, ...comp }) => {
    const j = JSON.stringify(comp)
    const hash = createHash('md5').update(j).digest('hex').toString()
    return { ...comp, id, hash }
  })
  checkIds(cs) // just printing...
  let byHash = cs.reduce((acc, current) => {
    const { hash } = current
    if (!(hash in acc)) acc[hash] = []
    acc[hash].push(current)
    return acc
  }, {})
  byHash = Object.keys(byHash).sort().reduce((acc, key) => {
    acc[key] = byHash[key]
    return acc
  }, {})

  const sorted = Object.values(byHash).map((comps) => {
    if (comps.length < 2) return comps[0]

    const ids = comps.map(({ id }) => id).sort()
    const comp = comps[0]
    comp.id = ids
    return comp
  }, [])

  const s = sorted.map((c) => makeComponent(c))
  return `${preact ? '/** @type {!Array<!preact.PreactProps>} */\n' : ''
  }const meta = [${s.join(',\n')}]`
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
    .sort()
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
  }).sort()
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
const start = require(/*depack*/'./start')
const preactProxy = require(/*depack*/'./preact-proxy')
const startPlain = require(/*depack*/'./start-plain')

export const writeAssets = async (path) => {
  await write(join(path, './__competent-lib.js'), `export ${init.toString()}

export ${makeIo.toString()}

/**
 * @param {_competent.RenderMeta} meta
 * @param {function(new:_competent.PlainComponent, Element, Element)} Comp
 */
export ${startPlain.toString()}

/**
 * This is the class to provide render and unrender methods via standard API
 * common for Preact and Plain components.
 */
${preactProxy.toString()}

/**
 * @param {_competent.RenderMeta} meta
 */
export ${start.toString()}`)
}

/**
 * From the array of exported components, creates an ES6 modules script that will render them on a page using Preact.
 * @param {!Array<!_competent.ExportedComponent>} components The list of exported components
 * @param {!_competent.MakeCompsConfig} opts
 */
export default function makeComponentsScript(components, opts) {
  if (typeof opts != 'object') throw new Error('Options are required with at least a map.')
  const { map, io = false,
    includeH = false, props = {}, preact = 'preact' } = opts
  let { externalAssets = false } = opts

  // if (!assetsPath) throw new Error('Please specify the path where to write lib files.')
  if (!map) throw new Error('The map of where to import components from is required.')
  if (externalAssets === true) externalAssets = '.'

  const imports = [
    ...(preact ? [
      makeImport([null, 'Component', 'render', ...(includeH ? ['h'] : []),
      ], preact, false)] : []
    ),
    ...(externalAssets ? [
      makeImport([null,
        ...(io ? ['makeIo'] : []),
        'init', preact ? 'start' : 'startPlain'], `${externalAssets}/__competent-lib`, false),
    ] : []),
    ...makeImports(components, map),
  ].join('\n')

  const extendProps = Object.keys(props).map((propName) => {
    const val = props[propName]
    const s = `  props.${propName} = ${val}`
    return s
  }).join('\n')

  const r = `start${preact ? '' : 'Plain'}(renderMeta, Comp, comp, el, parent, props, children${preact ? ', { render, Component, h }' : ''})`
  const ifIo = io ? `el.render = () => {
    comp = ${r}
    return comp
  }
  el.render.meta = renderMeta
  io.observe(el)` : `comp = ${r}`

  let s = imports + '\n\n'
  const Components = makeNamedMap(components)
  s += Components + '\n\n'
  if (!externalAssets) {
    s += init.toString() + '\n\n'
    if (preact) s += preactProxy.toString() + '\n\n'
    s += (preact ? start : startPlain).toString() + '\n\n'
    if (io) s += makeIo.toString() + '\n\n'
  }
  if (io) s += defineIo(io) + '\n\n'
  s += makeJs(components, preact)
  s += `
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const Comp = __components[key]
  const plain = ${preact ? 'Comp.plain || (/^\\s*class\\s+/.test(Comp.toString()) && !Component.isPrototypeOf(Comp))' : true}
${extendProps}${extendProps ? '\n' : ''}
  const ids = id.split(',')
  ids.forEach((Id) => {
    const { parent, el } = init(Id, key)
    if (!el) return
    const renderMeta = /** @type {_competent.RenderMeta} */ ({ key, id: Id, plain })
    let comp
  ${ifIo.replace(/^/gm, '  ')}
  })
})
`
  return s
}

// render(h(Comp, props, children), parent, el)

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').MakeCompsConfig} _competent.MakeCompsConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').ExportedComponent} _competent.ExportedComponent
 */