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

class PreactProxy {
  /**
   * Create a new proxy.
   * @param {Element} el
   * @param {Element} parent
   * @param {*} Comp
   * @param {*} preact
   */
  constructor(el, parent, Comp, preact) {
    this.preact = preact
    this.Comp = Comp
    this.el = el
    this.parent = parent
    /**
     * A Preact instance.
     */
    this.comp = null
    this.unrender = null
  }
  render({ children, ...props }) {
    if (!this.comp) {
      this.preact.render(this.preact.h(this.Comp, props, children), this.parent, this.el)
      const comp = this.el['_component']
      if (comp.componentWillUnmount) {
        this.unrender = () => {
          comp.componentWillUnmount()
        }
      }
      this.comp = comp
    } else {
      if (this.comp.componentDidMount) this.comp.componentDidMount()
      this.comp.forceUpdate()
    }
  }
}

function start(meta, Comp, comp, el, parent, props, children, preact) {
  const isPlain = meta.plain
  if (!comp && isPlain) {
    comp = new Comp(el, parent)
  } else if (!comp) {
    comp = new PreactProxy(el, parent, Comp, preact)
  }
  const r = () => {
    comp.render({ ...props, children })
    meta.instance = comp
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
    if (!el) return
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

class PreactProxy {
  /**
   * Create a new proxy.
   * @param {Element} el
   * @param {Element} parent
   * @param {*} Comp
   * @param {*} preact
   */
  constructor(el, parent, Comp, preact) {
    this.preact = preact
    this.Comp = Comp
    this.el = el
    this.parent = parent
    /**
     * A Preact instance.
     */
    this.comp = null
    this.unrender = null
  }
  render({ children, ...props }) {
    if (!this.comp) {
      this.preact.render(this.preact.h(this.Comp, props, children), this.parent, this.el)
      const comp = this.el['_component']
      if (comp.componentWillUnmount) {
        this.unrender = () => {
          comp.componentWillUnmount()
        }
      }
      this.comp = comp
    } else {
      if (this.comp.componentDidMount) this.comp.componentDidMount()
      this.comp.forceUpdate()
    }
  }
}

function start(meta, Comp, comp, el, parent, props, children, preact) {
  const isPlain = meta.plain
  if (!comp && isPlain) {
    comp = new Comp(el, parent)
  } else if (!comp) {
    comp = new PreactProxy(el, parent, Comp, preact)
  }
  const r = () => {
    comp.render({ ...props, children })
    meta.instance = comp
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
    if (!el) return
    const renderMeta = /** @type {_competent.RenderMeta} */ ({ key, id: Id, plain })
    let comp
    comp = start(renderMeta, Comp, comp, el, parent, props, children, { render, Component, h })
  })
})

/**/