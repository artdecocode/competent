/**
 * @fileoverview
 * @externs
 */

/* typal types/render-meta.xml */
/** @const */
var _competent = {}
/**
 * Options assigned to the render method. Private.
 * @record
 */
_competent.RenderMeta
/**
 * The component key.
 * @type {string}
 */
_competent.RenderMeta.prototype.key
/**
 * The ID into which to render.
 * @type {string}
 */
_competent.RenderMeta.prototype.id
/**
 * If the component is plain.
 * @type {boolean}
 */
_competent.RenderMeta.prototype.plain
/**
 * The instance assigned after first render.
 * @type {_competent.PlainComponent}
 */
_competent.RenderMeta.prototype.instance
/**
 * @param {Element} el The element.
 * @param {Element} parent The parent element.
 * @interface
 */
_competent.PlainComponent = function(el, parent) {}
/**
 * @param {function(Error, !Object=): void} callback A method called by browser-side bundle prior to rendering of a component with a callback, e.g., to load necessary assets. The callback should be called by the component when the loading is done, after which the component will render. The second argument to the callback can be a map of properties that should also be passed to the component.
 * @param {Element} element The element into which the component will be rendered.
 * @param {!Object} props The properties that the component will receive.
 */
_competent.PlainComponent.load = function(callback, element, props) {}
/**
 * Whether this is a non-Preact component. This is required since Closure Compiler will compile classes into functions and the `.isPrototypeOf` won't wort to detect components that shouldn't be rendered with _Preact_.
 * @type {boolean}
 */
_competent.PlainComponent.prototype.plain
/**
 * A function which will be called when component leaves the intersection observer.
 */
_competent.PlainComponent.prototype.unrender = function() {}
