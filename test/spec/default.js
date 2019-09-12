import { equal } from '@zoroaster/assert'
import mismatch from 'mismatch'
import Context from '../context'
import competent from '../../src'
import { makeRe } from '../../src/lib'
import { defineIo } from '../../src/make-comps';

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
    const m = mismatch(makeRe(keys), html, ['s', 'ws', 'all', 'key'])
    return m
  },
  'makes a component re'() {
    const re = makeRe(['Footer'])
    const res = mismatch(re, '<Footer client="/test"/>', ['ws', 'test'])
    equal(res.length, 1)
    const res2 = mismatch(re, '<Footer/>', ['ws', 'test'])
    equal(res2.length, 1)
  },
  'makes a component re with multiple lines'() {
    const re = makeRe(['Footer'])
    const res = mismatch(re, `<Footer client="/test"
    clientLogo="test2"/>`, ['ws', 'test'])
    equal(res.length, 1)
  },
  'makes two components of the same kind'() {
    const re = makeRe(['Footer'])
    const res = mismatch(re, `<Footer client="/test"
    clientLogo="test2"/>
    <Footer client="/test2"
    clientLogo="test3"/>`, ['ws', 'test'])
    equal(res.length, 2)
  },
  'matches self-closing and non self-closing comps'() {
    const re = makeRe(['Component'])
    const res = mismatch(re, `<Component test
  boolean />
  <Component test
  boolean></Component>`, ['ws', 'test'])
    equal(res.length, 2)
  },
  'does not match void'() {
    const re = makeRe(['img'])
    const res = mismatch(re, `<img src="test.jpg"><section-break />`, ['ws', 'test'])
    equal(res.length, 0)
  },
  'define-io'() {
    return defineIo({ rootMargin: '10px', threshold: 20 })
  },
}

export default T