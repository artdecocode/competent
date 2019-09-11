import clone from '@wrote/clone'

(async () => {
  await clone('src/make-comps/init.js', 'compile')
  await clone('src/make-comps/make-io.js', 'compile')
})()