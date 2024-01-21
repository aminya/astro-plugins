import type { APIContext, MiddlewareNext } from "astro"
import posthtml, { type Options, type Plugin } from "posthtml"

/**
 * Transform Astro files with PostHTML
 *
 * @example Create `./src/middleware.ts` with the following content:
 *
 * ```ts
 * import { getAstroPostHTML } from "astro-posthtml"
 * import htmlnano from "htmlnano"
 *
 * export const onRequest = process.env.NODE_ENV === "production" ? getAstroPostHTML([htmlnano()]) : undefined
 * ```
 *
 * @param plugins The posthtml plugins to use when transforming the HTML files
 * @param options The posthtml options
 * @returns A middleware function that can be used in Astro
 */
export function getAstroPostHTML<PostHTMLUseThis, PostHTMLMessage>(
  plugins?: Plugin<PostHTMLUseThis>[],
  options?: Options
) {
  return async (_context: APIContext, next: MiddlewareNext) => {
    const response = await next()
    const originalHTML = await response.text()

    if (typeof originalHTML !== "string") {
      return response
    }

    try {
      // modify HTML using posthtml
      const { html: modifiedHTML, messages } = await posthtml<PostHTMLUseThis, PostHTMLMessage>(plugins).process(
        originalHTML,
        options
      )

      // log posthtml messages
      for (const message of messages) {
        console.log(message)
      }

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
