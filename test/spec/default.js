import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import competent from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof competent, 'function')
  },
  async 'calls package without error'() {
    await competent()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await competent({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T