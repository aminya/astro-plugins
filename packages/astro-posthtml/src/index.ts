import type { APIContext, MiddlewareNext } from "astro"
import posthtmlDefault, { type Options, type Plugin } from "posthtml"

const posthtml =
  typeof posthtmlDefault === "function"
    ? posthtmlDefault
    : typeof posthtmlDefault === "object" &&
        "default" in posthtmlDefault &&
        typeof (posthtmlDefault as { default: typeof posthtmlDefault }).default === "function"
      ? // @ts-expect-error - This is a workaround for the fact that posthtml may be exported as a CommonJS module or an ES module
        (posthtmlDefault.default as typeof posthtmlDefault)
      : undefined

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
  options?: Options,
) {
  if (posthtml === undefined) {
    throw new Error("PostHTML is not available. Please ensure you have posthtml installed as a dependency.")
  }
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
        options,
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
