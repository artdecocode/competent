/**
 * @fileoverview
 * @externs
 */

/* typal types/exported.xml */
/** @const */
var _competent = {}
/**
 * An exported component.
 * @record
 */
_competent.ExportedComponent
/**
 * The name of the component as passed to _Competent_.
 * @type {string}
 */
_competent.ExportedComponent.prototype.key
/**
 * The ID where the component should render.
 * @type {string}
 */
_competent.ExportedComponent.prototype.id
/**
 * Properties of the component.
 * @type {!Object}
 */
_competent.ExportedComponent.prototype.props
/**
 * Children as strings.
 * @type {!Array<string>}
 */
_competent.ExportedComponent.prototype.children

/* typal types/index.xml */
/**
 * Options for the program. All functions will be called with the Replaceable instance as their `this` context.
 * @record
 */
_competent.Config
/**
 * If there was an error when rendering the component, controls whether the HTML should be be left on the page. Default `false`.
 * @type {boolean|undefined}
 */
_competent.Config.prototype.removeOnError
/**
 * The function which returns an `id` for the html element.
 * @type {(function(): string)|undefined}
 */
_competent.Config.prototype.getId = function() {}
/**
 * The function which takes the parsed properties from HTML and competent's meta methods, and returns the properties object to be passed to the component. By default, returns the properties simply merged with _meta_.
 * @type {(function(!_competent.Props,!_competent.Meta,string,number): Object)|undefined}
 */
_competent.Config.prototype.getProps = function(props, meta, componentName, position) {}
/**
 * If the component called the `export` meta method, this function will be called at the end of the replacement rule with its key, root id, properties and children as strings.
 * @type {(function(string,string,!_competent.Props,!Array<string>))|undefined}
 */
_competent.Config.prototype.markExported = function(key, id, props, children) {}
/**
 * The callback at the end of a successful replacement with the component's key.
 * @type {(function(string,!Object<string, string>): void)|undefined}
 */
_competent.Config.prototype.onSuccess = function(componentName, htmlProps) {}
/**
 * The callback at the end of failed replacement with the component's key, error object, position number and the string which was fed to the rule.
 * @type {(function(string,!Error,number,string): void)|undefined}
 */
_competent.Config.prototype.onFail = function(componentName, error, position, input) {}
/**
 * The function to be called to get the properties to set on the child _Replaceable_ started to recursively replace inner HTML. This is needed if the root _Replaceable_ was assigned some properties that are referenced in components.
 * @type {(function(!Object=,{ position: number, key: string }): !Object)|undefined}
 */
_competent.Config.prototype.getContext = function(childContext, parent) {}
/**
 * The function which should return the list of replacements for `renderAgain` method. By default, the initial rule generated by _Competent_ is used. The first argument passed is the key, and the second argument is the value passed via the `renderAgain`, that is if the component might render recursively.
 * @type {(function(string,boolean): !Array<!_restream.Rule>)|undefined}
 */
_competent.Config.prototype.getReplacements = function(componentName, recursiveRenderAgain) {}
/**
 * The properties extracted from HTML and to be passed to the component for rendering.
 * @typedef {Object<string, *>}
 */
_competent.Props
/**
 * Service methods for `competent`.
 * @typedef {{ export: function(boolean=): void, skipRender: function(): void, setPretty: function(boolean,number=): void, removeLine: function(boolean=): void, renderAgain: function(boolean=,boolean=): void, setChildContext: function(!Object): void }}
 */
_competent.Meta

/* typal types/make-comps.xml */
/**
 * The options for make components script.
 * @record
 */
_competent.MakeCompsConfig
/**
 * The map with locations from where components should be imported, e.g.,
 * ```js
 * {
 *   '../components/named.jsx': [null, 'named-component'],
 *   '../components/default.jsx': ['default-component'],
 * }
 * ```
 * The default export must come first in the array.
 * @type {(!Object<string, !Array<?string>>)|undefined}
 */
_competent.MakeCompsConfig.prototype.map
/**
 * Whether to use an _IntersectionObserver_ to render elements. If an object is given, it will be passed to the IO constructor, otherwise the default options are used (`rootMargin: '76px'`).
 * @type {(boolean|!_competent.IOOptions)|undefined}
 */
_competent.MakeCompsConfig.prototype.io
/**
 * Shared properties made available for each component in addition to its own properties.
 * @type {(!Object<string, *>)|undefined}
 */
_competent.MakeCompsConfig.prototype.props
/**
 * Include `import { h } from 'preact'` on top of the file.
 * @type {boolean|undefined}
 */
_competent.MakeCompsConfig.prototype.includeH
/**
 * Whether the library functions should be required from a separate file, `./__competent-lib`. Works together with `writeAssets` and is useful when generating more than one script. The relative path can be passed as a string, e.g., `..` will make `../__competent-lib`.
 * @type {(boolean|string)|undefined}
 */
_competent.MakeCompsConfig.prototype.externalAssets
/**
 * Options for the observer.
 * @extends {IntersectionObserverInit}
 * @constructor
 */
_competent.IOOptions = function() {}
/**
 * Whether to print a message to console when a component is rendered.
 * @type {boolean}
 */
_competent.IOOptions.prototype.log

/* typal types/CompetentComponent.xml */
/**
 * A component could have an additional API understood by _Competent_.
 * @extends {preact.Component}
 * @constructor
 */
_competent.CompetentComponent = function() {}
/**
 * @param {function(Error, !Object=): void} callback A method called by browser-side bundle prior to rendering of a component with a callback, e.g., to load necessary assets. The callback should be called by the component when the loading is done, after which the component will render. The second argument to the callback can be a map of properties that should also be passed to the component.
 * @param {Element} element The element into which the component will be rendered.
 * @param {!Object} props The properties that the component will receive.
 */
_competent.CompetentComponent.load = function(callback, element, props) {}
/**
 * Whether this is a non-Preact component. This is required since Closure Compiler will compile classes into functions and the `.isPrototypeOf` won't wort to detect components that shouldn't be rendered with _Preact_.
 * @type {boolean}
 */
_competent.CompetentComponent.prototype.plain
/**
 * The same as render, but for the server only. Called by _Component_ using _NodeJS_ runtime and not by _Preact_ in browser, therefore _NodeJS_ API could be used here.
 * @param {!preact.PreactProps=} [props] Component properties.
 * @return {(preact.AcceptedChild|!Array<preact.AcceptedChild>)}
 */
_competent.CompetentComponent.prototype.serverRender = function(props) {}
/**
 * When `serverRender` was specified, this method will also render the component using the standard `render` method, and return the output. The output could then be written by the implementation to the filesystem, e.g., saved as `component.html` file which is then loaded in browser by `load` method.
 * @param {string} data The rendered component.
 * @param {!preact.PreactProps=} [props] Component properties.
 * @return {!Promise}
 */
_competent.CompetentComponent.prototype.fileRender = function(data, props) {}
