/**
 * @param {_competent.RenderMeta} meta
 * @param {function(new:_competent.PlainComponent)|function(new:_competent.CompetentComponent)} Comp
 * @param {_competent.PlainComponent} comp Already rendered plain component.
 */
module.exports = function start(meta, Comp, comp, el, parent, props, children, preact) {
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

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').RenderMeta} _competent.RenderMeta
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').CompetentComponent} _competent.CompetentComponent
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').PlainComponent} _competent.PlainComponent
 */