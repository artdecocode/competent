/* eslint-env browser */
import loadScripts from '@lemuria/load-scripts'
import { Component } from 'preact'

export default class Menu extends Component {
  /**
   * @suppress {checkTypes}
   */
  static 'load'(callback) {
    loadScripts([
      'js/menu.json',
      'snapsvg/dist/snap.svg-min.js',
      'js/svg-anim.js',
    ], (err, res) => {
      if (err) return callback(err)
      try {
        const [json] = /** @type {!Array<string>}*/ (res)
        callback(null, { json: JSON.parse(json) })
      } catch (er) {
        callback(er)
      }
    })
  }
  serverRender({ splendid }) {
    splendid.export()
    splendid.addFile('js/menu.json')
    splendid.addFile('js/svg-anim.js.map')
    splendid.addFile('img/menu.svg')
    splendid.polyfill('replace-with', true)
    splendid.addExtern('node_modules://@artdeco/snapsvg-animator/types/externs.js')
    return (<div id="menu" style="width:100%;">
      <img style="max-width:100%;" alt="menu" src="img/menu.svg" />
    </div>)
  }
  render({ json }) {
    const width = 1226
    const height = 818

    /** @type {!_snapsvgAnimator.SVGAnim} */
    const comp = new window['SVGAnim'](json, width, height)
    const n = comp.s.node
    n.style['max-width'] = '100%'

    return (<div id="menu" style="width:100%;" ref={(el) => {
      el.appendChild(n)
    }}/>)
  }
}