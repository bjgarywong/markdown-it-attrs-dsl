import attrs from 'markdown-it-attrs'
import { normalizeAttr } from './normalize'
import { applyDSL } from './dsl'

export default function markdownItAttrs(md: any) {
  md.use(attrs)

  md.core.ruler.after('linkify', 'img_attrs', (state: any) => {
    for (const token of state.tokens) {
      if (token.type !== 'inline') continue

      for (const child of token.children || []) {
        if (child.type === 'image') {
          const style = attrsToStyle(child)

          if (Object.keys(style).length > 0) {
            const styleStr = Object.entries(style)
              .map(([k, v]) => `${k}:${v}`)
              .join(';')

            child.attrJoin('style', styleStr)
          }
        }
      }
    }
  })
}

function attrsToStyle(token: any): Record<string, string> {
  const style: Record<string, string> = {}
  const removeAttrs: string[] = []

  for (const [rawName, rawValue] of token.attrs || []) {
    const [name, value] = normalizeAttr(rawName, rawValue)

    if (applyDSL(name, value, style)) {
      removeAttrs.push(rawName)
    }
  }

  // Remove these attrs to avoid polluting the HTML
  token.attrs = (token.attrs || []).filter(
    ([name]: [string, string]) => !removeAttrs.includes(name)
  )

  return style
}
