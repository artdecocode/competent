/* alanode example/ */
import competent from '../src'
import aqt from '@rqt/aqt'
import read from '@wrote/read'
import { Replaceable } from 'restream'

/**
 * A standard JSX component.
 */
const HelloWorld = ({ from, children, competent: c }) => {
  c.setPretty(false)
  return (<p>Hello World From {from}.{children}</p>)
}

/**
 * A string component.
 */
const FriendCount = ({ count }) => {
  return `You have ${count} friends.`
}

/**
 * An async component.
 */
const NpmPackage = async ({ style, children, competent: c }) => {
  c.export()
  const [pck] = children
  const { statusCode, body } =
    await aqt(`https://registry.npmjs.com/${pck}/latest`)
  if (statusCode == 404) throw new Error(`Package ${pck} not found.`)
  const { name, version, description } = body
  return <div style={style}>
    <span className="name">{name}</span>
    <span className="ver">{version}</span>
    <p>{description}</p>
  </div>
}

(async () => {
  let i = 0
  const exported = []
  const file = await read('example/index.html')
  const rule = competent({
    'hello-world': HelloWorld,
    'npm-package': NpmPackage,
    'friends': FriendCount,
  }, {
    getId() {
      i++
      return `c${i}`
    },
    getProps(props, meta) {
      meta.setPretty(true, 60)
      return { ...props, competent: meta }
    },
    onFail(key, err) {
      console.error('Component %s did not render:', key)
      console.error(err.message)
    },
    markExported(key, id, props, children) {
      exported.push({ key, id, props, children })
    },
  })
  const r = new Replaceable(rule)
  const res = await Replaceable.replace(r, file)
  console.log(res)
  console.error(exported)
})()