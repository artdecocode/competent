const { _competent: __competent, _makeComponentsScript } = require('./competent')

/**
 * @methodType {_competent.competent}
 */
function competent(components, config) {
  return __competent(components, config)
}

/**
 * @methodType {_competent.makeComponentsScript}
 */
function makeComponentsScript(components, componentsLocation, includeH = false, props = {}, io = false, options) {
  return _makeComponentsScript(components, componentsLocation, includeH, props, io, options)
}

module.exports = competent
module.exports.makeComponentsScript = makeComponentsScript

/* typal types/index.xml namespace */

/* typal types/exported.xml namespace */

/* typal node_modules/restream/types/rules.xml namespace */

/* typal types/make-comps.xml namespace */

/**
 * @typedef {import('@externs/preact').VNode} VNode
 */
/**
 * @typedef {import('@externs/preact').Component} Component
 */
