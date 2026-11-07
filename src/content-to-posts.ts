/**
 * Converts markdown blog content files (content/post-*.md) into
 * Payload-compatible post data with proper Lexical richText state.
 *
 * Run: npx tsx src/content-to-posts.ts
 * Or import and call from seed.ts.
 */

import fs from 'fs'
import path from 'path'
import { Marked } from 'marked'
import type { Token } from 'marked'
import ObjectID from 'bson-objectid'

const CONTENT_DIR = path.resolve(import.meta.dirname, '..', 'content')
const marked = new Marked()

// ── Lexical helpers ────────────────────────────────────────────

type LexicalNode = Record<string, any>
type LexicalTextNode = { type: 'text'; text: string; format: number; version: 1 }
type LexicalParagraph = { type: 'paragraph'; format: ''; indent: 0; version: 1; direction: 'ltr'; textStyle: ''; textFormat: 0; children: LexicalNode[] }
type LexicalHeading = { type: 'heading'; tag: 'h2' | 'h3'; format: ''; indent: 0; version: 1; direction: 'ltr'; textStyle: ''; textFormat: 0; children: LexicalNode[] }
type LexicalQuote = { type: 'quote'; format: ''; indent: 0; version: 1; direction: 'ltr'; children: LexicalNode[] }
type LexicalList = { type: 'list'; listType: 'bullet' | 'number'; start?: number; format: ''; indent: 0; version: 1; direction: 'ltr'; children: LexicalNode[] }
type LexicalListItem = { type: 'listitem'; format: ''; indent: 0; version: 1; direction: 'ltr'; children: LexicalNode[] }
type LexicalLink = { type: 'link'; id: string; fields: { linkType: 'custom'; url: string; newTab?: boolean }; format: ''; indent: 0; version: 1; direction: 'ltr'; children: LexicalNode[] }

const TEXT_FORMAT = { BOLD: 1, ITALIC: 2, CODE: 16, STRIKETHROUGH: 8 }

function textNode(text: string, format: number = 0): LexicalTextNode {
  return { type: 'text', text, format, version: 1 }
}

function inlineTokensToLexical(tokens: Token[]): LexicalNode[] {
  const nodes: LexicalNode[] = []
  for (const tok of tokens) {
    if (tok.type === 'text' || tok.type === 'escape') {
      nodes.push(textNode(tok.text))
    } else if (tok.type === 'strong') {
      const inner = inlineTokensToLexical(tok.tokens)
      inner.forEach(n => { if (n.type === 'text' && typeof n.format === 'number') n.format |= TEXT_FORMAT.BOLD })
      nodes.push(...inner)
    } else if (tok.type === 'em') {
      const inner = inlineTokensToLexical(tok.tokens)
      inner.forEach(n => { if (n.type === 'text' && typeof n.format === 'number') n.format |= TEXT_FORMAT.ITALIC })
      nodes.push(...inner)
    } else if (tok.type === 'codespan') {
      nodes.push(textNode(tok.text, TEXT_FORMAT.CODE))
    } else if (tok.type === 'link') {
      const link: LexicalLink = { type: 'link', id: new ObjectID().toHexString(), fields: { linkType: 'custom', url: tok.href }, format: '', indent: 0, version: 1, direction: 'ltr', children: inlineTokensToLexical(tok.tokens) }
      nodes.push(link)
    } else if (tok.type === 'del') {
      const inner = inlineTokensToLexical(tok.tokens)
      inner.forEach(n => { if (n.type === 'text' && typeof n.format === 'number') n.format |= TEXT_FORMAT.STRIKETHROUGH })
      nodes.push(...inner)
    }
  }
  return nodes
}

