const { _competent: __competent, _makeComponentsScript, _writeAssets } = require('./competent')

/**
 * Creates a rule for _Replaceable_ from the `restream` package that replaces HTML with rendered JSX components. The configuration object will be needed to export components, so that they can then be rendered on the page using JavaScript.
 * @param {!Object<string, !Function|function(new: preact.Component)>} components Components to extract from HTML and render using _Preact's_ server-side rendering. Can be either a functional stateless component, or a _Preact_ component constructor.
 * @param {!_competent.Config} [config] Options for the program. All functions will be called with the Replaceable instance as their `this` context.
 * @param {boolean} [config.removeOnError=false] If there was an error when rendering the component, controls whether the HTML should be be left on the page. Default `false`.
 * @param {() => string} [config.getId] The function which returns an `id` for the html element.
 * @param {(props: !_competent.Props, meta: !_competent.Meta, componentName: string) => Object} [config.getProps] The function which takes the parsed properties from HTML and competent's meta methods, and returns the properties object to be passed to the component. By default, returns the properties simply merged with _meta_.
 * @param {(key: string, id: string, props: !_competent.Props, children: !Array<string>) => ?} [config.markExported] If the component called the `export` meta method, this function will be called at the end of the replacement rule with its key, root id, properties and children as strings.
 * @param {(componentName: string, htmlProps: !Object<string, string>) => void} [config.onSuccess] The callback at the end of a successful replacement with the component's key.
 * @param {(componentName: string, error: !Error, position: number, input: string) => void} [config.onFail] The callback at the end of failed replacement with the component's key, error object, position number and the string which was fed to the rule.
 * @param {(childContext?: !Object) => !Object} [config.getContext] The function to be called to get the properties to set on the child _Replaceable_ started to recursively replace inner HTML. This is needed if the root _Replaceable_ was assigned some properties that are referenced in components.
 * @param {(componentName: string, recursiveRenderAgain: boolean) => !Array<!_restream.Rule>} [config.getReplacements] The function which should return the list of replacements for `renderAgain` method. By default, the initial rule generated by _Competent_ is used. The first argument passed is the key, and the second argument is the value passed via the `renderAgain`, that is if the component might render recursively.
 * @return {!_restream.Rule}
 */
function competent(components, config) {
  return __competent(components, config)
}

/**
 * Based on the exported components that were detected using the rule, generates a script for the web browser to dynamically render them with _Preact_.
 * @param {!Array<!_competent.ExportedComponent>} components All components that were made exportable by the rule.
 * @param {_competent.MakeCompsConfig} [options] The options for make components script.
 * @param {!Object<string, !Array<?string>>} [options.map] The map with locations from where components should be imported, e.g.,
 * ```js
 * {
 *   '../components/named.jsx': [null, 'named-component'],
 *   '../components/default.jsx': ['default-component'],
 * }
 * ```
 * The default export must come first in the array.
 * @param {boolean|!_competent.IOOptions} [options.io] Whether to use an _IntersectionObserver_ to render elements. If an object is given, it will be passed to the IO constructor, otherwise the default options are used (`rootMargin: '76px'`).
 * @param {!Object<string, *>} [options.props] Shared properties made available for each component in addition to its own properties.
 * @param {boolean} [options.includeH] Include `import { h } from 'preact'` on top of the file.
 * @param {boolean} [options.externalAssets] Whether the library functions should be required from a separate file, `./competent-lib`. Works together with `writeAssets` and is useful when generating more than one script.
 * @return {string}
 */
function makeComponentsScript(components, options) {
  return _makeComponentsScript(components, options)
}

/**
 * @param {string} path The folder where to create the `__competent-lib.js` file, when the `externalAssets` option is passed to _makeComps_.
 * @return {Promise}
 */
function writeAssets(path) {
  return _writeAssets(path)
}

module.exports = competent
module.exports.makeComponentsScript = makeComponentsScript
module.exports.writeAssets = writeAssets

