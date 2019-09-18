<!-- ## TODO

- [ ] Add a new item to the todo list. -->

## Known Limitations

Currently, it is not possible to match nested components.

```js
<Component>
  <Component example />
  <Component test boolean></Component>
</Component>
```

%FORK-html example/nested%

This is because the RegExp is not capable of doing that sort of thing, because it cannot balance matches, however when _Competent_ switches to a non-regexp parser it will become possible.

%~%

## Who Uses _Competent_

_Competent_ is used by:

- [_Documentary_](https://artdecocode.com/documentary/): a documentation pre-processor that supports JSX for reusable components when generating `README` files.
- [_Splendid_](https://github.com/artdecocode/splendid): a static website generator that allows to write JSX components in HTML, and bundles JS compiler with _Google Closure Compiler_ to also dynamically render them on the page.

%~%

## License & Copyright

%EXAMPLE: LICENSE%

<details>
<summary>
The Affero GPL 101 (only dev-dep: commercial OK), click to expand.
</summary>

- You can use _Competent_ as dev dependency to render HTML code, and the components invocation script in any personal/commercial project. For example, you can build a website for your client by writing a script that uses *Competent* to generate HTML.
- However, you cannot use the software as part of an online service such as a cloud website builder because then it's not a dev dependency that you run to generate HTML of your website once, but a runtime-linking prod dependency.
- In other words, when you need to link to the package during runtime, i.e., use it as a standard dependency in your own software (even if bundled), you're creating an extension of the main program with this plugin, and thus have to release your source code under _AGPL_, or obtain the commercial license.
<!-- - Any publicly available forks/modified versions must also publish their source code and be released under _AGPL_. -->
- Contact `license@artd.eco` for more information.
</details>

<footer />

%~ -1%