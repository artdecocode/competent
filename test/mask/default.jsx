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
    }, this.options)
    const re = new Replaceable(comp)
    return re
  },
  jsonProps: ['options'],
  context: Context,
})