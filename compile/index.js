module.exports = {}

/* typal types/index.xml namespace */
/**
 * @typedef {_competent.Props} Props The properties extracted from HTML and to be passed to the component for rendering.
 * @typedef {Object<string, *>} _competent.Props The properties extracted from HTML and to be passed to the component for rendering.
 * @typedef {_competent.Meta} Meta Service methods for `competent`.
 * @typedef {Object} _competent.Meta Service methods for `competent`.
 * @prop {(shouldExport?: boolean) => void} export When called, marks the component for export and adds an `id` if the root element of the hyper result did not have it. Individual instances can pass the `false` value if they don't want to get exported.
 * @prop {(isPretty: boolean, lineLength?: number) => void} setPretty The function which controls whether to enable pretty printing, and the line width.
 * @prop {(recursiveRender?: boolean) => void} renderAgain Render the result of the component again. This is needed when a component might contain other components when rendered. No recursion is allowed otherwise the program will get stuck. Use `getReplacements` to specify how to acquire the replacements for the new _Replaceable_ stream. The argument passed specifies if the component might render recursively (default `false`).
 * @typedef {_competent.Config} Config `＠record` Options for the program. All functions will be called with the Replaceable instance as their `this` context.
 * @typedef {Object} _competent.Config `＠record` Options for the program. All functions will be called with the Replaceable instance as their `this` context.
 * @prop {boolean} [removeOnError=false] If there was an error when rendering the component, controls whether the HTML should be be left on the page. Default `false`.
 * @prop {() => string} [getId] The function which returns an `id` for the html element.
 * @prop {(props: !_competent.Props, meta: !_competent.Meta, componentName: string) => Object} [getProps] The function which takes the parsed properties from HTML and competent's meta methods, and returns the properties object to be passed to the component. By default, returns the properties simply merged with _meta_.
 * @prop {(key: string, id: string, props: !_competent.Props, children: !Array<string>) => void} [markExported] If the component called the `export` meta method, this function will be called at the end of the replacement rule with its key, root id, properties and children as strings.
 * @prop {(componentName: string) => void} onSuccess The callback at the end of a successful replacement with the component's key.
 * @prop {(componentName: string, error: Error, position: number, input: string) => void} [onFail] The callback at the end of failed replacement with the component's key, error object, position number and the string which was fed to the rule.
 * @prop {() => !Object} [getContext] The function to be called to get the properties to set on the child _Replaceable_ started to recursively replace inner HTML. This is needed if the root _Replaceable_ was assigned some properties that are referenced in components.
 * @prop {(componentName: string, recursiveRenderAgain: boolean) => !Array} [getReplacements] The function which should return the list of replacements for `renderAgain` method. By default, the initial rule generated by _Competent_ is used. The first argument passed is the key, and the second argument is the value passed via the `renderAgain`, that is if the component might render recursively.
 */
