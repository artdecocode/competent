import { equal } from 'zoroaster/assert'
import mismatch from 'mismatch'
import Context from '../context'
import competent from '../../src'
import { makeRe } from '../../src/lib'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof competent, 'function')
  },
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