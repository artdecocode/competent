import makeIo from './lib/make-io'

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
 * @param {!Array<!_competent.ExportedComponent>} components
 */
const makeJs = (components) => {
  const s = components.map(makeComponent)
  return '[' + s.join(',\n') + ']'
}

const defineIo = (io = true) => {
  if (!io) return ''
  return `${makeIo}
const io = makeIo(${typeof io == 'string' ? `'${io}'` : ''});`
}

/**
 * From the array of exported components, creates an ES6 modules script that will render them on a page using Preact.
 * @param {!Array<!_competent.ExportedComponent>} components The list of exported components
 * @param {string} componentsLocation The location of the module which exports a default object with components relative to where this file will be placed.
 * @param {boolean} [includeH=false] Imports the `h` pragma from preact. By default is disabled, because can be added automatically by `Depack` and `@idio/frontend`.
 * @param {Object} [props] Properties.
 * @param {boolean|string} [io=false] Should the generated script use the intersection observer. When a string is passed, it is used as the root margin option (default is, `0px 0px 76px 0px`)
 */
const makeComponentsScript = (components, componentsLocation, includeH = false, props = {}, io = false ) => {
  const p = Object.keys(props).map((propName) => {
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
  const s = `import { render${includeH ? ', h' : ''} } from 'preact'
`+`import Components from '${componentsLocation}'

${defineIo(io)}${makeJs(components)}
  .map(({ key, id, props = {}, children }) => {
    const el = document.getElementById(id)
    if (!el) {
      console.warn('Parent element for component %s with id %s not found', key, id)
      return
    }
    const parent = el.parentElement
    if (!parent) {
      console.warn('Parent of element for component %s with id %s not found', key, id)
      return
    }
    const Comp = Components[key]
    if (!Comp) {
      console.warn('Component with key %s was not found.', key)
      return
    }
${p ? `    ${p}` : ''}
    ${ifIo}
  })
`
  return s
}

// render(h(Comp, props, children), parent, el)

export default makeComponentsScript

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').ExportedComponent} _competent.ExportedComponent
 */