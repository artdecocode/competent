import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import { Replaceable } from 'restream'
import competent from '../../src'

export default
makeTestSuite('test/result/default', {
  getTransform() {
    const comp = competent({
      'html'({ children, lang }) {
        return (<rendered-html lang={lang}>
          The children are:
          <div dangerouslySetInnerHTML={{ __html: children }}></div>
        </rendered-html>)
      },
      async 'body'({ children, page, ...props }) {
        return (<body-tag page={page} {...props}>
          {children}
        </body-tag>)
      },
      'render-again'({ renderAgain }) {
        renderAgain()
        return (<body>
          %TEST_REPLACEMENTS%
        </body>)
      },
      'img'() {
        return '<img-ok>'
      },
      'error'() {
        throw new Error('Cannot process')
      },
      'page-title'() {
        return '<rendered-page-title/>'
      },
      'ajax-loader'() {
        return '<rendered-ajax-loader/>'
      },
      'remove-line'({ removeLine, children }) {
        removeLine()
        return children
      },
      'skip-render'({ 'do-skip': doSkip, skipRender }) {
        if (doSkip) skipRender()
        return (<skipped-render>OK</skipped-render>)
      },
      'child-props'({ childProp }) {
        return `Hello ${childProp}`
      },
      'server-render'({ test }) {
        return (<div>OK-{test}</div>)
      },
    }, { getProps(props, meta) {
      return { ...props, ...meta }
    }, ...this.options, ...this.JSOptions })
    const re = new Replaceable(comp)
    return re
  },
  jsonProps: ['options'],
  jsProps: ['JSOptions'],
  context: Context,
})