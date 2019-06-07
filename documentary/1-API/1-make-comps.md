```## makeComponentsScript => string
[
  ["components", "Array<comps>"],
  ["componentsLocation", "string"],
  ["includeH?", "boolean"],
  ["io?", "boolean"]
]
```

Based on the exported components that were detected using the rule, generates a script for the web browser to dynamically render them with _Preact_.

%EXAMPLE: example/make-comps, ../src => competent%
%FORK-js example/make-comps%

%~%

### Intersection Observer

Competent can generate code that will utilise the _IntesectionObserver_ browser capability to detect when the element into which the components needs to be rendered comes into view, and only mount it at that point. This will only work when _IntesectionObserver_ is present either natively, or via a polyfill.

%EXAMPLE: example/make-comps-io, ../src => competent%
%FORK-js example/make-comps-io%

%~%