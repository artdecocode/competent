/**
 * @param {_competent.RenderMeta} meta
 */
module.exports = function start(meta, Comp, el, parent, props, children, preact) {
  const { render, h, Component } = preact
  const r = () => {
    if (Comp['plain'] || (/^\\s*class\\s+/.test(Comp.toString())
      && !Component.isPrototypeOf(Comp))) {
      const comp = new Comp(el, parent)
      comp.render({ ...props, children })
      meta.instance = comp
    } else render(h(Comp, props, children), parent, el)
  }
  if (Comp.load) {
    Comp.load((err, data) => {
      if (data) Object.assign(props, data)
      if (!err) r()
    }, el, props)
  } else r()
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').RenderMeta} _competent.RenderMeta
 */