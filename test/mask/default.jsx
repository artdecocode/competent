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
      async 'body'({ children, page }) {
        return (<body-tag page={page}>
          {children}
        </body-tag>)
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
      'child-props'({ childProp }) {
        return `Hello ${childProp}`
      },
    }, { ...this.options, ...this.JSOptions })
    const re = new Replaceable(comp)
    return re
  },
  jsonProps: ['options'],
  jsProps: ['JSOptions'],
  context: Context,
})