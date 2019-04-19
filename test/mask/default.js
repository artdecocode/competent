import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import competent from '../../src'

// export default
makeTestSuite('test/result', {
  async getResults(input) {
    const res = await competent({
      text: input,
    })
    return res
  },
  context: Context,
})