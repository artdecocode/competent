import makeTestSuite from '@zoroaster/mask'
import { makeComponentsScript } from '../../src'

export default
makeTestSuite('test/result/make-comps/default', {
  getResults() {
    return makeComponentsScript(this.preamble, this.input, false, this.props)
  },
  jsProps: ['preamble', 'props'],
})

export const io = makeTestSuite('test/result/make-comps/io', {
  getResults() {
    return makeComponentsScript(this.preamble, this.input, false, this.props, this.io)
  },
  jsProps: ['preamble', 'io'],
})

export const named = makeTestSuite('test/result/make-comps/named', {
  getResults() {
    return makeComponentsScript(this.preamble, this.input, false, {}, this.io || false, {
      map: this.map,
      fileIo: this.fileIo,
    })
  },
  jsProps: ['preamble', 'map', 'fileIo'],
})