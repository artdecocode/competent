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

## !imports named components
../comps

/* expected */
import { render } from 'preact'
import { Test, TestComponent } from '../comps'

const Components = {
  'test': Test,
  'test-component': TestComponent,
}

[{
  key: 'test',
  id: 'id1',
},
{
  key: 'test-component',
  id: 'id2',
}]
  .map(({ key, id, props = {}, children }) => {
    const el = document.getElementById(id)
    if (!el) {
      console.warn('Parent element for component %s with id %s not found', key, id)
      return
    }
    const parent = el.parentElement
    if (!parent) {
      console.warn('Parent of element for component %s with id %s not found', key, id)
      return
    }
    const Comp = Components[key]
    if (!Comp) {
      console.warn('Component with key %s was not found.', key)
      return
    }

    render(h(Comp, props, children), parent, el)
  })

/**/