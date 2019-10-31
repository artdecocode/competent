module.exports = function makeIo(options = {}) {
  const { rootMargin = '76px', log = true, ...rest } = options
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      /**
       * @type {_competent.RenderMeta}
       */
      const meta = target.render.meta
      const { key, id, instance } = meta
      if (isIntersecting) {
        if (log)
          console.warn('Rendering component %s into the element %s', key, id)
        if (!(instance && instance.unrender)) target.unobserve(target) // plain
        target.render()
      } else if (meta.instance) {
        if (log)
          console.warn('Unrendering component %s from the element %s', key, id)
        meta.instance.unrender()
      }
    })
  }, { rootMargin, ...rest })
  return io
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').RenderMeta} _competent.RenderMeta
 */