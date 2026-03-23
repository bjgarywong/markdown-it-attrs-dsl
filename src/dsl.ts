import { normalizeSize } from "./normalize"
import { StyleMap, DSLRule } from "./types"

const DSL_MAP: Record<
  string,
  DSLRule
> = {
  // width & height
  w: {
    apply: (v: string, s: StyleMap) => {
      if (v.endsWith('%')) {
        s['max-width'] = v
        s.width = 'auto'
      } else {
        s.width = normalizeSize(v)
      }
    }
  },
  h: {
    apply: (v: string, s: StyleMap) => {
      if (v.endsWith('%')) {
        s['max-height'] = v
        s.height = 'auto'
      } else {
        s.height = normalizeSize(v)
      }
    }
  },

  // top, right, bottom, left
  t: {
    css: 'top',
    transform: (v: string) => {
      return normalizeSize(v)
    }
  },
  r: {
    css: 'right',
    transform: (v: string) => {
      return normalizeSize(v)
    }
  },
  b: {
    css: 'bottom',
    transform: (v: string) => {
      return normalizeSize(v)
    }
  },
  l: {
    css: 'left',
    transform: (v: string) => {
      return normalizeSize(v)
    }
  },

  // float
  float: {
    css: 'float',
    transform: (v: string) => {
      switch (v) {
        case 'r':
        case 'right':
          return 'right'
        case 'l':
        case 'left':
          return 'left'
        default:
          return 'none'
      }
    }
  },

  // margin
  mt: {
    css: 'margin-top',
    transform: (v: string) => {
      return normalizeSize(v)
    }
  },
  mr: {
    css: 'margin-right',
    transform: (v: string) => {
      return normalizeSize(v)
    }
  },
  mb: {
    css: 'margin-bottom',
    transform: (v: string) => {
      return normalizeSize(v)
    }
  },
  ml: {
    css: 'margin-left',
    transform: (v: string) => {
      return normalizeSize(v)
    }
  },

  // padding
  pt: {
    css: 'padding-top',
    transform: (v: string) => {
      return normalizeSize(v)
    }
  },
  pr: {
    css: 'padding-right',
    transform: (v: string) => {
      return normalizeSize(v)
    }
  },
  pb: {
    css: 'padding-bottom',
    transform: (v: string) => {
      return normalizeSize(v)
    }
  },
  pl: {
    css: 'padding-left',
    transform: (v: string) => {
      return normalizeSize(v)
    }
  },

  // position
  pos: { css: 'position' },

  // object-fit
  fit: { css: 'object-fit' },

  // z-index
  z: { css: 'z-index' },

  // opacity
  op: { css: 'opacity' },

  // scale
  scale: {
    apply: (v: string, s: StyleMap) => {
      s.transform = (s.transform || '') + `scale(${v})`
      s['transform-origin'] = 'top left'
    }
  },

  // rotate
  rot: {
    apply: (v: string, s: StyleMap) => {
      s.transform = (s.transform || '') + ` rotate(${v}deg)`
    }
  }
}

export function applyDSL(
  name: string,
  value: string,
  style: Record<string, string>
) {
  const rule = DSL_MAP[name]
  if (!rule) return false

  if (rule.apply) {
    rule.apply(value, style)
    return true
  }

  if (rule.css) {
    const v = rule.transform ? rule.transform(value) : value
    style[rule.css] = v
    return true
  }

  return true
}
