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
- [`makeComponentsScript(components: Array<comps>, componentsLocation: string, includeH?: boolean, io?: boolean): string`](#makecomponentsscriptcomponents-arraycompscomponentslocation-stringincludeh-booleanio-boolean-string)
  * [Intersection Observer](#intersection-observer)
- [Known Limitations](#known-limitations)
- [Who Uses _Competent_](#who-uses-competent)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import competent from 'competent'
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true"></a></p>

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
  <span class="ver">1.6.1</span>
  <p>Static Web Site Generator With JSX As HTML.</p>
</div>
<div style="background:green;" id="c2">
  <span class="name">@a-la/jsx</span>
  <span class="ver">1.6.0</span>
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

|       Name       |                Type                 |                                                                                                                                                                                     Description                                                                                                                                                                                     |
| ---------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __export*__      | <em>function(boolean=)</em>         | When called, marks the component for export and adds an `id` if the root element of the hyper result did not have it. Individual instances can pass the `false` value if they don't want to get exported.                                                                                                                                                                           |
| __setPretty*__   | <em>function(boolean, number=)</em> | The function which controls whether to enable pretty printing, and the line width.                                                                                                                                                                                                                                                                                                  |
| __renderAgain*__ | <em>function(boolean=)</em>         | Render the result of the component again. This is needed when a component might contain other components when rendered. No recursion is allowed otherwise the program will get stuck. Use `getReplacements` to specify how to acquire the replacements for the new _Replaceable_ stream. The argument passed specifies if the component might render recursively (default `false`). |

__<a name="type-_competentconfig">`_competent.Config`</a>__: Options for the program. All functions will be called with the Replaceable instance as their `this` context.

|      Name       |                                                                                                                                    Type                                                                                                                                    |                                                                                                                                                  Description                                                                                                                                                   | Default |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| getId           | <em>function(): string</em>                                                                                                                                                                                                                                                | The function which returns an `id` for the html element.                                                                                                                                                                                                                                                       | -       |
| getProps        | <em>function(<a href="#type-_competentprops" title="The properties extracted from HTML and to be passed to the component for rendering.">!_competent.Props</a>, <a href="#type-_competentmeta" title="Service methods for `competent`.">!_competent.Meta</a>, string)</em> | The function which takes the parsed properties from HTML and competent's meta methods, and returns the properties object to be passed to the component. By default, returns the properties simply merged with _meta_. The last argument is the name of the component.                                          | -       |
| markExported    | <em>function(string, string, <a href="#type-_competentprops" title="The properties extracted from HTML and to be passed to the component for rendering.">!_competent.Props</a>, !Array&lt;string&gt;)</em>                                                                 | If the component called the `export` meta method, this function will be called at the end of the replacement rule with its key, root id, properties and children as strings.                                                                                                                                   | -       |
| removeOnError   | <em>boolean</em>                                                                                                                                                                                                                                                           | If there was an error when rendering the component, controls whether the HTML should be be left on the page.                                                                                                                                                                                                   | `false` |
| onSuccess       | <em>function(string)</em>                                                                                                                                                                                                                                                  | The callback at the end of a successful replacement with the component's key.                                                                                                                                                                                                                                  | -       |
| onFail          | <em>function(string, !Error, number, string)</em>                                                                                                                                                                                                                          | The callback at the end of failed replacement with the component's key, error object, position number and the string which was fed to the rule.                                                                                                                                                                | -       |
| getContext      | <em>function(): !Object</em>                                                                                                                                                                                                                                               | The function to be called to get the properties to set on the child _Replaceable_ started to recursively replace inner HTML. This is needed if the root _Replaceable_ was assigned some properties that are referenced in components.                                                                          | -       |
| getReplacements | <em>function(string, boolean): !Array</em>                                                                                                                                                                                                                                 | The function which should return the list of replacements for `renderAgain` method. By default, the initial rule generated by _Competent_ is used. The first argument passed is the key, and the second argument is the value passed via the `renderAgain`, that is if the component might render recursively. | -       |

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true"></a></p>

## `makeComponentsScript(`<br/>&nbsp;&nbsp;`components: Array<comps>,`<br/>&nbsp;&nbsp;`componentsLocation: string,`<br/>&nbsp;&nbsp;`includeH?: boolean,`<br/>&nbsp;&nbsp;`io?: boolean,`<br/>`): string`

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
  .map(({ key, id, props = {}, children }) => {
    const el = document.getElementById(id)
    if (!el) {
      console.warn('Parent element for component %s with id %s not found', key, id)
      return
    }
    const parent = el.parentElement
    if (!parent) {
      console.warn('Parent of element for component %s with id %s not found', key, id)
      return
    }
    const Comp = Components[key]
    if (!Comp) {
      console.warn('Component with key %s was not found.', key)
      return
    }

    render(h(Comp, props, children), parent, el)
  })
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/3.svg?sanitize=true"></a></p>

### Intersection Observer

Competent can generate code that will utilise the _IntesectionObserver_ browser capability to detect when the element into which the components needs to be rendered comes into view, and only mount it at that point. This will only work when _IntesectionObserver_ is present either natively, or via a polyfill. When the `io` argument value is passed as a string, it will be set as the root margin, e.g., `0 0 76px 0`. The other options are not available at the moment.

```js
import CompetentExample from './'
import { makeComponentsScript } from 'competent'

(async () => {
  const { exported } = await CompetentExample()
  console.log(
    makeComponentsScript(exported, '../components', false, {}, true))
})()
```
```js
import { render } from 'preact'
import Components from '../components'

function makeIo(rootMargin = '0px 0px 76px 0px') {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        if (target.render) {
          console.warn('rendering component %s into the element %s ',
            target.render.meta.key, target.render.meta.id)
          target.render()
          io.unobserve(target)
        }
      }
    })
  }, { rootMargin })
  return io
}
const io = makeIo();[{
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
  .map(({ key, id, props = {}, children }) => {
    const el = document.getElementById(id)
    if (!el) {
      console.warn('Parent element for component %s with id %s not found', key, id)
      return
    }
    const parent = el.parentElement
    if (!parent) {
      console.warn('Parent of element for component %s with id %s not found', key, id)
      return
    }
    const Comp = Components[key]
    if (!Comp) {
      console.warn('Component with key %s was not found.', key)
      return
    }

    el.render = () => {
      render(h(Comp, props, children), parent, el)
    }
    el.render.meta = { key, id }
    io.observe(el)
  })
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/4.svg?sanitize=true"></a></p>

## Known Limitations

Currently, it is not possible to match nested components.

```js
<Component>
  <Component example />
  <Component test boolean></Component>
</Component>
```

```html
<component-processed />
</component>
```

This is because the RegExp is not capable of doing that sort of thing, because it cannot balance matches, however when _Competent_ switches to a non-regexp parser it will become possible.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/5.svg?sanitize=true"></a></p>

## Who Uses _Competent_

_Competent_ is used by:

- [_Documentary_](https://artdecocode.com/documentary/): a documentation pre-processor that supports JSX for reusable components when generating `README` files.
- [_Splendid_](https://github.com/artdecocode/splendid): a static website generator that allows to write JSX components in HTML, and bundles JS compiler with _Google Closure Compiler_ to also dynamically render them on the page.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/6.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a>   2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>