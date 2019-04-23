import { Replaceable } from 'restream'
import competent from '../src'

const s = `<component>
  <component example />
  <component test boolean></component>
</component>`

;(async () => {
  const rule = competent({
    component() {
      return '<component-processed />'
    },
  })
  const r = new Replaceable(rule)
  const res = await Replaceable.replace(r, s)
  console.log(res)
})()