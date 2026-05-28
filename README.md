1|     1|     1|# md-slides 📽️
     2|     2|     2|
     3|     3|     3|[![npm version](https://img.shields.io/npm/v/md-slides?style=flat-square&logo=npm)](https://www.npmjs.com/package/md-slides)
     4|     4|     4|[![GitHub Release](https://img.shields.io/github/v/release/SCL339/md-slides?style=flat-square&logo=github)](https://github.com/SCL339/md-slides/releases)
     5|     5|     5|[![MIT License](https://img.shields.io/github/license/SCL339/md-slides?style=flat-square)](LICENSE)
     6|     6|     6|[![npm downloads](https://img.shields.io/npm/dt/md-slides?style=flat-square)](https://www.npmjs.com/package/md-slides)
     7|     7|     7|
     8|     8|     8|---
     9|     9|     9|
    10|    10|    10|
    11|    11|    11|- **Dark theme** — Modern, easy-on-the-eyes dark design
    12|    12|    12|- **Slide transitions** — Smooth fade + slide-up effect
    13|    13|    13|- **Keyboard navigation** — Arrow keys, Space, Home/End
    14|    14|    14|- **Touch support** — Swipe left/right on mobile
    15|    15|    15|- **Fullscreen mode** — Press `f` to go fullscreen
    16|    16|    16|- **Progress bar** — Visual indicator of your progress
    17|    17|    17|- **Slide counter** — Current slide / total slides
    18|    18|    18|- **Watch mode** — Auto-rebuild on file changes (`--watch`)
    19|    19|    19|- **Custom templates** — Bring your own HTML template (`--template`)
    20|    20|    20|
    21|    21|    21|---
    22|    22|    22|
    23|    23|    23|
    24|    24|    24|# Run directly (no install needed)
    25|    25|    25|npx md-slides presentation.md
    26|    26|    26|
    27|    27|    27|# Or install globally
    28|    28|    28|npm install -g md-slides
    29|    29|    29|md-slides presentation.md
    30|    30|    30|```
    31|    31|    31|
    32|    32|    32|---
    33|    33|    33|
    34|    34|    34| ARKER
    35|    35|    35|- Point two
    36|    36|    36|- Point three
    37|    37|    37|
    38|    38|    38|---
    39|    39|    39|
    40|    40|    40|
    41|    41|    41|def hello():
    42|    42|    42|    print("Hello from md-slides!")
    43|    43|    43|```
    44|    44|    44|`
    45|    45|    45|
    46|    46|    46|---
    47|    47|    47|
    48|    48|    48|
    49|    49|    49|```
    50|    50|    50|
    51|    51|    51|---
    52|    52|    52|
    53|    53|    53|
    54|    54|    54|npx md-slides presentation.md
    55|    55|    55|```
    56|    56|    56|
    57|    57|    57|---
    58|    58|    58|
    59|    59|    59|
    60|    60|    60|md-slides <input.md> [options]
    61|    61|    61|
    62|    62|    62|Options:
    63|    63|    63|  -o, --output <file>   Output HTML file (default: <input>.html)
    64|    64|    64|  -t, --template <file> Custom HTML template
    65|    65|    65|  -w, --watch           Watch for changes and rebuild
    66|    66|    66|  -h, --help            Show this help
    67|    67|    67|```
    68|    68|    68|
    69|    69|    69|---
    70|    70|    70|
    71|    71|    71|
    72|    72|    72|# Basic usage
    73|    73|    73|md-slides talk.md
    74|    74|    74|
    75|    75|    75|# Custom output path
    76|    76|    76|md-slides deck.md -o index.html
    77|    77|    77|
    78|    78|    78|# Watch mode (auto-rebuild on save)
    79|    79|    79|md-slides presentation.md --watch
    80|    80|    80|
    81|    81|    81|# Custom template
    82|    82|    82|md-slides slides.md -t my-template.html
    83|    83|    83|```
    84|    84|    84|
    85|    85|    85|---
    86|    86|    86|
    87|    87|    87|KER
    88|    88|    88|More content
    89|    89|    89|
    90|    90|    90|---
    91|    91|    91|
    92|    92|    92|
    93|    93|    93|Final slide
    94|    94|    94|```
    95|    95|    95|
    96|    96|    96|---
    97|    97|    97|
    98|    98|    98|
    99|    99|    99||-----|--------|
   100|   100|   100|| `→` / `↓` / `Space` | Next slide |
   101|   101|   101|| `←` / `↑` | Previous slide |
   102|   102|   102|| `Home` | First slide |
   103|   103|   103|| `End` | Last slide |
   104|   104|   104|| `f` | Toggle fullscreen |
   105|   105|   105|
   106|   106|   106|---
   107|   107|   107|
   108|   108|   108|
   109|   109|   109|- `{{SLIDE_COUNT}}` — Total number of slides
   110|   110|   110|
   111|   111|   111|```bash
   112|   112|   112|md-slides deck.md -t my-theme.html
   113|   113|   113|```
   114|   114|   114|
   115|   115|   115|---
   116|   116|   116|
   117|   117|   117|
   118|   118|   118|- **Portable** — Single HTML file you can email, host on GitHub Pages, or open locally
   119|   119|   119|- **Focus on content** — Write Markdown, get a presentation. That's it.
   120|   120|   120|- **Beautiful defaults** — Dark theme looks great without any configuration
   121|   121|   121|
   122|   122|   122|---
   123|   123|   123|
   124|   124|   124|
   125|   125|   125|cd md-slides
   126|   126|   126|npm install
   127|   127|   127|node index.js example.md -o example.html
   128|   128|   128|```
   129|   129|   129|
   130|   130|   130|---
   131|   131|   131|
   132|   132|   132|ARKER
   133|   133|   133|- 🚀 **Deploy your frontend** on [Vercel](https://vercel.com/?utm_source=scl339&utm_campaign=oss)
   134|   134|   134|- ⭐ **Star this repo** to help others discover it
   135|   135|   135|
   136|   136|   136|
   137|   137|   137|---
   138|   138|   138|
   139|   139|   139|
   140|   140|   140|

---

## 🤝 赞助支持 (Sponsor)

如果这个项目对你有帮助，可以请我喝杯咖啡 ☕

- 💖 **支付宝 (Alipay)**: `18559219554` | 邮箱联系: `530765059@qq.com`
- ☁️ **DigitalOcean 联盟链接**: [免费 $200 额度](https://www.digitalocean.com/?refcode=scl339-01&utm_campaign=Referral_Invite&utm_medium=opensource&utm_source=SCL339)
- ⭐ **在 GitHub 上点 Star** 帮助更多人发现这个项目

## 📄 License
