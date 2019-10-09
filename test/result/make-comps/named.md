[{
  key: 'test',
  id: 'id1',
  props: {},
  children: [''],
}, {
  key: 'test-component',
  id: 'id2',
  props: {},
  children: [''],
}]

## imports named components
../comps

/* map */
{ '../test': ['test', 'test-component'] }
/**/

/* expected */
import { Component, render } from 'preact'
import { init } from './__competent-lib'
import Test, { TestComponent } from '../test'

const __components = {
  'test': Test,
  'test-component': TestComponent,
}

/** @type {!Array<!preact.PreactProps>} */
const meta = [{
  key: 'test',
  id: 'id1',
},
{
  key: 'test-component',
  id: 'id2',
}]
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const { parent, el } = init(id, key)
  const Comp = __components[key]

  const r = () => {
      if (!Component.isPrototypeOf(Comp)) {
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
})

/**/