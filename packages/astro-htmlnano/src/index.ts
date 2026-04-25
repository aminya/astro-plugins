import type { APIContext, MiddlewareNext } from "astro"
import { getAstroPostHTML } from "astro-posthtml"
import htmlnanoDefault, { type HtmlnanoOptions, type HtmlnanoPreset } from "htmlnano"

const htmlnano =
  typeof htmlnanoDefault === "function"
    ? htmlnanoDefault
    : typeof htmlnanoDefault.default === "function"
      ? htmlnanoDefault.default
      : undefined

/**
 * Minify Astro files with HTMLNano and CSSNano in the production mode
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
 * @param htmlnanoPreset The HTMLNano preset to use
 * @returns A middleware function that can be used in Astro
 * @note this is only enabled when `process.env.NODE_ENV === "production"`
 */
export function getAstroHTMLNano(options?: HtmlnanoOptions, htmlnanoPreset?: HtmlnanoPreset) {
  if (htmlnano === undefined) {
    throw new Error("htmlnano could not be imported properly. Please ensure it is installed correctly.")
  }
  if (process.env.NODE_ENV === "production") {
    return (_context: APIContext, next: MiddlewareNext) => {
      const htmlnanoOptions: HtmlnanoOptions = options ?? {}

      // disable `removeComments` due to Astro's use of comments for hydration
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (htmlnanoOptions.removeComments) {
        console.warn("`removeComments` is disabled due to Astro's use of comments for hydration.")
      }
      htmlnanoOptions.removeComments = false

      return getAstroPostHTML([htmlnano(htmlnanoOptions, htmlnanoPreset)])(_context, next)
    }
  }
  return (_context: APIContext, next: MiddlewareNext) => next()
}
