import render from '@depack/render'
import rexml from 'rexml'
import { makeRe } from './lib'

/**
 * Extracts, Renders And Exports For Dynamic Render JSX Components From Within HTML.
 * @param {Object<string, function({ children: Array<string> })>} components The components to look for and render.
 */
const competent = (components, conf = {}) => {
  const { getId, getProps = (props, meta) => ({
    ...props, ...meta }), markExported } = conf
  const re = makeRe(Object.keys(components))
  /**
   * @type {_restream.AsyncReplacer}
   */
  const replacement = async function (m, pad, Component, key, position, str) {
    const instance = components[key]
    const before = str.slice(0, position)
    const after = str.slice(position + m.length)
    if (/<!--\s*$/.test(before) && /^\s*-->/.test(after))
      return m

    const [{ content = '', props: htmlProps }] = rexml(key, Component)
    let child = content.trim()
    child = await this.replace(child)
    const children = [child]
    let exported = false
    let pretty, lineLength
    let id
    const props = getProps({
      ...htmlProps,
      children,
    }, {
      export(value = true) { exported = value },
      setPretty(p, l) { pretty = p; if (l) lineLength = l },
    })
    let hyperResult
    try {
      hyperResult = await instance(props)
    } catch (err) {
      if (!err.message.startsWith('Class constructor'))
        throw err
      const i = new instance()
      hyperResult = i.render(props)
    }
    if (exported && !hyperResult.attributes.id) {
      id = getId() // `c${splendid.random()}`
      hyperResult.attributes.id = id
    }
    let r
    if (typeof hyperResult == 'string') {
      r = hyperResult
    } else if (Array.isArray(hyperResult)) {
      r = hyperResult.map((hr) => {
        if (typeof hr == 'string') return hr
        return render(hr, {
          pretty,
          lineLength,
        })
      }).join('\n')
    } else {
      r = render(hyperResult, {
        pretty,
        lineLength,
      })
    }
    const f = r.replace(/^/gm, pad)
    if (exported)
      markExported(key, hyperResult.attributes.id, props, children)
    return f
  }
  /** @type {_restream.Rule} */
  const rule = {
    re, replacement,
  }
  return rule
}

export default competent

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').AsyncReplacer} _restream.AsyncReplacer
 */