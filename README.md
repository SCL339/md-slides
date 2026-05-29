# md-slides 📽️

[![npm version](https://img.shields.io/npm/v/md-slides?style=flat-square&logo=npm)](https://www.npmjs.com/package/md-slides)
[![GitHub Release](https://img.shields.io/github/v/release/SCL339/md-slides?style=flat-square&logo=github)](https://github.com/SCL339/md-slides/releases)
[![MIT License](https://img.shields.io/github/license/SCL339/md-slides?style=flat-square)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/md-slides?style=flat-square)](https://www.npmjs.com/package/md-slides)

---

- **Dark theme** — Modern, easy-on-the-eyes dark design
- **Slide transitions** — Smooth fade + slide-up effect
- **Keyboard navigation** — Arrow keys, Space, Home/End
- **Touch support** — Swipe left/right on mobile
- **Fullscreen mode** — Press `f` to go fullscreen
- **Progress bar** — Visual indicator of your progress
- **Slide counter** — Current slide / total slides
- **Watch mode** — Auto-rebuild on file changes (`--watch`)
- **Custom templates** — Bring your own HTML template (`--template`)

---

# Run directly (no install needed)
npx md-slides presentation.md

# Or install globally
npm install -g md-slides
md-slides presentation.md
```

---

- Point two
- Point three

---

def hello():
print("Hello from md-slides!")
```
`

---

```

---

npx md-slides presentation.md
```

---

md-slides <input.md> [options]

Options:
-o, --output <file>   Output HTML file (default: <input>.html)
-t, --template <file> Custom HTML template
-w, --watch           Watch for changes and rebuild
-h, --help            Show this help
```

---

# Basic usage
md-slides talk.md

# Custom output path
md-slides deck.md -o index.html

# Watch mode (auto-rebuild on save)
md-slides presentation.md --watch

# Custom template
md-slides slides.md -t my-template.html
```

---

KER
More content

---

Final slide
```

---

|-----|--------|
| `→` / `↓` / `Space` | Next slide |
| `←` / `↑` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `f` | Toggle fullscreen |

---

- `{{SLIDE_COUNT}}` — Total number of slides

```bash
md-slides deck.md -t my-theme.html
```

---

- **Portable** — Single HTML file you can email, host on GitHub Pages, or open locally
- **Focus on content** — Write Markdown, get a presentation. That's it.
- **Beautiful defaults** — Dark theme looks great without any configuration

---

cd md-slides
npm install
node index.js example.md -o example.html
```

---

- 🚀 **Deploy your frontend** on [Vercel](https://vercel.com/?utm_source=scl339&utm_campaign=oss)
- ⭐ **Star this repo** to help others discover it

---

---

## 🤝 赞助支持 (Sponsor)

如果这个项目对你有帮助，可以请我喝杯咖啡 ☕

- 💖 **支付宝 (Alipay)**: `18559219554` | 邮箱联系: `530765059@qq.com`
- ☁️ **DigitalOcean 联盟链接**: [免费 $200 额度](https://www.digitalocean.com/?refcode=scl339-01&utm_campaign=Referral_Invite&utm_medium=opensource&utm_source=SCL339)
- ⭐ **在 GitHub 上点 Star** 帮助更多人发现这个项目

## 📄 License