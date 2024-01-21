<h1 align="center">astro-htmlnano</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Minify Astro files with HTMLNano and CSSNano

## Install

```sh
npm install --save astro-htmlnano
```

## Usage

<!-- INSERT GENERATED DOCS START -->

### `getAstroHTMLNano` (function)

Minify Astro files with HTMLNano and CSSNano in the production mode

**Parameters:**

- options (`HtmlnanoOptions`) - The HTMLNano options to use when transforming the HTML files
- preset (`HtmlnanoPreset`) - The HTMLNano preset to use

**returns:** (\_context: APIContext<Record<string, any>, Record<string, string>>, next: MiddlewareNext) => Promise<Response>

Create `./src/middleware.ts` with the following content:

```ts
import { getAstroHTMLNano } from "astro-htmlnano"

export const onRequest = getAstroHTMLNano()
```

Note: this is only enabled when `process.env.NODE_ENV === "production"`

<!-- INSERT GENERATED DOCS END -->

## 🤝 Contributing

You can sponsor my work here:

https://github.com/sponsors/aminya

Pull requests, issues and feature requests are welcome.
See the [Contributing guide](https://github.com/aminya/atro-plugins/blob/master/CONTRIBUTING.md).
