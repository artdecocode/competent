import { join } from 'path'
import clone from '@wrote/clone'

(async () => {
  await clone(join(__dirname, 'src/make-comps/init.js'), 'compile')
  await clone(join(__dirname, 'src/make-comps/make-io.js'), 'compile')
  await clone(join(__dirname, 'src/make-comps/start.js'), 'compile')
})()