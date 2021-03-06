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
  const replacement = async function (m, ws, pad, Component, key, position, str) {
    debug('render %s', key)
    const SKIP_ERROR = new Error('Skip render')
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
      const renderOptions = {
        pretty: undefined,
        lineLength: undefined,
      }
      let id
      let childContext, removeLine, overriddenProps
      const props = getProps.call(this, {
        ...htmlProps,
        children,
      }, /** @type {!_competent.Meta} */ ({
        export(value = true, newProps = null) {
          exported = value
          if (newProps) overriddenProps = Object.entries(newProps).reduce((ac, [k, val]) => {
            if (val === undefined) return ac
            ac[k] = val
            return ac
          }, {})
        },
        setPretty(p, l) {
          renderOptions.pretty = p
          if (l) renderOptions.lineLength = l
        },
        renderAgain(doRender = true, v = false) { renderAgain = doRender, recursiveRenderAgain = v },
        setChildContext(context) { childContext = context },
        removeLine(r = true) { removeLine = r },
        skipRender() { throw SKIP_ERROR },
      }), key, position, str)
      /** @type {preact.VNode} */
      let hyperResult
      try {
        const promise = instance.call(this, props)
        hyperResult = promise instanceof Promise ? await promise : promise
      } catch (err) {
        if (!err.message.startsWith('Class constructor'))
          throw err
        const Instance = /** @type {function(new:_competent.CompetentComponent)} */ (instance)
        const i = new Instance()
        const promise = i.serverRender ? i.serverRender(props) : i.render(props)
        hyperResult = promise instanceof Promise ? await promise : promise
        if (i.fileRender) {
          let iframe = await i.render(props)
          iframe = hyperToString(iframe, renderOptions)
          if (renderAgain) iframe = await secondRender({
            getContext: getContext.bind(this),
            getReplacements: getReplacements.bind(this),
            key, recursiveRenderAgain, re, replacement,
            childContext, body: iframe })
          await i.fileRender(iframe, props)
        }
      }
      if (exported) { // generate id if needed
        const hr = Array.isArray(hyperResult) ? hyperResult[0] : hyperResult
        id = hr.attributes.id
        if (!id) {
          id = getId.call(this, key, overriddenProps || htmlProps)
          hr.attributes.id = id
        }
      }
      let r = hyperToString(hyperResult, renderOptions)
      if (!r && removeLine) {
        if (onSuccess) onSuccess.call(this, key, htmlProps)
        return ''
      }
      r = (ws || '') + r.replace(/^/gm, pad)
      if (renderAgain) {
        // console.log('============\n',r,'\n============')
        r = await secondRender({
          getContext: getContext ? getContext.bind(this) : undefined,
          getReplacements: getReplacements ? getReplacements.bind(this) : undefined,
          key, recursiveRenderAgain, re, replacement,
          childContext,
          body: r,
          position,
        })
      }
      if (exported)
        markExported.call(this, key, id, overriddenProps || htmlProps, children)
      if (onSuccess) onSuccess.call(this, key, htmlProps)
      return r
    } catch (err) {
      if (err === SKIP_ERROR) return m
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

const hyperToString = (hyperResult, renderOptions) => {
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
  return r
}

const secondRender = async ({
  getReplacements, key, recursiveRenderAgain, re, replacement, getContext, childContext, position,
  body,
}) => {
  let childRules
  if (getReplacements) {
    childRules = getReplacements(key, recursiveRenderAgain)
  } else {
    if (recursiveRenderAgain)
    // exclude the actual element 🤷‍
      childRules = {
        re: upgradeRe(re, key),
        replacement,
      }
    else childRules = { re, replacement }
  }
  const childRepl = new Replaceable(childRules)
  if (getContext) {
    const ctx = getContext(childContext, { position, key } )
    Object.assign(childRepl, ctx)
  }
  return await Replaceable.replace(childRepl, body)
}

const upgradeRe = (re, key) => {
  const ure = new RegExp(re.source.replace(new RegExp(`([|(])${key}([|)])`),
    (m, pb, pa) => {
      if (pb == '|' && pa == '|') return '|'
      if (pa == ')') return pa
      if (pb == '(') return pb
      return ''
    }), re.flags)
  return ure
}

export default competent
export { default as makeComponentsScript, writeAssets } from './make-comps'

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
