# competent

[![npm version](https://badge.fury.io/js/competent.svg)](https://npmjs.org/package/competent)

`competent` is Extracts, Renders And Exports For Dynamic Render JSX Components From Within HTML.

```sh
yarn add -E competent
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`competent(components: Object, config?: Config): _restream.Rule`](#competentcomponents-objectconfig-config-_restreamrule)
  * [`_competent.Props`](#type-_competentprops)
  * [`_competent.Meta`](#type-_competentmeta)
  * [`_competent.Config`](#type-_competentconfig)
- [`makeComponentsScript(components: Array<comps>, componentsLocation: string, includeH?: boolean): string`](#makecomponentsscriptcomponents-arraycompscomponentslocation-stringincludeh-boolean-string)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import competent from 'competent'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `competent(`<br/>&nbsp;&nbsp;`components: Object,`<br/>&nbsp;&nbsp;`config?: Config,`<br/>`): _restream.Rule`

Creates a rule for _Replaceable_ from the `restream` package that replaces HTML with rendered JSX components. The configuration object will be needed to export components, so that they can then be rendered on the page using JavaScript.

<table>
<tr><th>Example Usage</th></tr>
<tr><td>

```html
<html lang="en">

<npm-package style="background:red;">splendid</npm-package>
<npm-package style="background:green;">@a-la/jsx</npm-package>
<npm-package style="background:grey;">unknown-package</npm-package>

<hello-world from="Art Deco">
  An example usage of competent.
</hello-world>
<friends count="10"/>
</html>
```
</td></tr>
<tr><td>
For example, the above HTML page can be rendered with <em>Competent</em> by creating a <em>Replaceable</em> rule:
</td></tr>
<tr><td>

```jsx
/* alanode example/ */
import competent from 'competent'
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
  let [pck] = children
  pck = encodeURIComponent(pck)
  const { statusCode, body } =
    await aqt('https://registry.npmjs.com/' + pck)
  if (statusCode == 404) throw new Error(`Package ${pck} not found.`)
  const { name, versions, description } = body
  const keys = Object.keys(versions)
  const version = keys[keys.length - 1]
  return <div style={style}>
    <span className="name">{name}</span>
    <span className="ver">{version}</span>
    <p>{description}</p>
  </div>
}

const CompetentExample = async () => {
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
  return { res, exported }
}

export default CompetentExample
```
</td></tr>
<tr><td>
The output will contain rendered <strong>JSX</strong>.
</td></tr>
<tr><td>

```html
<html lang="en">

<div style="background:red;" id="c1">
  <span class="name">splendid</span>
  <span class="ver">1.3.0</span>
  <p>A Static Web Site Generator.</p>
</div>
<div style="background:green;" id="c2">
  <span class="name">@a-la/jsx</span>
  <span class="ver">1.4.7</span>
  <p>The JSX Transform For ÀLaMode And Other Packages.</p>
</div>
<npm-package style="background:grey;">unknown-package</npm-package>

<p>Hello World From Art Deco.
  An example usage of competent.
</p>
You have 10 friends.
</html>
```
</td></tr>
<tr><td>
The logging will be output to <code>stderr</code>.
</td></tr>
<tr><td>

```js
Component npm-package did not render:
Package unknown-package not found.
Exported packages:
[ { key: 'npm-package',
    id: 'c1',
    props: { style: 'background:red;' },
    children: [ 'splendid' ] },
  { key: 'npm-package',
    id: 'c2',
    props: { style: 'background:green;' },
    children: [ '@a-la/jsx' ] } ]
```
</td></tr>
</table>

`Object<string, *>` __<a name="type-_competentprops">`_competent.Props`</a>__: The properties extracted from HTML and to be passed to the component for rendering.

__<a name="type-_competentmeta">`_competent.Meta`</a>__: Service methods for `competent`.

|      Name      |             Type             |                                                                                                Description                                                                                                |
| -------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __export*__    | _function(boolean?)_         | When called, marks the component for export and adds an `id` if the root element of the hyper result did not have it. Individual instances can pass the `false` value if they don't want to get exported. |
| __setPretty*__ | _function(boolean, number?)_ | The function which controls whether to enable pretty printing, and the line width.                                                                                                                        |

__<a name="type-_competentconfig">`_competent.Config`</a>__: Options for the program. All functions will be called with the Replaceable instance as their `this` context.

|     Name      |                                Type                                 |                                                                                                      Description                                                                                                      | Default |
| ------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| getId         | _function(): string_                                                | The function which returns an `id` for the html element.                                                                                                                                                              | -       |
| getProps      | <em>function(!_competent.Props, _competent.Meta)</em>                      | The function which takes the parsed properties from HTML and competent's meta methods, and returns the properties object to be passed to the component. By default, returns the properties simply merged with _meta_. | -       |
| markExported  | _function(string, string, !_competent.Props, !Array&lt;string&gt;)_ | If the component called the `export` meta method, this function will be called at the end of the replacement rule with its key, root id, properties and children as strings.                                          | -       |
| removeOnError | _boolean_                                                           | If there was an error when rendering the component, controls whether the HTML should be be left on the page.                                                                                                          | `false` |
| onSuccess     | _function(string)_                                                  | The callback at the end of a successful replacement with the component's key.                                                                                                                                         | -       |
| onFail        | _function(string, Error, number, string)_                           | The callback at the end of failed replacement with the component's key, error object, position number and the string which was fed to the rule.                                                                       | -       |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## `makeComponentsScript(`<br/>&nbsp;&nbsp;`components: Array<comps>,`<br/>&nbsp;&nbsp;`componentsLocation: string,`<br/>&nbsp;&nbsp;`includeH?: boolean,`<br/>`): string`

Based on the exported components that were detected using the rule, generates a script for the web browser to dynamically render them with _Preact_.

```js
import CompetentExample from './'
import { makeComponentsScript } from 'competent'

(async () => {
  const { exported } = await CompetentExample()
  console.log(makeComponentsScript(exported, '../components'))
})()
```
```js
import { render } from 'preact'
import Components from '../components'

[{
  key: 'npm-package',
  id: 'c1',
  props: {
    style: 'background:red;',
  },
  children: ["splendid"],
},
{
  key: 'npm-package',
  id: 'c2',
  props: {
    style: 'background:green;',
  },
  children: ["@a-la/jsx"],
}]
  .map(({ key, id, props, children }) => {
    const el = document.getElementById(id)
    if (!el) {
      console.warn('Parent element for component %s with id %s not found', key, id)
      return
    }
    const parent = el.parentElement
    const Comp = Components[key]
    if (!Comp) {
      console.warn('Component with key %s was not found.', key)
      return
    }
    props.splendid = { export() {} }
    render(h(Comp, props, children), parent, el)
  })
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a>   2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa" />
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>