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
import { Component, render } from 'preact'
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

function start(meta, Comp, comp, el, parent, props, children, preact) {
  const { render, h, Component } = preact
  const isPlain = Comp.plain || (/^\\s*class\\s+/.test(Comp.toString()) && !Component.isPrototypeOf(Comp))
  if (!comp && isPlain) {
    comp = new Comp(el, parent)
  }
  const r = () => {
    if (isPlain) {
      comp.render({ ...props, children })
      meta.instance = comp
    } else render(h(Comp, props, children), parent, el)
  }
  if (Comp.load) {
    Comp.load((err, data) => {
      if (data) Object.assign(props, data)
      if (!err) r()
      else console.warn(err)
    }, el, props)
  } else r()
  return comp
}

function makeIo(options = {}) {
  const { rootMargin = '76px', log = true, ...rest } = options
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      /**
       * @type {_competent.RenderMeta}
       */
      const meta = target.render.meta
      const { key, id } = meta
      if (isIntersecting) {
        if (log)
          console.warn('🏗 Rendering component %s into the element %s', key, id, target)
        try {
          const instance = target.render()
          if (instance && !instance.unrender) io.unobserve(target) // plain
        } catch (err) {
          if (log) console.warn(err)
        }
      } else if (meta.instance) {
        if (log)
          console.warn('💨 Unrendering component %s from the element %s', key, id, target)
        meta.instance.unrender()
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
  const renderMeta = /** @type {_competent.RenderMeta} */ ({ key, id })
  let comp

  el.render = () => {
    comp = start(renderMeta, Comp, comp, el, parent, props, children, { render, Component, h })
    return comp
  }
  el.render.meta = renderMeta
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
import { Component, render } from 'preact'
import { makeIo, init, start } from './__competent-lib'
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
  const renderMeta = /** @type {_competent.RenderMeta} */ ({ key, id })
  let comp

  el.render = () => {
    comp = start(renderMeta, Comp, comp, el, parent, props, children, { render, Component, h })
    return comp
  }
  el.render.meta = renderMeta
  io.observe(el)
})

/**/
