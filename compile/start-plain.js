/**
 * @param {_competent.RenderMeta} meta
 */
module.exports = function startPlain(meta, Comp, el, parent, props, children) {
  let comp
  const r = () => {
    if (!comp) {
      comp = new Comp(el, parent)
      meta.instance = comp
    }
    comp.render({ ...props, children })
  }
  if (Comp.load) { // &!comp
    Comp.load((err, data) => {
      if (data) Object.assign(props, data)
      if (!err) r()
      else console.warn(err)
    }, el, props)
  } else r()
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').RenderMeta} _competent.RenderMeta
 */