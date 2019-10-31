module.exports = function startPlain(Comp, el, parent, props, children) {
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