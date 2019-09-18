## API

The package is available by importing its default and named functions:

```js
import competent, { makeComponentsScript, writeAssets } from 'competent'
```

%~%

<typedef name="competent" noArgTypesInToc>types/api.xml</typedef>

<!-- ```## competent => _restream.Rule
[
  ["components", "Object"],
  ["config?", "Config"]
]
``` -->

<table>
<tr><th>Example Usage</th></tr>
<tr><td>

%EXAMPLE: example/index.html, ../src => competent%
</td></tr>
<tr><td>
<md2html>

For example, the above HTML page can be rendered with _Competent_ by creating a _Replaceable_ rule:
</md2html>
</td></tr>
<tr><td>

%EXAMPLE: example, ../src => competent%
</td></tr>
<tr><td>
<md2html>

The output will contain rendered **JSX**.
</md2html>
</td></tr>
<tr><td>

%FORK-html example/example%
</td></tr>
<tr><td>
<md2html>

The logging will be output to `stderr`.
</md2html>
</td></tr>
<tr><td>

%FORKERR-js example/example%
</td></tr>
</table>

<typedef narrow flatten name="Config">types/index.xml</typedef>

The meta methods are usually used by the components in the `render`/`serverRender` methods, to control how the specific component instance should be rendered. If the `getProps` is not passed in the config, by default they will extend the HTML properties of the component.

<typedef narrow flatten name="Meta">types/index.xml</typedef>

%~%

## Additional Methods

_Competent_ can work with additional API of components, in which case they must extend the _Preact_ class and implement these additional methods.

<typedef narrow>types/CompetentComponent.xml</typedef>

For example, we could implement a component that loads additional libraries and JSON data, and only renders when they are ready in the following way:

%EXAMPLE: example/splendid%

When compiling with _Closure Compiler_ (or _Depack_), the static methods need to be written in quotes like `static 'method'()`, otherwise Closure will rename them. The `checkTypes` warning should also be suppressed. The other way to do that would be to write static methods normally, but then [reassign them](https://github.com/google/closure-compiler/issues/3447): `Example['staticMethod'] = Example.staticMethod;`

%~%

## `DEBUG=competent`

When the `DEBUG` env variable is set to _competent_, the program will print some debug information, e.g.,

<fork stderr env="DEBUG=competent">example/debug</fork>


%~%