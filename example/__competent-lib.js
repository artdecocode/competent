export function init(id, key) {
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

export function makeIo(options = {}) {
  const { rootMargin = '76px', log = true, ...rest } = options
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      /**
       * @type {_competent.RenderMeta}
       */
      const meta = target.render.meta
      const { key, id, plain } = meta
      if (isIntersecting) {
        if (log)
          console.warn('🏗 Rendering%s component %s into the element %s',
            !plain ? ' Preact' : '', key, id, target)
        try {
          const instance = target.render()
          if (instance && !instance.unrender) io.unobserve(target) // plain
        } catch (err) {
          if (log) console.warn(err)
        }
      } else if (meta.instance) {
        if (log)
          console.warn('💨 Unrendering%s component %s from the element %s',
            !plain ? ' Preact' : '', key, id, target)
        meta.instance.unrender()
      }
    })
  }, { rootMargin, ...rest })
  return io
}

/**
 * @param {_competent.RenderMeta} meta
 * @param {function(new:_competent.PlainComponent, Element, Element)} Comp
 */
export function startPlain(meta, Comp, comp, el, parent, props, children) {
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

/**
 * @param {_competent.RenderMeta} meta
 */
export function start(meta, Comp, comp, el, parent, props, children, preact) {
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