[{
  key: 'test',
  id: 'id1',
  props: {},
  children: [''],
}, {
  key: 'test-component',
  id: 'id2',
  props: {},
  children: [''],
}]

## imports plain components
../comps

/* map */
{ '../test': ['test', 'test-component'] }
/**/

/* expected */
import Test, { TestComponent } from '../test'

const __components = {
  'test': Test,
  'test-component': TestComponent,
}

function init(id, key) {
  const el = document.getElementById(id)
  if (!el) {
    console.warn('Parent element for component %s with id %s not found', key, id)
    return {}
  }
  const parent = el.parentElement
  if (!parent) {
    console.warn('Parent of element for component %s with id %s not found', key, id)
    return {}
  }
  return { parent, el  }
}

function startPlain(meta, Comp, comp, el, parent, props, children) {
  if (!comp) comp = new Comp(el, parent)
  const r = () => {
    comp.render({ ...props, children })
    meta.instance = comp
  }
  if (Comp.load) { // &!comp
    Comp.load((err, data) => {
      if (data) Object.assign(props, data)
      if (!err) r()
      else console.warn(err)
    }, el, props)
  } else r()
  return comp
}

const meta = [{
  key: 'test-component',
  id: 'id2',
},
{
  key: 'test',
  id: 'id1',
}]
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const Comp = __components[key]
  const plain = true

  const ids = id.split(',')
  ids.forEach((Id) => {
    const { parent, el } = init(Id, key)
    if (!el) return
    const renderMeta = /** @type {_competent.RenderMeta} */ ({ key, id: Id, plain })
    let comp
    comp = startPlain(renderMeta, Comp, comp, el, parent, props, children)
  })
})

/**/