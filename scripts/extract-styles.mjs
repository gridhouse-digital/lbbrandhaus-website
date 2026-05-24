import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const htmlPath = path.resolve(
  __dirname,
  '../../Design System Web Artefact/public/legacy-pages/home.html',
)
const html = fs.readFileSync(htmlPath, 'utf8')
const css = html.match(/<style>([\s\S]*?)<\/style>/)?.[1]
if (!css) throw new Error('No style block found')

const SKIP_SELECTOR =
  /\.(frame-meta|frame-desktop|frame-mobile-row|frame-mobile|artboard|ab-cover|ab-section|ds-card|logo-grid|logo-tile|palette|type-grid|comp-grid)\b/

function stripFrameDesktop(selector) {
  return selector
    .replace(/\.frame-desktop\s+/g, '')
    .replace(/^\.frame-desktop$/g, '')
    .trim()
}

function parseBlocks(source) {
  const blocks = []
  const lines = source.split(/\r?\n/)
  let i = 0

  while (i < lines.length) {
    while (i < lines.length && (!lines[i].trim() || lines[i].trim().startsWith('/*'))) i++
    if (i >= lines.length) break

    const selectorLines = []
    while (i < lines.length) {
      const line = lines[i]
      if (!line.trim()) break
      if (line.trim().startsWith('/*')) {
        i++
        continue
      }
      selectorLines.push(line)
      i++
      if (line.includes('{')) break
    }

    if (selectorLines.length === 0) continue

    const joined = selectorLines.join('\n')
    const braceIdx = joined.indexOf('{')
    if (braceIdx === -1) continue

    const selector = joined.slice(0, braceIdx).trim()
    const bodyLines = [joined.slice(braceIdx)]

    let depth =
      (joined.match(/\{/g) || []).length - (joined.match(/\}/g) || []).length

    while (i < lines.length && depth > 0) {
      const l = lines[i]
      bodyLines.push(l)
      depth += (l.match(/\{/g) || []).length
      depth -= (l.match(/\}/g) || []).length
      i++
    }

    blocks.push({ selector, body: bodyLines.join('\n') })
  }

  return blocks
}

function keepBlock(selector) {
  if (SKIP_SELECTOR.test(selector)) return false
  if (/\.frame-mobile\b/.test(selector)) return false
  return true
}

function normalizeBlock({ selector, body }) {
  const normalized = stripFrameDesktop(selector)
  if (!normalized || SKIP_SELECTOR.test(normalized)) return null
  return `${normalized} ${body.trim()}`
}

const cssLines = css.split(/\r?\n/)
const lineRanges = [
  [274, 318],
  [370, 662],
  [788, 807],
  [1066, 1211],
]
const chunks = lineRanges.map(([start, end]) =>
  cssLines.slice(start - 1, end).join('\n'),
)

const rules = chunks.flatMap((chunk) => parseBlocks(chunk))
const siteCss = rules
  .filter((b) => keepBlock(b.selector))
  .map(normalizeBlock)
  .filter(Boolean)
  .join('\n\n')

const extras = `
.scr-nav {
  padding: 18px 32px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 0.5px solid var(--rule);
  background: var(--bone);
}

.scr-nav .brand-mark .mark {
  background: transparent !important;
  width: 110px !important;
  height: 88px !important;
  border-radius: 0 !important;
  overflow: visible !important;
}
.scr-nav .brand-mark .mark img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
}
.scr-nav .brand-mark .name { display: none !important; }

.scr-ticker {
  background: #153534 !important;
  color: rgba(255, 252, 235, 0.85) !important;
  border-color: rgba(255, 252, 235, 0.18) !important;
  padding: 14px 0 !important;
  padding-left: 0 !important;
  display: block !important;
  overflow: hidden !important;
}
.scr-ticker .lb-track {
  display: inline-flex;
  gap: 50px;
  padding-left: 50px;
  animation: lb-marquee 30s linear infinite;
  white-space: nowrap;
}
.scr-ticker .lb-track > span {
  display: inline-flex;
  gap: 50px;
  align-items: center;
  flex-shrink: 0;
}
.scr-ticker .dot { background: #CC5500 !important; }

@keyframes lb-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.scr-foot { margin-top: 0 !important; }

.scr-studio-dark {
  background: #153534 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-left: 0 !important;
  align-items: stretch !important;
}
.scr-studio-dark .img-frame {
  aspect-ratio: auto !important;
  height: 100% !important;
  max-height: 680px !important;
}
.scr-studio-dark .img-frame img {
  height: 100% !important;
  width: 100% !important;
  object-fit: cover !important;
}
.scr-studio-dark > div:nth-child(2) {
  padding: 88px 32px 88px 0 !important;
}

.btn, .nav-book, .cta {
  font-family: 'Montserrat', sans-serif !important;
  letter-spacing: 0.04em;
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease !important;
}
.btn:hover, .nav-book:hover, .cta:hover { transform: translateY(-1px); }

.scr-services-teaser .head h2,
.scr-port-hero h1,
.scr-studio-hero h1,
.scr-contact-hero h1,
.scr-svc-detail h3,
.scr-work .head h2 {
  letter-spacing: -0.02em;
}

.pill {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11px !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  padding: 10px 18px !important;
  border: 0.5px solid rgba(16, 16, 20, 0.14) !important;
  border-radius: 999px !important;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.pill.active {
  background: #101014 !important;
  color: #fffceb !important;
  border-color: #101014 !important;
}
.pill:hover:not(.active) {
  border-color: #101014 !important;
  color: #101014 !important;
}

input, textarea {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
}
.field label {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 500 !important;
}

.scr-hero {
  padding: 56px 64px 56px 96px;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  min-height: auto;
  align-items: center;
}
.scr-hero .index { top: 28px; left: 96px; }
.scr-hero h1 { font-size: 104px; line-height: 0.96; margin-top: 8px; }
.scr-hero p { max-width: 420px; }
.scr-hero .img-frame {
  aspect-ratio: 4/5;
  border-radius: 50% / 38%;
  overflow: hidden;
}
`

const outPath = path.join(__dirname, '../src/styles/site.css')
fs.writeFileSync(outPath, `${siteCss}\n${extras}`)
console.log('Wrote', outPath, fs.statSync(outPath).size, 'bytes')
