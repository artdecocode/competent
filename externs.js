/* typal types/index.xml */
/** @const */
var _competent = {}
/**
 * The properties extracted from HTML and to be passed to the component for rendering.
 * @typedef {Object<string, *>}
 */
_competent.Props
/**
 * Service methods for `competent`.
 * @typedef {{ export: function(boolean=), setPretty: function(boolean, number=) }}
 */
_competent.Meta
/**
 * Options for the program. All functions will be called with the Replaceable instance as their `this` context.
 * @typedef {{ getId: ((function(): string)|undefined), getProps: ((function(!_competent.Props, !_competent.Meta))|undefined), markExported: ((function(string, string, !_competent.Props, !Array<string>))|undefined), removeOnError: (boolean|undefined), onSuccess: ((function(string))|undefined), onFail: ((function(string, !Error, number, string))|undefined) }}
 */
_competent.Config
