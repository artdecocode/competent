const { _competent: __competent, _makeComponentsScript, _writeAssets } = require('./competent')

/**
 * @methodType {_competent.competent}
 */
function competent(components, config) {
  return __competent(components, config)
}

/**
 * @methodType {_competent.makeComponentsScript}
 */
function makeComponentsScript(components, options) {
  return _makeComponentsScript(components, options)
}

/**
 * @methodType {_competent.writeAssets}
 */
function writeAssets(path) {
  return _writeAssets(path)
}

module.exports = competent
module.exports.makeComponentsScript = makeComponentsScript
module.exports.writeAssets = writeAssets

/* typal types/index.xml namespace */

/* typal types/exported.xml namespace */

/* typal node_modules/restream/types/rules.xml namespace */

/* typal types/make-comps.xml namespace */

/* typal types/render-meta.xml namespace */

/* typal types/CompetentComponent.xml namespace */

/**
 * @typedef {import('@externs/preact').VNode} VNode
 */
/**
 * @typedef {import('@externs/preact').Component} Component
 */
