import render from '@depack/render'
import rexml from 'rexml'
import { Replaceable } from 'restream'
import { makeRe } from './lib'
import Debug from '@idio/debug'

const debug = Debug('competent')

/**
 * Extracts, Renders And Exports For Dynamic Render JSX Components From Within HTML.
 * @param {!Object<string, function({ children: !Array<string> })>} components The components to look for and render.
 * @param {!_competent.Config} [conf] Options for the program. All functions will be called with the Replaceable instance as their `this` context.
 */
const competent = (components, conf = {}) => {
  const { getId, getProps = (props, meta) => ({
    ...props, ...meta }), markExported, onSuccess, onFail,
  removeOnError = false, getContext, getReplacements } = conf

  const re = makeRe(Object.keys(components))

  /** @type {!_restream.AsyncReplacer} */
  const replacement = async function (m, pad, Component, key, position, str) {
    debug('render %s', key)
    try {
      const instance = components[key]
      const before = str.slice(0, position)
      const after = str.slice(position + m.length)
      if (/<!--\s*$/.test(before) && /^\s*-->/.test(after))
        return m

      // let initialPadding = 0
      // const lastNewLine = before.lastIndexOf('\n')
      // if (lastNewLine != -1) initialPadding = position - lastNewLine - 1
      // else initialPadding = position

      const [{ content = '', props: htmlProps }] = rexml(key, Component)
      let child = content

      const children = [child]
      let exported = false
      let renderAgain = true
      let recursiveRenderAgain = false
      let pretty, lineLength
      let id
      let childContext
      const props = getProps.call(this, {
        ...htmlProps,
        children,
      }, /** @type {!_competent.Meta} */ ({
        export(value = true) { exported = value },
        setPretty(p, l) { pretty = p; if (l) lineLength = l },
        renderAgain(doRender = true, v = false) { renderAgain = doRender, recursiveRenderAgain = v },
        setChildContext(context) { childContext = context },
      }), key)
      /** @type {preact.VNode} */
      let hyperResult
      try {
        const promise = instance.call(this, props)
        hyperResult = promise instanceof Promise ? await promise : promise
      } catch (err) {
        if (!err.message.startsWith('Class constructor'))
          throw err
        const Instance = /** @type {function(new:preact.Component)} */ (instance)
        const i = new Instance()
        hyperResult = i.render(props)
      }
      if (exported && !hyperResult.attributes.id) {
        id = getId.call(this) // `c${splendid.random()}`
        hyperResult.attributes.id = id
      }
      const renderOptions = {
        pretty,
        lineLength,
      }
      let r
      if (typeof hyperResult == 'string') {
        r = hyperResult
      } else if (Array.isArray(hyperResult)) {
        r = hyperResult.map((hr) => {
          if (typeof hr == 'string') return hr
          const res = render(hr, renderOptions)
          return res
        }).join('\n')
      } else {
        r = render(hyperResult, renderOptions)
      }
      r = r.replace(/^/gm, pad)
      if (renderAgain) { // new v render again by default
        let childRules
        if (getReplacements) {
          childRules = getReplacements.call(this, key, recursiveRenderAgain)
        } else {
          if (recursiveRenderAgain)
          // exclude the actual element 🤷‍
            childRules = {
              re: new RegExp(re.source.replace(new RegExp(`([|(])${key}([|)])`),
                (_, pb, pa) => {
                  if (pb && pa) return '|'
                  return ''
                }), re.flags),
              replacement,
            }
          else childRules = { re, replacement }
        }
        const childRepl = new Replaceable(childRules)
        if (getContext) {
          const ctx = getContext.call(this, childContext)
          Object.assign(childRepl, ctx)
        }
        r = await Replaceable.replace(childRepl, r)
      }
      if (exported)
        markExported.call(this, key, hyperResult.attributes.id, htmlProps, children)
      if (onSuccess) onSuccess.call(this, key)
      return r
    } catch (err) {
      if (onFail) onFail.call(this, key, err, position, str)
      if (removeOnError) return ''
      return m
    }
  }
  /** @type {_restream.Rule} */
  const rule = {
    re, replacement,
  }
  return rule
}

export default competent
export { default as makeComponentsScript } from './make-comps'

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').AsyncReplacer} _restream.AsyncReplacer
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Config} _competent.Config
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Meta} _competent.Meta
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').VNode} preact.VNode
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Component} preact.Component
 */
