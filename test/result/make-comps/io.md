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

const __components = {
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
  return { parent, el  }
}

function makeIo(options = {}) {
  const { rootMargin = '76px', log = true, ...rest } = options
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        if (log) console.warn('Rendering component %s into the element %s ',
          target.render.meta.key, target.render.meta.id)
        io.unobserve(target)
        target.render()
      }
    })
  }, { rootMargin, ...rest })
  return io
}

const io = makeIo()

/** @type {!Array<!preact.PreactProps>} */
const meta = [{
  key: 'test',
  id: 'id1',
}]
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const { parent, el } = init(id, key)
  const Comp = __components[key]

  el.render = () => {
    if (Comp.load) {
      Comp.load((err, data) => {
        if (data) Object.assign(props, data)
        if (!err) render(h(Comp, props, children), parent, el)
      }, el)
    } else render(h(Comp, props, children), parent, el)
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
/* externalAssets */
true
/**/

/* expected */
import { render } from 'preact'
import { makeIo, init } from './__competent-lib'
import Test from '../comps'

const __components = {
  'test': Test,
}

const io = makeIo({ log: false, rootMargin: "55px" })

/** @type {!Array<!preact.PreactProps>} */
const meta = [{
  key: 'test',
  id: 'id1',
}]
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const { parent, el } = init(id, key)
  const Comp = __components[key]

  el.render = () => {
    if (Comp.load) {
      Comp.load((err, data) => {
        if (data) Object.assign(props, data)
        if (!err) render(h(Comp, props, children), parent, el)
      }, el)
    } else render(h(Comp, props, children), parent, el)
  }
  el.render.meta = { key, id }
  io.observe(el)
})

/**/
