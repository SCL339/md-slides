#!/usr/bin/env node

/**
 * md-slides — Markdown to self-contained HTML presentation.
 *
 * Usage:
 *   npx md-slides slides.md            # generates slides.html
 *   npx md-slides slides.md -o out.html # custom output
 *   npx md-slides slides.md -t custom.html # custom template
 *   npx md-slides slides.md --watch      # rebuild on changes
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const helpFlags = new Set(['-h', '--help']);
const watchFlags = new Set(['-w', '--watch']);

if (args.length === 0 || args.some(a => helpFlags.has(a))) {
  console.log(`
  md-slides v${require('./package.json').version}

  Usage: md-slides <input.md> [options]

  Options:
    -o, --output <file>   Output HTML file (default: <input>.html)
    -t, --template <file> Custom HTML template
    -w, --watch           Watch for changes and rebuild
    -h, --help            Show this help

  Examples:
    md-slides presentation.md
    md-slides talk.md -o index.html
    md-slides deck.md --watch
  `);
  process.exit(0);
}

let inputFile = null;
let outputFile = null;
let templateFile = null;
let watchMode = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '-o' || arg === '--output') {
    outputFile = args[++i];
  } else if (arg === '-t' || arg === '--template') {
    templateFile = args[++i];
  } else if (watchFlags.has(arg)) {
    watchMode = true;
  } else if (!arg.startsWith('-')) {
    inputFile = arg;
  }
}

if (!inputFile) {
  console.error('❌ Error: No input markdown file specified.');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`❌ Error: File not found: ${inputFile}`);
  process.exit(1);
}

// Default output: <input>.html
if (!outputFile) {
  const parsed = path.parse(inputFile);
  outputFile = path.join(parsed.dir, parsed.name + '.html');
}

// ── Template ────────────────────────────────────────────────────────
function getDefaultTemplate() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{TITLE}}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    background: #0f0f1a;
    color: #e0e0e0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }
  #slides-container {
    width: 100vw;
    height: 100vh;
    position: relative;
  }
  .slide {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5vw 8vw;
    opacity: 0;
    transition: opacity 0.5s ease, transform 0.5s ease;
    transform: translateY(20px) scale(0.97);
    pointer-events: none;
    overflow-y: auto;
  }
  .slide.active {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }
  .slide h1 { font-size: clamp(2rem, 5vw, 4rem); margin-bottom: 0.5em; color: #f0f0ff; }
  .slide h2 { font-size: clamp(1.5rem, 3.5vw, 3rem); margin-bottom: 0.6em; color: #c0c0ff; }
  .slide h3 { font-size: clamp(1.2rem, 2.5vw, 2rem); margin-bottom: 0.5em; color: #a0a0ff; }
  .slide p { font-size: clamp(1rem, 2vw, 1.5rem); line-height: 1.7; margin-bottom: 0.8em; max-width: 80vw; }
  .slide ul, .slide ol { font-size: clamp(1rem, 2vw, 1.4rem); line-height: 1.8; margin-bottom: 0.8em; padding-left: 1.5em; max-width: 70vw; }
  .slide li { margin-bottom: 0.3em; }
  .slide code {
    background: #1e1e30;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
    color: #7ec8e3;
  }
  .slide pre {
    background: #1a1a2e;
    padding: 1.2em;
    border-radius: 8px;
    overflow-x: auto;
    max-width: 85vw;
    border: 1px solid #2a2a40;
    margin-bottom: 0.8em;
  }
  .slide pre code {
    background: transparent;
    padding: 0;
    font-size: 0.85em;
    color: #d4d4d4;
  }
  .slide blockquote {
    border-left: 4px solid #6c6cf0;
    padding: 0.5em 1em;
    margin: 0.5em 0;
    background: #1a1a30;
    border-radius: 0 8px 8px 0;
    font-style: italic;
  }
  .slide img { max-width: 70vw; max-height: 50vh; border-radius: 8px; margin: 0.5em 0; }
  .slide a { color: #7c9cf0; text-decoration: none; }
  .slide a:hover { text-decoration: underline; }
  .slide table { border-collapse: collapse; margin: 0.5em 0; font-size: 0.9em; }
  .slide th, .slide td { border: 1px solid #2a2a40; padding: 0.5em 1em; text-align: left; }
  .slide th { background: #1e1e35; color: #c0c0ff; }
  .slide hr { border: none; border-top: 2px solid #2a2a40; margin: 1em 0; width: 50%; }

  #nav {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 1.2rem;
    align-items: center;
    background: rgba(15, 15, 26, 0.85);
    backdrop-filter: blur(10px);
    padding: 0.6rem 1.5rem;
    border-radius: 50px;
    border: 1px solid #2a2a40;
    z-index: 100;
  }
  #nav button {
    background: none;
    border: none;
    color: #a0a0c0;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    transition: all 0.2s;
  }
  #nav button:hover { color: #f0f0ff; background: #2a2a40; }
  #nav button:disabled { color: #3a3a50; cursor: default; background: none; }
  #nav #slide-counter {
    font-size: 0.9rem;
    color: #8080a0;
    min-width: 4rem;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
  .slide-number-badge {
    position: fixed;
    top: 1rem;
    right: 1.5rem;
    color: #505070;
    font-size: 0.8rem;
    z-index: 100;
  }
  .progress-bar {
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6c6cf0, #a06cf0);
    z-index: 200;
    transition: width 0.3s ease;
  }
  @media (max-width: 768px) {
    .slide { padding: 4vw 5vw; }
    .slide p, .slide ul { font-size: 1rem; }
    #nav { gap: 0.8rem; padding: 0.5rem 1rem; }
  }
</style>
</head>
<body>
<div class="progress-bar" id="progress-bar"></div>
<div class="slide-number-badge" id="slide-number">1 / {{SLIDE_COUNT}}</div>
<div id="slides-container">
{{SLIDES}}
</div>
<div id="nav">
  <button id="prev-btn" onclick="prevSlide()" title="Previous (←)">◀</button>
  <span id="slide-counter">1 / {{SLIDE_COUNT}}</span>
  <button id="next-btn" onclick="nextSlide()" title="Next (→)">▶</button>
</div>
<script>
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(idx) {
  if (idx < 0) idx = 0;
  if (idx >= totalSlides) idx = totalSlides - 1;
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === idx);
  });
  currentSlide = idx;
  document.getElementById('slide-counter').textContent = (idx + 1) + ' / ' + totalSlides;
  document.getElementById('slide-number').textContent = (idx + 1) + ' / ' + totalSlides;
  document.getElementById('progress-bar').style.width = ((idx + 1) / totalSlides * 100) + '%';
  document.getElementById('prev-btn').disabled = idx === 0;
  document.getElementById('next-btn').disabled = idx === totalSlides - 1;
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); nextSlide(); }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prevSlide(); }
  if (e.key === 'Home') { e.preventDefault(); showSlide(0); }
  if (e.key === 'End') { e.preventDefault(); showSlide(totalSlides - 1); }
});

// Touch support
let touchStartX = 0;
document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
document.addEventListener('touchend', (e) => {
  const diff = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? prevSlide() : nextSlide();
  }
});

// Fullscreen with 'f' key
document.addEventListener('keydown', (e) => {
  if (e.key === 'f' && !e.ctrlKey && !e.metaKey) {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }
});

showSlide(0);
</script>
</body>
</html>`;
}

// ── Parse Markdown into slides ──────────────────────────────────────
function parseSlides(markdown) {
  // Split on --- preceded by blank line (or at start)
  // This handles: `\n---\n` as slide separator
  const separatorRegex = /(?:\n|^)---\n/g;
  const rawSlides = markdown.split(separatorRegex).map(s => s.trim()).filter(Boolean);

  if (rawSlides.length === 0) {
    return ['<p>No slides found. Use <code>---</code> to separate slides.</p>'];
  }

  return rawSlides.map(slideMd => {
    let html = marked.parse(slideMd, { breaks: true, gfm: true });
    return `<div class="slide">${html}</div>`;
  });
}

// ── Build HTML with title extraction ────────────────────────────────
function buildHTML(slidesHtml, templateContent) {
  const slideCount = slidesHtml.length;
  let title = 'Presentation';

  // Try to extract title from first slide
  const firstSlide = slidesHtml[0];
  const titleMatch = firstSlide.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (titleMatch) title = titleMatch[1];

  let result = templateContent
    .replace(/\{\{TITLE\}\}/g, title)
    .replace(/\{\{SLIDE_COUNT\}\}/g, String(slideCount))
    .replace(/\{\{SLIDES\}\}/g, slidesHtml.join('\n'));

  return result;
}

// ── Build ───────────────────────────────────────────────────────────
function build() {
  const markdown = fs.readFileSync(inputFile, 'utf-8');

  let templateContent;
  if (templateFile) {
    if (!fs.existsSync(templateFile)) {
      console.error(`❌ Error: Template file not found: ${templateFile}`);
      process.exit(1);
    }
    templateContent = fs.readFileSync(templateFile, 'utf-8');
  } else {
    templateContent = getDefaultTemplate();
  }

  const slidesHtml = parseSlides(markdown);
  const html = buildHTML(slidesHtml, templateContent);

  fs.writeFileSync(outputFile, html, 'utf-8');
  console.log(`✅ Built ${slidesHtml.length} slides → ${outputFile}`);
}

// ── Watch mode ──────────────────────────────────────────────────────
if (watchMode) {
  console.log(`👀 Watching ${inputFile} for changes...`);
  build();
  fs.watch(inputFile, (eventType) => {
    if (eventType === 'change') {
      console.log(`\n📝 File changed, rebuilding...`);
      build();
    }
  });
} else {
  build();
}
