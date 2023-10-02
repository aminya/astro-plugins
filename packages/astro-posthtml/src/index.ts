import type { APIContext, MiddlewareNext } from "astro"
import posthtml from "posthtml"

/**
 * @example
 *
 * ```ts
 * import { getAstroPostHTML } from "@astrojs/posthtml"
 * import htmlnano from "htmlnano"
 *
 * export const onRequest = getAstroPostHTML([htmlnano()])
 * ```
 *
 * @param plugins The posthtml plugins to use when transforming the HTML files
 * @returns A middleware function that can be used in Astro
 */
export function getAstroPostHTML(plugins: Parameters<typeof posthtml>[0]) {
  return async (_context: APIContext, next: MiddlewareNext<Response>) => {
    const response = await next()
    const originalHTML = await response.text()

    if (typeof originalHTML !== "string") {
      return response
    }

    try {
      // modify HTML using posthtml
      const { html: modifiedHTML } = await posthtml(plugins).process(originalHTML, {})

      return new Response(modifiedHTML, {
        status: 200,
        headers: response.headers,
      })
    } catch (err) {
      console.error(err)
      return new Response(originalHTML, {
        status: 500,
        headers: response.headers,
      })
    }
  }
}
