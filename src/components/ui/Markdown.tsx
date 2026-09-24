import { Fragment, type ReactNode } from 'react'

/**
 * Tiny markdown renderer for blog bodies — headings, paragraphs, lists,
 * blockquotes, bold and italic. Deliberately dependency-free: the content
 * is authored in src/data/posts.ts, not user-supplied, so no sanitiser is needed
 * and nothing is ever injected as raw HTML.
 */

const inline = (text: string): ReactNode =>
  text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((chunk, index) => {
    if (chunk.startsWith('**') && chunk.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-ink-900">
          {chunk.slice(2, -2)}
        </strong>
      )
    }
    if (chunk.startsWith('*') && chunk.endsWith('*') && chunk.length > 2) {
      return (
        <em key={index} className="italic">
          {chunk.slice(1, -1)}
        </em>
      )
    }
    return <Fragment key={index}>{chunk}</Fragment>
  })

export function Markdown({ content }: { content: string }) {
  const blocks = content.trim().split(/\n{2,}/)

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const lines = block.split('\n')

        if (block.startsWith('### ')) {
          return (
            <h3 key={index} className="pt-2 text-xl font-semibold text-forest-700">
              {inline(block.slice(4))}
            </h3>
          )
        }

        if (block.startsWith('## ')) {
          return (
            <h2 key={index} className="pt-4 text-display-sm font-semibold text-forest-700">
              {inline(block.slice(3))}
            </h2>
          )
        }

        if (block.startsWith('> ')) {
          return (
            <blockquote
              key={index}
              className="rounded-2xl border-l-4 border-apricot-500 bg-sage-100 px-6 py-5 font-display text-lg text-forest-700"
            >
              {inline(lines.map((line) => line.replace(/^> ?/, '')).join(' '))}
            </blockquote>
          )
        }

        if (lines.every((line) => /^\d+\.\s/.test(line))) {
          return (
            <ol key={index} className="space-y-3 pl-1">
              {lines.map((line, i) => (
                <li key={i} className="flex gap-3 text-ink-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-600 text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <span>{inline(line.replace(/^\d+\.\s/, ''))}</span>
                </li>
              ))}
            </ol>
          )
        }

        if (lines.every((line) => line.startsWith('- '))) {
          return (
            <ul key={index} className="space-y-3 pl-1">
              {lines.map((line, i) => (
                <li key={i} className="flex gap-3 text-ink-700">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-apricot-500" />
                  <span>{inline(line.slice(2))}</span>
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p key={index} className="text-pretty leading-relaxed text-ink-700">
            {inline(block)}
          </p>
        )
      })}
    </div>
  )
}
