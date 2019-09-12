import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'
import { makeComponentsScript } from '../../src'

export default makeTestSuite('test/result/make-comps/default', {
  getResults() {
    return makeComponentsScript(this.preamble, {
      map: { [this.input]: ['test'] },
      props: this.props,
    })
  },
  jsProps: ['preamble', 'props'],
})

export const io = makeTestSuite('test/result/make-comps/io', {
  context: TempContext,
  getResults() {
    return makeComponentsScript(this.preamble, {
      map: { [this.input]: ['test'] },
      io: this.io,
      externalAssets: this.externalAssets,
    })
  },
  jsProps: ['preamble', 'io', 'externalAssets'],
})

export const named = makeTestSuite('test/result/make-comps/named', {
  context: TempContext,
  /**
   * @param {TempContext} t
   */
  getResults() {
    return makeComponentsScript(this.preamble, {
      map: this.map,
      externalAssets: true,
      io: this.io,
    })
  },
  jsProps: ['preamble', 'map', 'io'],
})