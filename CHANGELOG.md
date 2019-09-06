## 6 September 2019

### [2.2.0](https://github.com/artdecocode/competent/compare/v2.1.1...v2.2.0)

- [feature] Support map of imported components for script generation.

## 5 September 2019

### [2.1.1](https://github.com/artdecocode/competent/compare/v2.1.0...v2.1.1)

- [fix] Call `onSuccess` when removing a line.

## 4 September 2019

### [2.1.0](https://github.com/artdecocode/competent/compare/v2.0.0...v2.1.0)

- [feature] Add option to remove lines if components render empty string.
- [fix] Fix regex to exclude component for child render.

### [2.0.0](https://github.com/artdecocode/competent/compare/v1.8.1...v2.0.0)

- [api] Render again will always be called.
- [feature] Add `getChildContext` method.
- [license] Relicense under Affero & Tech Nation Sucks License.

## 17 August 2019

### [1.8.1](https://github.com/artdecocode/competent/compare/v1.8.0...v1.8.1)

- [deps] Upgrade `render` to prevent whitespace for inline-tags in pretty mode.
- [types] Fix types warnings.

## 7 August 2019

### [1.8.0](https://github.com/artdecocode/competent/compare/v1.7.0...v1.8.0)

- [package] Compile with [_Depack_](https://compiler.page).
- [doc] Better documentation.

## 14 June 2019

### [1.7.0](https://github.com/artdecocode/competent/compare/v1.6.0...v1.7.0)

- [fix] Update regex to avoid matching void elements.
- [deps] Upgrade `rexml` (simpler regex) & `@depack/render` (rename _srcSet_ and don't auto close void tags).
- [feature] Pass the key to `getProps` and allow to set recursive via `renderAgain`.

## 11 June 2019

### [1.6.0](https://github.com/artdecocode/competent/compare/v1.5.1...v1.6.0)

- [feature] Supply the `getReplacements` option for better _renderAgain_.

## 8 June 2019

### [1.5.1](https://github.com/artdecocode/competent/compare/v1.5.0...v1.5.1)

- [fix] Observe the element, not the parent in IO.

## 7 June 2019

### [1.5.0](https://github.com/artdecocode/competent/compare/v1.4.0...v1.5.0)

- [feature] Render components on intersection observer events.

## 20 May 2019

### [1.4.0](https://github.com/artdecocode/competent/compare/v1.3.1...v1.4.0)

- [feature] Pass properties as an object.

## 13 May 2019

### [1.3.1](https://github.com/artdecocode/competent/compare/v1.3.0...v1.3.1)

- [fix] Fix `renderAgain`.

### [1.3.0](https://github.com/artdecocode/competent/compare/v1.2.0...v1.3.0)

- [feature] Implement `renderAgain` meta property to allow rendering newly appeared components.

### [1.2.0](https://github.com/artdecocode/competent/compare/v1.1.1...v1.2.0)

- [feature] Implement `getContext` to propagate the _Replaceable_ properties down to child instances.

## 3 May 2019

### [1.1.1](https://github.com/artdecocode/competent/compare/v1.1.0...v1.1.1)

- [fix] Fix regexp to correctly match self-closing.
- [types] Correctly annotate optional args in types.

## 23 April 2019

### [1.1.0](https://github.com/artdecocode/competent/compare/v1.0.1...v1.1.0)

- [feature/fix] Allow to have self-closing together with full components:
    ```html
    <component test boolean />
    <component test boolean></component>
  ```

### [1.0.1](https://github.com/artdecocode/competent/compare/v1.0.0...v1.0.1)

- [fix] Allow to have new lines in attributes.

## 20 April 2019

### [1.0.0](https://github.com/artdecocode/competent/compare/v0.0.0-pre...v1.0.0)

- [package] Publish version `v1.0.0`.

## 19 April 2019

### 0.0.0

- Create `competent` with _[`My New Package`](https://mnpjs.org)_
- [repository]: `src`, `test`