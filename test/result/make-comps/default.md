[{
  key: 'test',
  id: 'id1',
  props: {},
  children: [''],
}]

## creates a map
../comps

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
  const { render, h } = preact
  const isPlain = meta.plain
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

/** @type {!Array<!preact.PreactProps>} */
const meta = [{
  key: 'test',
  id: 'id1',
}]
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const Comp = __components[key]
  const plain = Comp.plain || (/^\s*class\s+/.test(Comp.toString()) && !Component.isPrototypeOf(Comp))
  

  const ids = id.split(',')
  ids.forEach((Id) => {
    const { parent, el } = init(Id, key)
    const renderMeta = /** @type {_competent.RenderMeta} */ ({ key, id: Id, plain })
    let comp
    comp = start(renderMeta, Comp, comp, el, parent, props, children, { render, Component, h })
  })
})

/**/

## creates a map with props
../comps

/* props */
{ splendid: '{ export() {} }' }
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
  const { render, h } = preact
  const isPlain = meta.plain
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

/** @type {!Array<!preact.PreactProps>} */
const meta = [{
  key: 'test',
  id: 'id1',
}]
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const Comp = __components[key]
  const plain = Comp.plain || (/^\s*class\s+/.test(Comp.toString()) && !Component.isPrototypeOf(Comp))
  props.splendid = { export() {} }

  const ids = id.split(',')
  ids.forEach((Id) => {
    const { parent, el } = init(Id, key)
    const renderMeta = /** @type {_competent.RenderMeta} */ ({ key, id: Id, plain })
    let comp
    comp = start(renderMeta, Comp, comp, el, parent, props, children, { render, Component, h })
  })
})

/**/