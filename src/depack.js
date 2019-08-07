import '@externs/preact' // can't set that in @depack/render's package.json yet
import '../types/externs'
import competent, { makeComponentsScript } from './'

module.exports = {
  '_competent': competent,
  '_makeComponentsScript': makeComponentsScript,
}