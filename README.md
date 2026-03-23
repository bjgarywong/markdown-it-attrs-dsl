# markdown-it-attrs-dsl

Adds a concise style-attribute DSL on top of `markdown-it-attrs`, e.g. `{w:50}` or `{mt:8}`.
These DSL attributes are converted into `style` and removed from the final HTML attributes.

## Install

```bash
npm i markdown-it markdown-it-attrs markdown-it-attrs-dsl
```

## Usage

```ts
import attrs from 'markdown-it-attrs-dsl'

const md = new MarkdownIt()
  .use(attrs)

const html = md.render('![alt](img.png){ w:300 h:200 f:right scale:0.5 }')
```

## DSL Rules

- `w` / `h`: width/height. Adds `px` by default, e.g. `w:50` => `width: 50px`. If a percentage is used, sets `max-width/max-height` and makes `width/height` `auto`.
- `t` `r` `b` `l`: maps to `top/right/bottom/left`.
- `mt` `mr` `mb` `ml`: maps to `margin-*`.
- `pt` `pr` `pb` `pl`: maps to `padding-*`.
- `float`: `r/right` => `right`, `l/left` => `left`, otherwise `none`.
- `pos`: maps to `position`.
- `fit`: maps to `object-fit`.
- `z`: maps to `z-index`.
- `op`: maps to `opacity`.
- `scale`: appends `transform: scale(x)` and sets `transform-origin: top left`.
- `rot`: appends `transform: rotate(xdeg)`.

## Examples

```md
![alt](img.png){w:50 h:40}

![alt](img.png){w:50% h:50%}

![alt](img.png){float:r mt:8 ml:12}
```

## Notes

- The shorthand form `w:50` is equivalent to `w="50"`.
- Currently, the DSL is only applied to image (`img`) elements.