function blockTokenToLexical(tok: Token): LexicalNode | LexicalNode[] | null {
  switch (tok.type) {
    case 'space':
      return null
    case 'paragraph':
      return { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textStyle: '', textFormat: 0, children: inlineTokensToLexical((tok as any).tokens ?? []) }
    case 'heading': {
      const tag = `h${tok.depth}` as 'h2' | 'h3'
      if (tag !== 'h2' && tag !== 'h3') return null // skip h1 and deeper
      return { type: 'heading', tag, format: '', indent: 0, version: 1, direction: 'ltr', textStyle: '', textFormat: 0, children: inlineTokensToLexical(tok.tokens ?? []) }
    }
    case 'blockquote': {
      // Marked nests a quote's content in paragraph/text block tokens that carry
      // the inline nodes. Passing the block tokens straight to
      // inlineTokensToLexical drops the content and yields an empty quote.
      const children: LexicalNode[] = []
      for (const childTok of (tok as any).tokens ?? []) {
        if ((childTok.type === 'paragraph' || childTok.type === 'text') && childTok.tokens) {
          children.push(...inlineTokensToLexical(childTok.tokens))
        } else {
          const child = blockTokenToLexical(childTok)
          if (child) {
            if (Array.isArray(child)) children.push(...child)
            else children.push(child)
          }
        }
      }
      return { type: 'quote', format: '', indent: 0, version: 1, direction: 'ltr', children }
    }
    case 'list': {
      const list: LexicalList = { type: 'list', listType: tok.ordered ? 'number' : 'bullet', format: '', indent: 0, version: 1, direction: 'ltr', children: [] }
      for (const item of (tok as any).items ?? []) {
        const li: LexicalListItem = { type: 'listitem', format: '', indent: 0, version: 1, direction: 'ltr', children: [] }
        if (item.tokens) {
          for (const childTok of item.tokens) {
            // Tight list items lex to a single 'text' token whose own `tokens`
            // hold the inline nodes. Falling through to the raw item.text below
            // would emit literal "**bold**" and "*italic*" markers.
            if (childTok.type === 'text' && (childTok as any).tokens) {
              li.children.push(...inlineTokensToLexical((childTok as any).tokens))
              continue
            }
            const child = blockTokenToLexical(childTok)
            if (child) {
              if (Array.isArray(child)) li.children.push(...child)
              else li.children.push(child)
            }
          }
        }
        if (li.children.length === 0) li.children.push(textNode(item.text ?? ''))
        list.children.push(li)
      }
      return list
    }
    case 'code':
      return { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textStyle: '', textFormat: 0, children: [{ type: 'text', text: tok.text, format: TEXT_FORMAT.CODE, version: 1 }] }
    case 'hr':
      return { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textStyle: '', textFormat: 0, children: [{ type: 'text', text: '───', format: 0, version: 1 }] }
    default:
      return null
  }
}

function markdownToLexicalState(md: string): Record<string, any> {
  const tokens = marked.lexer(md)
  const children: LexicalNode[] = []

  for (const tok of tokens) {
    const node = blockTokenToLexical(tok)
    if (node) {
      if (Array.isArray(node)) children.push(...node)
      else children.push(node)
    }
  }

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children,
      direction: 'ltr',
    },
  }
}

// ── Content file parser ────────────────────────────────────────

export interface PostDraft {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  body: Record<string, any> // Lexical serialized state
}

const FIELD_RE = /^\*\*(SLUG|TITLE|EXCERPT|PUBLISHED AT):\*\*\s*`(.+?)`\s*$/m

export function parsePostFile(filePath: string): PostDraft | null {
  const content = fs.readFileSync(filePath, 'utf-8')

  const slug = content.match(/^\*\*slug:\*\*\s*`?([^`\n]+)`?/im)?.[1]?.trim()
  const title =
    content.match(/^\*\*title:\*\*\s*`?([^`\n]+)`?/im)?.[1]?.trim() ||
    content.match(/^#\s+(.+)$/m)?.[1]?.trim()
  const excerpt = content.match(/^\*\*excerpt:\*\*\s*`?([^`\n]+)`?/im)?.[1]?.trim() ||
    content.match(/^\*\*meta description:\*\*\s*`?([^`\n]+)`?/im)?.[1]?.trim()
  const publishedAt = content.match(/^\*\*published at:\*\*\s*`?([^`\n]+)`?/im)?.[1]?.trim()

  if (!slug || !title) return null

  // Determine body: content inside an explicit "## BODY" section, or fall back
  // to everything after the metadata header for posts without that marker.
  const bodySectionMatch = content.match(/## BODY\s*\n---+\s*\n([\s\S]*)/)
  let bodyMd = bodySectionMatch?.[1] ?? ''

  if (!bodyMd.trim()) {
    // No "## BODY" marker (e.g. the taiga post). Drop everything through the
    // first "---" separator that ends the metadata header.
    const sepIndex = content.search(/\n---+\s*\n/)
    bodyMd = sepIndex >= 0 ? content.slice(sepIndex + 1) : content
    // The slice still begins with the "---" separator line — remove it.
    bodyMd = bodyMd.replace(/^---+\s*\n/, '')
  }

  // Strip a trailing sources/citation block. These always sit after a final
  // "---" separator and begin with "## Sources" or an italic citation line.
  const sourcesIndex = bodyMd.search(/\n---+\s*\n(?=\s*(?:## Sources|\*))/)
  if (sourcesIndex >= 0) bodyMd = bodyMd.slice(0, sourcesIndex)

  bodyMd = bodyMd.trim()

  return {
    slug,
    title,
    excerpt: excerpt ?? '',
    publishedAt: publishedAt ?? new Date().toISOString().split('T')[0] + 'T00:00:00.000Z',
    body: markdownToLexicalState(bodyMd),
  }
}

export function getAllPostDrafts(): PostDraft[] {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.startsWith('post-') && f.endsWith('.md'))
  const drafts: PostDraft[] = []

  for (const file of files) {
    const draft = parsePostFile(path.join(CONTENT_DIR, file))
    if (draft) drafts.push(draft)
  }

  return drafts
}

// ── CLI ────────────────────────────────────────────────────────

if (process.argv[1]?.endsWith('content-to-posts.ts') || process.argv[1]?.endsWith('content-to-posts.js')) {
  const drafts = getAllPostDrafts()
  console.log(JSON.stringify(drafts, null, 2))
}
