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

When a plain component implements an `unrender` method, _Competent_ will call it when the component is no longer intersecting. Components that don't provide the `unrender` method won't be destroyed.

When it comes to _Preact_ component, the same applies, but the `unrender` method is called `componentWillUnmount`. Here, an instance will get a chance to remove event listeners and tidy up so that the page keeps performant. The component won't actually be unmounted, because that requires removing the element into which it is rendered from DOM, which can be inefficient and would result in page jumps. Instead, the `componentWillUnmount` will be called and the component should change its state so that it becomes invisible or a similar measure. Whenever the component comes back into view, its `componentDidMount` will be called again, and an update scheduled.

<img src="docs/appshot.gif" alt="unrender method implementation">


```js
/**
 * Example implementation of Preact unrender.
 */
export default class Test extends Component {
  constructor() {
    super()
    this.state.ellipsis = false
  }
  componentDidMount() {
    this.setState({ ellipsis: true })
  }
  componentWillUnmount() {
    this.setState({ ellipsis: false })
  }
  render() {
    return (<span>Hello World{this.state.ellipsis && <Ellipsis />}</span>)
  }
}
```

%~%