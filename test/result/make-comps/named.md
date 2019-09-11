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
import { render } from 'preact'
import init from './init'
import Test, { TestComponent } from '../test'

[{
  key: 'test',
  id: 'id1',
},
{
  key: 'test-component',
  id: 'id2',
}]
  .map(({ key, id, props = {}, children }) => {
    const { Comp, parent, el } = init(id, key)
    if (!Comp) return

    render(h(Comp, props, children), parent, el)
  })

/**/