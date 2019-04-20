import render from '@depack/render'
import rexml from 'rexml'
import { Replaceable } from 'restream'
import { makeRe } from './lib'

/**
 * Extracts, Renders And Exports For Dynamic Render JSX Components From Within HTML.
 * @param {Object<string, function({ children: !Array<string> })>} components The components to look for and render.
 * @param {_competent.Config} conf Options for the program. All functions will be called with the Replaceable instance as their `this` context.
 * @param {function(): string} [conf.getId] The function which returns an `id` for the html element.
 * @param {function(!_competent.Props, _competent.Meta)} [conf.getProps] The function which takes the parsed properties from HTML and competent's meta methods, and returns the properties object to be passed to the component. By default, returns the properties simply merged with _meta_.
 * @param {function(string, string, !_competent.Props, !Array<string>)} [conf.markExported] If the component called the `export` meta method, this function will be called at the end of the replacement rule with its key, root id, properties and children as strings.
 * @param {boolean} [conf.removeOnError=false] If there was an error when rendering the component, controls whether the HTML should be be left on the page. Default `false`.
 * @param {function(string)} [conf.onSuccess] The callback at the end of a successful replacement with the component's key.
 * @param {function(string, Error, number, string)} [conf.onFail] The callback at the end of failed replacement with the component's key, error object, position number and the string which was fed to the rule.
 */
const competent = (components, conf = {}) => {
  const { getId, getProps = (props, meta) => ({
    ...props, ...meta }), markExported, onSuccess, onFail,
  removeOnError = false } = conf

  const re = makeRe(Object.keys(components))

  /** @type {_restream.AsyncReplacer} */
  const replacement = async function (m, pad, Component, key, position, str) {
    try {
      const instance = components[key]
      const before = str.slice(0, position)
      const after = str.slice(position + m.length)
      if (/<!--\s*$/.test(before) && /^\s*-->/.test(after))
        return m

      const [{ content = '', props: htmlProps }] = rexml(key, Component)
      let child = content
      if (child) {
        const r = new Replaceable({ re, replacement })
        child = await Replaceable.replace(r, child)
      }
      const children = [child]
      let exported = false
      let pretty, lineLength
      let id
      const props = getProps.call(this, {
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
        id = getId.call(this) // `c${splendid.random()}`
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
        markExported.call(this, key, hyperResult.attributes.id, htmlProps, children)
      if (onSuccess) onSuccess.call(this, key)
      return f
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
export { default as makeComponentsScript } from './lib/make-comps'

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').AsyncReplacer} _restream.AsyncReplacer
 */

/* typal types/index.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_competent.Props} Props The properties extracted from HTML and to be passed to the component for rendering.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object<string, *>} _competent.Props The properties extracted from HTML and to be passed to the component for rendering.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_competent.Meta} Meta Service methods for `competent`.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _competent.Meta Service methods for `competent`.
 * @prop {function(boolean?)} export When called, marks the component for export and adds an `id` if the root element of the hyper result did not have it. Individual instances can pass the `false` value if they don't want to get exported.
 * @prop {function(boolean, number?)} setPretty The function which controls whether to enable pretty printing, and the line width.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_competent.Config} Config Options for the program. All functions will be called with the Replaceable instance as their `this` context.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _competent.Config Options for the program. All functions will be called with the Replaceable instance as their `this` context.
 * @prop {function(): string} [getId] The function which returns an `id` for the html element.
 * @prop {function(!_competent.Props, _competent.Meta)} [getProps] The function which takes the parsed properties from HTML and competent's meta methods, and returns the properties object to be passed to the component. By default, returns the properties simply merged with _meta_.
 * @prop {function(string, string, !_competent.Props, !Array<string>)} [markExported] If the component called the `export` meta method, this function will be called at the end of the replacement rule with its key, root id, properties and children as strings.
 * @prop {boolean} [removeOnError=false] If there was an error when rendering the component, controls whether the HTML should be be left on the page. Default `false`.
 * @prop {function(string)} [onSuccess] The callback at the end of a successful replacement with the component's key.
 * @prop {function(string, Error, number, string)} [onFail] The callback at the end of failed replacement with the component's key, error object, position number and the string which was fed to the rule.
 */
