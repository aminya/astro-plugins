import type { APIContext, MiddlewareNext } from "astro"
import { getAstroPostHTML } from "astro-posthtml"
import htmlnano, { type HtmlnanoOptions, type Presets } from "htmlnano/index.mjs"

/**
 * Minify Astro files with HTMLNano and CSSNano
 *
 * @example Create `./src/middleware.ts` with the following content:
 *
 * ```ts
 * import { getAstroHTMLNano } from "astro-htmlnano"
 *
 * export const onRequest = getAstroHTMLNano()
 * ```
 *
 * @param options The HTMLNano options to use when transforming the HTML files
 * @param preset The HTMLNano preset to use
 * @returns A middleware function that can be used in Astro
 */
export function getAstroHTMLNano(options?: HtmlnanoOptions, preset?: Presets[keyof Presets]) {
  return (_context: APIContext, next: MiddlewareNext<Response>) =>
    getAstroPostHTML([htmlnano(options, preset)])(_context, next)
}
