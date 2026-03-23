import test from 'node:test'
import assert from 'node:assert/strict'
import MarkdownIt from 'markdown-it'
import attrs from '../src/index'

function render(md: string) {
  return new MarkdownIt().use(attrs).render(md)
}

test('applies width/height DSL and removes raw attrs', () => {
  const html = render('![a](x){w:50 h:40}')

  assert.match(html, /width:\s*50px/)
  assert.match(html, /height:\s*40px/)
  assert.ok(!html.includes('w:50'))
  assert.ok(!html.includes('h:40'))
})

test('handles percentage sizes', () => {
  const html = render('![a](x){w:50% h:25%}')

  assert.match(html, /max-width:\s*50%/)
  assert.match(html, /max-height:\s*25%/)
  assert.match(html, /width:\s*auto/)
  assert.match(html, /height:\s*auto/)
})

test('maps float shortcuts', () => {
  const html = render('![a](x){float:r}')

  assert.match(html, /float:\s*right/)
})
