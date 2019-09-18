module.exports = function makeIo(options = {}) {
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