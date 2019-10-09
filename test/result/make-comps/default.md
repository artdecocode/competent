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

/** @type {!Array<!preact.PreactProps>} */
const meta = [{
  key: 'test',
  id: 'id1',
}]
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const { parent, el } = init(id, key)
  const Comp = __components[key]

  const r = () => {
      if (!Component.isPrototypeOf(Comp)) {
        const comp = new Comp(el, parent)
        comp.render({ ...props, children })
      } else render(h(Comp, props, children), parent, el)
    }
    if (Comp.load) {
      Comp.load((err, data) => {
        if (data) Object.assign(props, data)
        if (!err) r()
      }, el, props)
    } else r()
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

/** @type {!Array<!preact.PreactProps>} */
const meta = [{
  key: 'test',
  id: 'id1',
}]
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const { parent, el } = init(id, key)
  const Comp = __components[key]
  props.splendid = { export() {} }
  const r = () => {
      if (!Component.isPrototypeOf(Comp)) {
        const comp = new Comp(el, parent)
        comp.render({ ...props, children })
      } else render(h(Comp, props, children), parent, el)
    }
    if (Comp.load) {
      Comp.load((err, data) => {
        if (data) Object.assign(props, data)
        if (!err) r()
      }, el, props)
    } else r()
})

/**/