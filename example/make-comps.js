import CompetentExample from './'
import { makeComponentsScript } from '../src'

(async () => {
  const { exported } = await CompetentExample()
  console.log(makeComponentsScript(exported, {
    map: {
      '../components/npm': ['npm-package'],
      // default first then named
      '../components': ['hello-world', 'friends'],
    },
  }))
})()