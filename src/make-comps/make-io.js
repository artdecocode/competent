/**
 * `.render` method is assigned on each target in the generated script.
 */
module.exports = function makeIo(options = {}) {
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

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').RenderMeta} _competent.RenderMeta
 */