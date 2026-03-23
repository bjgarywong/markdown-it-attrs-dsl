export function normalizeSize(v: string) {
  return /%|px|vw|vh$/.test(v) ? v : v + 'px'
}

export function normalizeAttr(name: string, value: string) {
  if (name.includes(':') && value === '') {
    const [k, v] = name.split(':')
    return [k, v]
  }
  return [name, value]
}
