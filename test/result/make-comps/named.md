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
import { init, start } from './__competent-lib'
import Test, { TestComponent } from '../test'

const __components = {
  'test': Test,
  'test-component': TestComponent,
}

/** @type {!Array<!preact.PreactProps>} */
const meta = [{
  key: 'test-component',
  id: 'id2',
},
{
  key: 'test',
  id: 'id1',
}]
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const Comp = __components[key]
  const plain = Comp.plain || (/^\s*class\s+/.test(Comp.toString()) && !Component.isPrototypeOf(Comp))
  

  const ids = id.split(',')
  ids.forEach((Id) => {
    const { parent, el } = init(Id, key)
    const renderMeta = /** @type {_competent.RenderMeta} */ ({ key, id: Id, plain })
    let comp
    comp = start(renderMeta, Comp, comp, el, parent, props, children, { render, Component, h })
  })
})

/**/