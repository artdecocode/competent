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

<footer />

%~ -1%