import { getAstroPostHTML } from "astro-posthtml"
import { getAstroHTMLNano } from "astro-htmlnano"
import htmlnano from "htmlnano"

function getMiddleware() {
  if (process.env.NODE_ENV !== "production") {
    return undefined
  }

  if (process.env.TEST === "posthtml") {
    return getAstroPostHTML([htmlnano()])
  }

  if (process.env.TEST === "htmlnano") {
    return getAstroHTMLNano()
  }

  return undefined
}

export const onRequest = getMiddleware()
