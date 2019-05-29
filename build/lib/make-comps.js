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

const makeJs = (components) => {
  const s = components.map(makeComponent)
  return '[' + s.join(',\n') + ']'
}

function makeIo() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        if (target.render) {
          console.log('rendering the element %s', target)
          target.render()
          io.unobserve(target)
        }
      }
    })
  }, { rootMargin: '0px 0px 76px 0px' })
  return io
}

const defineIo = (io = true) => {
  if (!io) return ''
  return `${makeIo.toString()}
const io = makeIo()`
}

/**
 * From the array of exported components, creates an ES6 modules script that will render them on a page using Preact.
 * @param {!Array<{key:string, id: string, props: !Object, children:!Array<string>}>} components The list of exported components
 * @param {string} componentsLocation The location of the module which exports a default object with components relative to where this file will be placed.
 * @param {boolean} [includeH=false] Imports the `h` pragma from preact. By default is disabled, because can be added automatically by `Depack` and `@idio/frontend`.
 */
const makeComponentsScript = (components, componentsLocation,
  includeH = false, props = {}, io = false,
) => {
  const p = Object.keys(props).map((propName) => {
    const val = props[propName]
    const s = `props.${propName} = ${val}`
    return s
  }).join('\n')
  const r = 'render(h(Comp, props, children), parent, el)'
  const ifIo = io ? `parent.render = () => {
      ${r}
    }
    io.observe(parent)` : r
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

module.exports=makeComponentsScript