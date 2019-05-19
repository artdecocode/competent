## creates a map
../comps

/* components */
[{
  key: 'test',
  id: 'id1',
  props: {},
  children: [''],
}]
/**/

/* expected */
import { render } from 'preact'
import Components from '../comps'

[{
  key: 'test',
  id: 'id1',
}]
  .map(({ key, id, props = {}, children }) => {
    const el = document.getElementById(id)
    if (!el) {
      console.warn('Parent element for component %s with id %s not found', key, id)
      return
    }
    const parent = el.parentElement
    const Comp = Components[key]
    if (!Comp) {
      console.warn('Component with key %s was not found.', key)
      return
    }

    render(h(Comp, props, children), parent, el)
  })

/**/

## creates a map with props
../comps

/* components */
[{
  key: 'test',
  id: 'id1',
  props: {},
  children: [''],
}]
/**/

/* props */
{ splendid: '{ export() {} }' }
/**/

/* expected */
import { render } from 'preact'
import Components from '../comps'

[{
  key: 'test',
  id: 'id1',
}]
  .map(({ key, id, props = {}, children }) => {
    const el = document.getElementById(id)
    if (!el) {
      console.warn('Parent element for component %s with id %s not found', key, id)
      return
    }
    const parent = el.parentElement
    const Comp = Components[key]
    if (!Comp) {
      console.warn('Component with key %s was not found.', key)
      return
    }
    props.splendid = { export() {} }
    render(h(Comp, props, children), parent, el)
  })

/**/