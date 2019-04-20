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

`Object<string, *>` __<a name="type-_competentprops">`_competent.Props`</a>__: The properties extracted from HTML and to be passed to the component for rendering.

__<a name="type-_competentmeta">`_competent.Meta`</a>__: Service methods for `competent`.

|      Name      |             Type             |                                                                                                Description                                                                                                |
| -------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __export*__    | _function(boolean?)_         | When called, marks the component for export and adds an `id` if the root element of the hyper result did not have it. Individual instances can pass the `false` value if they don't want to get exported. |
| __setPretty*__ | _function(boolean, number?)_ | The function which controls whether to enable pretty printing, and the line width.                                                                                                                        |

__<a name="type-_competentconfig">`_competent.Config`</a>__: Options for the program. All functions will be called with the Replaceable instance as their `this` context.

|       Name        |                                Type                                 |                                                                                                      Description                                                                                                      |
| ----------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __getId*__        | _function(): string_                                                | The function which returns an `id` for the html element.                                                                                                                                                              |
| getProps          | _function(!_competent.Props, _competent.Meta)_                      | The function which takes the parsed properties from HTML and competent's meta methods, and returns the properties object to be passed to the component. By default, returns the properties simply merged with _meta_. |
| __markExported*__ | _function(string, string, !_competent.Props, !Array&lt;string&gt;)_ | If the component called the `export` meta method, this function will be called at the end of the replacement rule with its key, root id, properties and children as strings.                                          |
| __onSuccess*__    | _function(string)_                                                  | The callback at the end of a successful replacement with the component's key.                                                                                                                                         |
| __onFail*__       | _function(string, Error, number, string)_                           | The callback at the end of failed replacement with the component's key, error object, position number and the string which was fed to the rule.                                                                       |

<table>
<tr><th>Example Usage</th></tr>
<tr><td>

```html
<html lang="en">

<npm-package style="background:red;">splendid</npm-package>
<npm-package style="background:green;">zoroaster</npm-package>
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
```
</td></tr>
<tr><td>

The output will contain rendered **JSX**.
</td></tr>
<tr><td>

```html
<html lang="en">

<div style="background:red;" id="c2">
  <span class="name">splendid</span>
  <span class="ver">1.3.0</span>
  <p>A Static Web Site Generator.</p>
</div>
<div style="background:green;" id="c1">
  <span class="name">zoroaster</span>
  <span class="ver">3.11.6</span>
  <p>
    A Modern Testing Framework For Node.js With Support For Test Contexts Which Can Be Reused Across Test Suites And Packages. Zoroaster Improves Developer Productivity And Experience With IDE Hints, And Test Reliability.
  </p>
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

```err
<html lang="en">

<div style="background:red;" id="c2">
  <span class="name">splendid</span>
  <span class="ver">1.3.0</span>
  <p>A Static Web Site Generator.</p>
</div>
<div style="background:green;" id="c1">
  <span class="name">zoroaster</span>
  <span class="ver">3.11.6</span>
  <p>
    A Modern Testing Framework For Node.js With Support For Test Contexts Which Can Be Reused Across Test Suites And Packages. Zoroaster Improves Developer Productivity And Experience With IDE Hints, And Test Reliability.
  </p>
</div>
<npm-package style="background:grey;">unknown-package</npm-package>

<p>Hello World From Art Deco.
  An example usage of competent.
</p>
You have 10 friends.
</html>
```
</td></tr>
</table>


<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Copyright

(c) [Art Deco][1] 2019

[1]: https://artd.eco

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>