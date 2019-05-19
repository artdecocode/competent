import makeTestSuite from '@zoroaster/mask'
import { makeComponentsScript } from '../../src'

export default
makeTestSuite('test/result/make-comps', {
  getResults() {
    return makeComponentsScript(this.components, this.input, false, this.props)
  },
  jsProps: ['components', 'props'],
})