## API

The package is available by importing its default function:

```js
import competent from 'competent'
```

%~%

```## competent => _restream.Rule
[
  ["components", "Object"],
  ["config?", "Config"]
]
```

Creates a rule for _Replaceable_ from the `restream` package that replaces HTML with rendered JSX components. The configuration object will be needed to export components, so that they can then be rendered on the page using JavaScript.

%TYPEDEF types/index.xml%

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

The output will contain rendered **JSX**.
</td></tr>
<tr><td>

%FORK-html example%
</td></tr>
<tr><td>

<md2html>
The logging will be output to `stderr`.
</md2html>
</td></tr>
<tr><td>

%FORK-err example%
</td></tr>
</table>


%~%