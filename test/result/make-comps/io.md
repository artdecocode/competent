[{
  key: 'test',
  id: 'id1',
  props: {},
  children: [''],
}]

## creates a map
../comps

/* io */
true
/**/

/* expected */
import { render } from 'preact'
import Test from '../comps'

const Components = {
  'test': Test,
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
  const Comp = Components[key]
  if (!Comp) {
    console.warn('Component with key %s was not found.', key)
    return {}
  }
  return { Comp, parent, el  }
}

function makeIo(options = {}) {
  const { rootMargin = '76px', log = true, ...rest } = options
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        if (target.render) {
          if (log) console.warn('Rendering component %s into the element %s ',
            target.render.meta.key, target.render.meta.id)
          target.render()
          io.unobserve(target)
        }
      }
    })
  }, { rootMargin, ...rest })
  return io
}

const io = makeIo();

[{
  key: 'test',
  id: 'id1',
}]
  .map(({ key, id, props = {}, children }) => {
    const { Comp, parent, el } = init(id, key)
    if (!Comp) return

    el.render = () => {
      render(h(Comp, props, children), parent, el)
    }
    el.render.meta = { key, id }
    io.observe(el)
  })

/**/

## defines an io with props
../comps

/* io */
{ log: false, rootMargin: '55px' }
/**/
/* assetsPath */
true
/**/

/* expected */
import { render } from 'preact'
import makeIo from './make-io'
import init from './init'
import Test from '../comps'

const io = makeIo({ log: false, rootMargin: "55px" });

[{
  key: 'test',
  id: 'id1',
}]
  .map(({ key, id, props = {}, children }) => {
    const { Comp, parent, el } = init(id, key)
    if (!Comp) return

    el.render = () => {
      render(h(Comp, props, children), parent, el)
    }
    el.render.meta = { key, id }
    io.observe(el)
  })

/**/
