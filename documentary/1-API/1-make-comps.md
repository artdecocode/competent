```## makeComponentsScript => string
[
  ["components", "Array<comps>"],
  ["componentsLocation", "string"],
  ["includeH?", "boolean"]
]
```

Based on the exported components that were detected using the rule, generates a script for the web browser to dynamically render them with _Preact_.

%EXAMPLE: example/make-comps, ../src => competent%
%FORK-js example/make-comps%

%~%