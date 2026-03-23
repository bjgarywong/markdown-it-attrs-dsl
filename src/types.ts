export type StyleMap = Record<string, string>

export type DSLRule = {
  css?: string
  transform?: (v: string) => string
  apply?: (v: string, style: StyleMap) => void
}
