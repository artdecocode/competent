<typedef name="makeComponentsScript" noArgTypesInToc>types/api.xml</typedef>

<typedef narrow flatten>types/make-comps.xml</typedef>

<typedef flatten>types/exported.xml</typedef>

%EXAMPLE: example/make-comps, ../src => competent%
%FORK-js example/make-comps%

<!-- Additional options are accepted. When a map of imports is passed, it allows to import components from the specified locations. -->

There are _Plain_ and _Preact_ components. By default, the assumption is that there are _Preact_ components in the map passed in options. When `preact` option is set to false, only plain logic is enabled, skipping the _Preact_ imports and externs.

%~ width="25"%

### Assets

By default, the lib functions will be embedded into the source code. To place them in separate files for reuse across multiple generated scripts, the `externalAssets` option is used together with `writeAssets` method.

%~ width="25"%

### Intersection Observer

Competent can generate code that will utilise the _IntesectionObserver_ browser capability to detect when the element into which the components needs to be rendered comes into view, and only mount it at that point. This will only work when _IntesectionObserver_ is present either natively, or via a polyfill. When the `io` argument value is passed as an object rather than boolean, it will be serialised, e.g., `{ rootMargin: '0 0 76px 0' }`.

%EXAMPLE: example/make-comps-io, ../src => competent%
%FORK-js example/make-comps-io%

#### Unrender

When a plain component implements an `unrender` method, _Competent_ will call it when the component is no longer intersecting. This currently does not work for Preact components, or for components that don't provide the `unrender` method.

<img src="docs/appshot.gif" alt="unrender method implementation">

%~%