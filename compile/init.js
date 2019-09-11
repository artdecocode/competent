let Components = {}

/**
 * Gets the data required to render the component. Components map is replaced dynamically.
 */
export default function init(id, key) {
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