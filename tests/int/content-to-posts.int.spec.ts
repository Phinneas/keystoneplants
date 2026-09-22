import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, it, expect, afterAll } from 'vitest'
import { parsePostFile, getAllPostDrafts } from '@/content-to-posts'

type Node = Record<string, any>

const tmpFiles: string[] = []

function writeTempPost(lines: string[]): string {
  const file = path.join(
    os.tmpdir(),
    `post-parse-spec-${tmpFiles.length}-${Date.now()}.md`,
  )
  fs.writeFileSync(
    file,
    [
      '# PAYLOAD CMS — POST DRAFT',
      '',
      '---',
      '',
      '**SLUG:** `parse-spec`',
      '',
      '**TITLE:** `Parse Spec`',
      '',
      '**EXCERPT:** `excerpt`',
      '',
      '**PUBLISHED AT:** `2026-09-21`',
      '',
      ...lines,
    ].join('\n'),
  )
  tmpFiles.push(file)
  return file
}

function walk(node: Node, visit: (n: Node) => void): void {
  visit(node)
  for (const child of node.children ?? []) walk(child, visit)
}

function textNodes(node: Node): Node[] {
  const found: Node[] = []
  walk(node, (n) => {
    if (n.type === 'text') found.push(n)
  })
  return found
}

afterAll(() => {
  for (const file of tmpFiles) fs.rmSync(file, { force: true })
})

describe('parsePostFile', () => {
  it('keeps inline formatting in tight list items', () => {
    const file = writeTempPost([
      '---',
      '',
      '## BODY',
      '',
      '---',
      '',
      '- **Bold lead.** Tail with *Quercus alba* and a [link](/search).',
      '- Plain item.',
      '',
    ])
    const draft = parsePostFile(file)!
    const list = draft.body.root.children.find((n: Node) => n.type === 'list') as Node
    const item = list.children[0]

    expect(item.type).toBe('listitem')
    expect(textNodes(item).map((n) => n.text)).toEqual([
      'Bold lead.',
      ' Tail with ',
      'Quercus alba',
      ' and a ',
      'link',
      '.',
    ])
    expect(item.children[0].format & 1).toBe(1) // bold
    expect(item.children[2].format & 2).toBe(2) // italic
    expect(item.children.find((n: Node) => n.type === 'link')?.fields.url).toBe('/search')
    expect(textNodes(list).some((n) => n.text.includes('**'))).toBe(false)
  })

  it('keeps links inside tight list items', () => {
    const file = writeTempPost([
      '---',
      '',
      '## BODY',
      '',
      '---',
      '',
      '- See the [finder](/search) for details.',
      '',
    ])
    const draft = parsePostFile(file)!
    const list = draft.body.root.children.find((n: Node) => n.type === 'list') as Node
    let url: string | undefined
    walk(list, (n) => {
      if (n.type === 'link') url = n.fields.url
    })
    expect(url).toBe('/search')
  })

  it('keeps formatting in ordered list items', () => {
    const file = writeTempPost([
      '---',
      '',
      '## BODY',
      '',
      '---',
      '',
      '1. **First mistake.** Explanation.',
      '2. Second mistake.',
      '',
    ])
    const draft = parsePostFile(file)!
    const list = draft.body.root.children.find((n: Node) => n.type === 'list') as Node
    expect(list.listType).toBe('number')
    expect(list.children[0].children[0].format & 1).toBe(1)
    expect(textNodes(list).some((n) => n.text.includes('**'))).toBe(false)
  })

  it('keeps inline content inside blockquotes', () => {
    const file = writeTempPost([
      '---',
      '',
      '## BODY',
      '',
      '---',
      '',
      '> **Did You Know?** Quote text with *emphasis*.',
      '',
    ])
    const draft = parsePostFile(file)!
    const quote = draft.body.root.children.find((n: Node) => n.type === 'quote') as Node

    expect(quote).toBeDefined()
    expect(textNodes(quote).map((n) => n.text).join('')).toBe(
      'Did You Know? Quote text with emphasis.',
    )
    expect(quote.children[0].format & 1).toBe(1) // bold
  })

  it('strips the trailing sources block', () => {
    const file = writeTempPost([
      '---',
      '',
      '## BODY',
      '',
      '---',
      '',
      'Body paragraph.',
      '',
      '---',
      '',
      '## Sources',
      '',
      '- A source',
      '',
    ])
    const draft = parsePostFile(file)!
    expect(draft.body.root.children).toHaveLength(1)
  })
})

describe('shipped content', () => {
  const drafts = getAllPostDrafts()

  it('parses every post in content/', () => {
    expect(drafts.length).toBeGreaterThan(0)
    for (const draft of drafts) {
      expect(draft.slug, `${draft.slug} missing a slug`).toBeTruthy()
      expect(draft.title, `${draft.slug} missing a title`).toBeTruthy()
      expect(draft.body.root.children.length, `${draft.slug} has an empty body`).toBeGreaterThan(0)
    }
  })

  it('has no list item that kept raw markdown', () => {
    const offenders: string[] = []
    for (const draft of drafts) {
      walk(draft.body.root as Node, (n) => {
        if (n.type === 'text' && /\*\*|\*[^*\n]+\*/.test(n.text)) offenders.push(draft.slug)
      })
    }
    expect([...new Set(offenders)]).toEqual([])
  })

  it('produces no empty block nodes', () => {
    const offenders: string[] = []
    for (const draft of drafts) {
      for (const child of draft.body.root.children as Node[]) {
        if (textNodes(child).every((n) => !n.text.trim())) offenders.push(draft.slug)
      }
    }
    expect([...new Set(offenders)]).toEqual([])
  })
})
