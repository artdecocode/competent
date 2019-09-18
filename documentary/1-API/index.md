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

<typedef narrow flatten>types/index.xml</typedef>

%~%

## `DEBUG=competent`

When the `DEBUG` env variable is set to _competent_, the program will print some debug information, e.g.,

<fork stderr env="DEBUG=competent">example/debug</fork>

## _SplendidComponent_

A component could have an additional API understood by _Competent_, including:

<typedef narrow>types/SplendidComponent.xml</typedef>

%~%