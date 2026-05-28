# md-slides 📽️

[![npm version](https://img.shields.io/npm/v/md-slides?style=flat-square&logo=npm)](https://www.npmjs.com/package/md-slides)
[![GitHub Release](https://img.shields.io/github/v/release/SCL339/md-slides?style=flat-square&logo=github)](https://github.com/SCL339/md-slides/releases)
[![MIT License](https://img.shields.io/github/license/SCL339/md-slides?style=flat-square)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/md-slides?style=flat-square)](https://www.npmjs.com/package/md-slides)

**md-slides** is a simple yet powerful Markdown-to-HTML presentation tool — like slidev-lite. Write your slides in Markdown, separate them with `---`, and get a **single self-contained HTML file** with a dark theme, smooth transitions, keyboard navigation, and touch support.

> ✨ Part of the [SCL339](https://github.com/SCL339) open-source ecosystem.

---

## Features ✨

- **Zero config** — Write Markdown, get a beautiful HTML presentation
- **Single HTML file** — Self-contained, no external dependencies or internet needed
- **Dark theme** — Modern, easy-on-the-eyes dark design
- **Slide transitions** — Smooth fade + slide-up effect
- **Keyboard navigation** — Arrow keys, Space, Home/End
- **Touch support** — Swipe left/right on mobile
- **Fullscreen mode** — Press `f` to go fullscreen
- **Progress bar** — Visual indicator of your progress
- **Slide counter** — Current slide / total slides
- **Watch mode** — Auto-rebuild on file changes (`--watch`)
- **Custom templates** — Bring your own HTML template (`--template`)

## Installation 📦

```bash
# Run directly (no install needed)
npx md-slides presentation.md

# Or install globally
npm install -g md-slides
md-slides presentation.md
```

## Usage 🚀

### Quick Start

Create a file `presentation.md`:

```markdown
# My Awesome Talk

A short intro

---

## Slide 2

- Point one
- Point two
- Point three

---

## Code Example

```python
def hello():
    print("Hello from md-slides!")
```
`

---

## Thanks!

Questions?
```

Then run:

```bash
npx md-slides presentation.md
```

This generates `presentation.html` — open it in any browser.

### CLI Options

```bash
md-slides <input.md> [options]

Options:
  -o, --output <file>   Output HTML file (default: <input>.html)
  -t, --template <file> Custom HTML template
  -w, --watch           Watch for changes and rebuild
  -h, --help            Show this help
```

### Examples

```bash
# Basic usage
md-slides talk.md

# Custom output path
md-slides deck.md -o index.html

# Watch mode (auto-rebuild on save)
md-slides presentation.md --watch

# Custom template
md-slides slides.md -t my-template.html
```

## Slide Separator 📄

Use `---` on its own line to separate slides:

```markdown
# Slide 1
Content here

---

# Slide 2
More content

---

# Slide 3
Final slide
```

## Keyboard Shortcuts ⌨️

| Key | Action |
|-----|--------|
| `→` / `↓` / `Space` | Next slide |
| `←` / `↑` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `f` | Toggle fullscreen |

## Custom Templates 🎨

Create your own HTML template with these placeholders:

- `{{TITLE}}` — Presentation title (extracted from first slide)
- `{{SLIDES}}` — All slide HTML content
- `{{SLIDE_COUNT}}` — Total number of slides

```bash
md-slides deck.md -t my-theme.html
```

## Why md-slides? 🤔

- **Lightweight** — No build tools, no npm run scripts, no webpack
- **Portable** — Single HTML file you can email, host on GitHub Pages, or open locally
- **Focus on content** — Write Markdown, get a presentation. That's it.
- **Beautiful defaults** — Dark theme looks great without any configuration

## Example Output

Open the generated HTML in any browser:

![md-slides screenshot placeholder](https://via.placeholder.com/800x450/0f0f1a/c0c0ff?text=md-slides+Presentation)

## Related Projects 🔗

Check out other [SCL339](https://github.com/SCL339) tools:

- [auto-changelog-action](https://github.com/SCL339/auto-changelog-action) — Auto-generate CHANGELOG from PR titles/labels
- [pr-labeler-action](https://github.com/SCL339/pr-labeler-action) — Auto-label PRs based on changed file paths

## Development 🛠️

```bash
git clone https://github.com/SCL339/md-slides.git
cd md-slides
npm install
node index.js example.md -o example.html
```



---

## 🤝 Support

If you find this project useful, consider supporting my work:

- 💖 **赞助支持 (Sponsor)**: 支付宝 `18559219554`
- ☁️ **Get $200 free credit** on [DigitalOcean](https://www.digitalocean.com/?refcode=scl339-01&utm_campaign=Referral_Invite&utm_medium=opensource&utm_source=SCL339)
- 🚀 **Deploy your frontend** on [Vercel](https://vercel.com/?utm_source=scl339&utm_campaign=oss)
- ⭐ **Star this repo** to help others discover it


## 📄 License

MIT — see [LICENSE](LICENSE) for details.
