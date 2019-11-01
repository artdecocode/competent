/**
 * @fileoverview
 * @externs
 */

/* typal types/CompetentComponent.xml */
/** @const */
var _competent = {}
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
