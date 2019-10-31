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

export function startPlain(Comp, el, parent, props, children) {
  const r = () => {
    const comp = new Comp(el, parent)
    comp.render({ ...props, children })
  }
  if (Comp.load) {
    Comp.load((err, data) => {
      if (data) Object.assign(props, data)
      if (!err) r()
    }, el, props)
  } else r()
}

export function start(Comp, el, parent, props, children, preact) {
  const { render, h, Component } = preact
  const r = () => {
    if (Comp['plain'] || (/^\\s*class\\s+/.test(Comp.toString())
      && !Component.isPrototypeOf(Comp))) {
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
}