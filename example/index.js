/* alanode example/ */
import competent from '../src'

(async () => {
  const res = await competent({
    text: 'example',
  })
  console.log(res)
})()