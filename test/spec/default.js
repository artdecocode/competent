import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import mismatch from 'mismatch'
// import competent from '../../src'
import { makeRe } from '../../src/lib'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof competent, 'function')
  },
  // async 'calls package without error'() {
  //   await competent()
  // },
  // async 'gets a link to the fixture'({ FIXTURE }) {
  //   const res = await competent({
  //     text: FIXTURE,
  //   })
  //   ok(res, FIXTURE)
  // },
  'matches regular expression'() {
    const keys = ['test', 'test-comp']
    const html = `<test>Hello</test>
  <test-comp>World</test-comp>
  <test/>  <test-comp/>`
    const m = mismatch(makeRe(keys), html, ['ws', 'all', 'key'])
    return m
  },
}

export default T