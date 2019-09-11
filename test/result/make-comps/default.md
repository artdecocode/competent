[{
  key: 'test',
  id: 'id1',
  props: {},
  children: [''],
}]

## creates a map
../comps

/* expected */
import { render } from 'preact'
import Test from '../comps'

const Components = {
  'test': Test,
}

function init(id, key) {
  const el = document.getElementById(id)
  if (!el) {
    console.warn('Parent element for component %s with id %s not found', key, id)
    return {}
  }
  const parent = el.parentElement
  if (!parent) {
    console.warn('Parent of element for component %s with id %s not found', key, id)
    return {}
  }
  const Comp = Components[key]
  if (!Comp) {
    console.warn('Component with key %s was not found.', key)
    return {}
  }
  return { Comp, parent, el  }
}

[{
  key: 'test',
  id: 'id1',
}]
  .map(({ key, id, props = {}, children }) => {
    const { Comp, parent, el } = init(id, key)
    if (!Comp) return

    render(h(Comp, props, children), parent, el)
  })

/**/

## creates a map with props
../comps

/* props */
{ splendid: '{ export() {} }' }
/**/

/* expected */
import { render } from 'preact'
import Test from '../comps'

const Components = {
  'test': Test,
}

function init(id, key) {
  const el = document.getElementById(id)
  if (!el) {
    console.warn('Parent element for component %s with id %s not found', key, id)
    return {}
  }
  const parent = el.parentElement
  if (!parent) {
    console.warn('Parent of element for component %s with id %s not found', key, id)
    return {}
  }
  const Comp = Components[key]
  if (!Comp) {
    console.warn('Component with key %s was not found.', key)
    return {}
  }
  return { Comp, parent, el  }
}

[{
  key: 'test',
  id: 'id1',
}]
  .map(({ key, id, props = {}, children }) => {
    const { Comp, parent, el } = init(id, key)
    if (!Comp) return
    props.splendid = { export() {} }
    render(h(Comp, props, children), parent, el)
  })

/**/