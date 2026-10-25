

<h1 align="center">astro-htmlnano</h1>
<p>
  <img alt="Versión" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="Licencia: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Minimiza archivos Astro con HTMLNano y CSSNano

## Instalación

```sh
npm install --save astro-htmlnano
```

## Uso

<!-- INSERT GENERATED DOCS START -->

### `getAstroHTMLNano` (función)

Minimiza archivos Astro con HTMLNano y CSSNano

**Parámetros:**

- options (`HtmlnanoOptions`) - Las opciones de HTMLNano a utilizar al transformar los archivos HTML
- preset (`HtmlnanoPreset`) - La configuración predefinida de HTMLNano a utilizar

**devuelve:** (\_context: APIContext<Record<string, any>, Record<string, string>>, next: MiddlewareNext) => Promise<Response>

Crea `./src/middleware.ts` con el siguiente contenido:

```ts
import { getAstroHTMLNano } from "astro-htmlnano"

export const onRequest = getAstroHTMLNano()
```

<!-- INSERT GENERATED DOCS END -->

<h1 align="center">astro-posthtml</h1>
<p>
  <img alt="Versión" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="Licencia: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Transforma archivos Astro con PostHTML

## Instalación

```sh
npm install --save astro-posthtml
```

## Uso

<!-- INSERT GENERATED DOCS START -->

### `getAstroPostHTML` (función)

Transforma archivos Astro con PostHTML

**Parámetros:**

- plugins (`Plugin<PostHTMLUseThis>[]`) - Los plugins de posthtml a utilizar al transformar los archivos HTML
- options (`Options`) - Las opciones de posthtml

**devuelve:** (\_context: APIContext<Record<string, any>, Record<string, string>>, next: MiddlewareNext) => Promise<Response>

Crea `./src/middleware.ts` con el siguiente contenido:

```ts
import { getAstroPostHTML } from "astro-posthtml"
import htmlnano from "htmlnano"

export const onRequest = process.env.NODE_ENV === "production" ? getAstroPostHTML([htmlnano()]) : undefined
```

## 🤝 Contribuciones

Puedes patrocinar mi trabajo aquí:

https://github.com/sponsors/aminya

Se agradecen los pull requests, issues y solicitudes de nuevas funcionalidades.
Consulta la [guía de contribución](https://github.com/aminya/atro-plugins/blob/master/CONTRIBUTING.md).