/* typal types/index.xml namespace */
/**
 * @typedef {_competent.Config} Config `＠record` Options for the program. All functions will be called with the Replaceable instance as their `this` context.
 * @typedef {Object} _competent.Config `＠record` Options for the program. All functions will be called with the Replaceable instance as their `this` context.
 * @prop {boolean} [removeOnError=false] If there was an error when rendering the component, controls whether the HTML should be be left on the page. Default `false`.
 * @prop {() => string} [getId] The function which returns an `id` for the html element.
 * @prop {(props: !_competent.Props, meta: !_competent.Meta, componentName: string) => Object} [getProps] The function which takes the parsed properties from HTML and competent's meta methods, and returns the properties object to be passed to the component. By default, returns the properties simply merged with _meta_.
 * @prop {(key: string, id: string, props: !_competent.Props, children: !Array<string>) => ?} [markExported] If the component called the `export` meta method, this function will be called at the end of the replacement rule with its key, root id, properties and children as strings.
 * @prop {(componentName: string, htmlProps: !Object<string, string>) => void} [onSuccess] The callback at the end of a successful replacement with the component's key.
 * @prop {(componentName: string, error: !Error, position: number, input: string) => void} [onFail] The callback at the end of failed replacement with the component's key, error object, position number and the string which was fed to the rule.
 * @prop {(childContext?: !Object) => !Object} [getContext] The function to be called to get the properties to set on the child _Replaceable_ started to recursively replace inner HTML. This is needed if the root _Replaceable_ was assigned some properties that are referenced in components.
 * @prop {(componentName: string, recursiveRenderAgain: boolean) => !Array<!_restream.Rule>} [getReplacements] The function which should return the list of replacements for `renderAgain` method. By default, the initial rule generated by _Competent_ is used. The first argument passed is the key, and the second argument is the value passed via the `renderAgain`, that is if the component might render recursively.
 * @typedef {_competent.Props} Props The properties extracted from HTML and to be passed to the component for rendering.
 * @typedef {Object<string, *>} _competent.Props The properties extracted from HTML and to be passed to the component for rendering.
 * @typedef {_competent.Meta} Meta Service methods for `competent`.
 * @typedef {Object} _competent.Meta Service methods for `competent`.
 * @prop {(shouldExport?: boolean) => void} export When called, marks the component for export and adds an `id` if the root element of the hyper result did not have it. Individual instances can pass the `false` value if they don't want to get exported.
 * @prop {(isPretty: boolean, lineLength?: number) => void} setPretty The function which controls whether to enable pretty printing, and the line width.
 * @prop {(shouldRemove?: boolean) => void} removeLine If the component rendered a falsy value (e.g., `null`, `''`), and the `removeLine` was called, _Competent_ will remove `\n___＜component＞`. By default, this is switched off.
 * @prop {(doRender?: boolean, recursiveRender?: boolean) => void} renderAgain After rendering the component itself, the children by default are also rendered by spawning another _Replaceable_ stream. This is needed when a component might contain other components when rendered.
 * - When `recursiveRender` is set to false (default), the component key will be excluded from the rule to prevent recursion.
 * - No recursion is allowed otherwise the program will get stuck, unless `＜img/＞` renders `＜img＞` (no `/`) for example.
 * - If `getReplacements` was used to specify how to acquire the replacements for the new child _Replaceable_ stream, the `recursiveRender` arg will be pased to it.
 * @prop {(context: !Object) => void} setChildContext JSX nodes are rendered breadth-first, meaning that siblings will receive the same `this` context. If one of them modifies it, the another one will also pass the updated one to children, which is not always desirable. To create a fork context unique for children of sibling nodes, the child context can be set. It will be passed as an argument to `getContext`.
 */

/* typal types/exported.xml namespace */
/**
 * @typedef {_competent.ExportedComponent} ExportedComponent `＠record` An exported component.
 * @typedef {Object} _competent.ExportedComponent `＠record` An exported component.
 * @prop {string} key The name of the component as passed to _Competent_.
 * @prop {string} id The ID where the component should render.
 * @prop {!Object} props Properties of the component.
 * @prop {!Array<string>} children Children as strings.
 */

/* typal node_modules/restream/types/rules.xml namespace */
/**
 * @typedef {_restream.Replacer} Replacer
 * @typedef {(match: string, ...params: string[]) => string} _restream.Replacer
 * @typedef {_restream.AsyncReplacer} AsyncReplacer
 * @typedef {(match: string, ...params: string[]) => Promise.<string>} _restream.AsyncReplacer
 * @typedef {_restream.Rule} Rule A replacement rule.
 * @typedef {Object} _restream.Rule A replacement rule.
 * @prop {!RegExp} re The regular expression to match input against.
 * @prop {!(string|_restream.Replacer|_restream.AsyncReplacer)} replacement The replacement string, or the replacer function.
 * @typedef {_restream.ReplaceableInterface} ReplaceableInterface `＠interface` An interface for the context accessible via this in replacer functions.
 * @typedef {Object} _restream.ReplaceableInterface `＠interface` An interface for the context accessible via this in replacer functions.
 * @prop {(arg0: string, ...args: *[]) => ?} emit Emit an event. Inherited from the `EventEmitter` which _Replaceable_ extends.
 * @prop {() => ?} brake After calling this method, the following rules and matches within the same rule won't be able to make any more changes.
 * @prop {(arg0: string, arg1?: !Object<string, *>) => !Promise<string>} replace Creates a new _Replaceable_ by copying all rules, assigns the context to it and replaces the data. The `this` won't be shared by rules, but the context will be updated: `const context = { test: this.test }; content = await this.replace(content, context); this.test = context.test`.
 */

/* typal types/make-comps.xml namespace */
/**
 * @typedef {_competent.MakeCompsConfig} MakeCompsConfig `＠record` The options for make components script.
 * @typedef {Object} _competent.MakeCompsConfig `＠record` The options for make components script.
 * @prop {!Object<string, !Array<?string>>} [map] The map with locations from where components should be imported, e.g.,
 * ```js
 * {
 *   '../components/named.jsx': [null, 'named-component'],
 *   '../components/default.jsx': ['default-component'],
 * }
 * ```
 * The default export must come first in the array.
 * @prop {boolean|!_competent.IOOptions} [io] Whether to use an _IntersectionObserver_ to render elements. If an object is given, it will be passed to the IO constructor, otherwise the default options are used (`rootMargin: '76px'`).
 * @prop {!Object<string, *>} [props] Shared properties made available for each component in addition to its own properties.
 * @prop {boolean} [includeH] Include `import { h } from 'preact'` on top of the file.
 * @prop {boolean} [externalAssets] Whether the library functions should be required from a separate file, `./competent-lib`. Works together with `writeAssets` and is useful when generating more than one script.
 * @typedef {_competent.IOOptions} IOOptions `＠constructor` Options for the observer.
 * @typedef {IntersectionObserverInit & _competent.$IOOptions} _competent.IOOptions `＠constructor` Options for the observer.
 * @typedef {Object} _competent.$IOOptions `＠constructor` Options for the observer.
 * @prop {boolean} log Whether to print a message to console when a component is rendered.
 */

/**
 * @typedef {import('@externs/preact').VNode} VNode
 */
/**
 * @typedef {import('@externs/preact').Component} Component
 */
