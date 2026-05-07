/**
 * Simple Portable Text (blockContent) to HTML serializer for Astro.
 * Converts Sanity's structured JSON blocks to safe HTML strings.
 */

export interface PortableTextBlock {
  _type?: string;
  style?: string;
  markDefs?: Array<{_type: string; href?: string; title?: string}>;
  children?: Array<{text?: string; marks?: string[]}>;
}

export function serializePortableText(blocks: PortableTextBlock[] | null | undefined): string {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return ''
  }

  const markDefs = new Map<string, {href?: string; title?: string}>([])

  // Collect all markDefs from first block (they're shared across blocks)
  for (const block of blocks) {
    if (block.markDefs && Array.isArray(block.markDefs)) {
      for (const def of block.markDefs) {
        if (def._type === 'link' && def.href) {
          markDefs.set(def._key || '', def)
        }
      }
    }
  }

  // Find the _key field name used in children marks
  let keyField = '_key'
  for (const block of blocks) {
    if (block.markDefs && block.markDefs[0]?._key !== undefined) {
      keyField = '_key'
      break
    }
  }

  const htmlParts: string[] = []

  for (const block of blocks) {
    if (!block || block._type !== 'block') {
      continue
    }

    const textContent = renderBlockText(block, markDefs, keyField)
    if (!textContent.trim()) continue

    const tag = block.style === 'h1' ? 'h1' :
                block.style === 'h2' ? 'h2' :
                block.style === 'h3' ? 'h3' :
                block.style === 'h4' ? 'h4' :
                block.style === 'blockquote' ? 'blockquote' : 'p'

    htmlParts.push(`<${tag}>${textContent}</${tag}>`)
  }

  return htmlParts.join('\n')
}

function renderBlockText(block: PortableTextBlock, markDefs: Map<string, {href?: string; title?: string}>, keyField: string): string {
  if (!block.children || !Array.isArray(block.children)) {
    return ''
  }

  const parts: string[] = []

  for (const child of block.children) {
    if (!child.text || !child.marks) {
      parts.push(escapeHtml(child.text || ''))
      continue
    }

    let text = escapeHtml(child.text)

    // Apply marks (bold, italic, links)
    const marksWithLinks: Array<{markId: string; openTag: string; closeTag: string}> = []
    for (const markId of child.marks) {
      const def = markDefs.get(markId)
      if (def && def.href) {
        const titleAttr = def.title ? ` title="${escapeHtml(def.title)}"` : ''
        marksWithLinks.push({
          markId,
          openTag: `<a href="${escapeHtml(def.href)}" target="_blank" rel="noopener"${titleAttr}>`,
          closeTag: '</a>',
        })
      } else {
        // Inline marks like strong/em aren't in markDefs but are style names
        if (markId === 'strong') {
          marksWithLinks.push({markId, openTag: '<strong>', closeTag: '</strong>'})
        } else if (markId === 'em') {
          marksWithLinks.push({markId, openTag: '<em>', closeTag: '</em>'})
        } else if (markId === 'code') {
          marksWithLinks.push({markId, openTag: '<code>', closeTag: '</code>'})
        }
      }
    }

    // Wrap text with mark tags
    const opens = marksWithLinks.map(m => m.openTag).join('')
    const closes = marksWithLinks.map(m => m.closeTag).reverse().join('')
    parts.push(opens + text + closes)
  }

  return parts.join('')
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Convert Portable Text to plain text (no HTML).
 * Useful for summaries or when you just need the raw text.
 */
export function portableTextToPlainText(blocks: PortableTextBlock[] | null | undefined): string {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return ''
  }

  const parts: string[] = []
  for (const block of blocks) {
    if (!block?.children) continue
    for (const child of block.children) {
      parts.push(child.text || '')
    }
  }
  return parts.join('')
}
