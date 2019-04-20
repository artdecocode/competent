/* typal types/index.xml */
/** @const */
var _competent = {}
/**
 * @typedef {Object<string, *>}
 */
_competent.Props
/**
 * @typedef {{ export: function(boolean?), setPretty: function(boolean, number?) }}
 */
_competent.Meta
/**
 * @typedef {{ getId: function(): string, getProps: (function(!_competent.Props, _competent.Meta)|undefined), markExported: (function(string, string, !_competent.Props, !Array<string>)|undefined), errorBehaviour: (string|undefined), onSuccess: (function(string)|undefined), onFail: (function(string, Error, number, string)|undefined) }}
 */
_competent.Config
