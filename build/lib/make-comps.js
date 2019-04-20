const makeProps = (props) => {
  const keys = Object.keys(props)
  return `{
    ${keys.map((key) => {
    const k = /-/.test(key) ? `'${key}'` : key
    return `${k}: '${props[key]}'`
  }).join(',\n')}${keys.length ? ',' : ''}
  }`
}
const makeComponent = (component) => {
  return `{
  key: '${component.key}',
  id: '${component.id}',
  props: ${makeProps(component.props)},
  children: ${JSON.stringify(component.children)},
}`
}
const makeJs = (components) => {
  const s = components.map(makeComponent)
  return '[' + s.join(',\n') + ']'
}

/**
 * From the array of exported components, creates an ES6 modules script that will render them on a page using Preact.
 * @param {!Array<{key:string, id: string, props: !Object, children:!Array<string>}>} components The list of exported components
 * @param {string} componentsLocation The location of the module which exports a default object with components relative to where this file will be placed.
 * @param {boolean} [includeH=false] Imports the `h` pragma from preact. By default is disabled, because can be added automatically by `Depack` and `@idio/frontend`.
 */
const makeComponentsScript = (components, componentsLocation, includeH = false) => {
  const s = `import { render${includeH ? ', h' : ''} } from 'preact'
`+`import Components from '${componentsLocation}'

${makeJs(components)}
  .map(({ key, id, props, children }) => {
    const el = document.getElementById(id)
    if (!el) {
      console.warn('Parent element for component %s with id %s not found', key, id)
      return
    }
    const parent = el.parentElement
    const Comp = Components[key]
    if (!Comp) {
      console.warn('Component with key %s was not found.', key)
      return
    }
    props.splendid = { export() {} }
    render(h(Comp, props, children), parent, el)
  })
`
  return s
}

module.exports=makeComponentsScript