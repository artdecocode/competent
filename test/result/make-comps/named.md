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
  const plain = Comp.plain || (/^\s*class\s+/.test(Comp.toString()) && !Component.isPrototypeOf(Comp))
  const renderMeta = /** @type {_competent.RenderMeta} */ ({ key, id, plain })
  let comp

  comp = start(renderMeta, Comp, comp, el, parent, props, children, { render, Component, h })
})

/**/