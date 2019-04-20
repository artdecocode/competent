import CompetentExample from './'
import { makeComponentsScript } from '../src'

(async () => {
  const { exported } = await CompetentExample()
  console.log(makeComponentsScript(exported, '../components'))
})()