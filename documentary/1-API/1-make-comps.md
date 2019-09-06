<typedef name="makeComponentsScript" noArgTypesInToc>types/api.xml</typedef>

<typedef flatten>types/exported.xml</typedef>

%EXAMPLE: example/make-comps, ../src => competent%
%FORK-js example/make-comps%

Additional options are accepted. When a map of imports is passed, it allows to import components from the specified locations.

<typedef narrow flatten>types/make-comps.xml</typedef>

%~ width="25"%

### Intersection Observer

Competent can generate code that will utilise the _IntesectionObserver_ browser capability to detect when the element into which the components needs to be rendered comes into view, and only mount it at that point. This will only work when _IntesectionObserver_ is present either natively, or via a polyfill. When the `io` argument value is passed as a string, it will be set as the root margin, e.g., `0 0 76px 0`. The other options are not available at the moment.

%EXAMPLE: example/make-comps-io, ../src => competent%
%FORK-js example/make-comps-io%

%~%