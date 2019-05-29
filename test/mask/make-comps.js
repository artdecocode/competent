import makeTestSuite from '@zoroaster/mask'
import { makeComponentsScript } from '../../src'

export default
makeTestSuite('test/result/make-comps', {
  getResults() {
    return makeComponentsScript(this.preamble, this.input, false, this.props)
  },
  jsProps: ['preamble', 'props'],
})

export const io = makeTestSuite('test/result/io', {
  getResults() {
    return makeComponentsScript(this.preamble, this.input, false, this.props, this.io)
  },
  jsProps: ['preamble', 'io'],
})