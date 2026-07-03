# Seed Concepts — Draft for Owner Review

Extracted from the repo's **actual lesson content** (`lessons.js`) and quiz banks
(`script.js`), per the spec's instruction to seed from what's currently taught. Not yet
approved — this is the §7 "confirm the concept list" open item, made concrete.

**Curriculum-pivot caveat:** `VISION.md` § "Curriculum Pivot" drops Scratch and re-themes
all six courses (JSS = game-dev, SS = real-world capstones). The lesson content in
`lessons.js` still reflects the *old* sequence. The HTML/CSS/JS concepts below survive the
pivot unchanged in substance (only their project framing changes); the Scratch concepts do
not. Recommendation: **seed the 16 HTML/CSS/JS concepts, skip the 8 Scratch ones** unless
Scratch students remain active during the transition.

## Tier 1 — recommended first seed (16 concepts, HTML/CSS/JS)

| # | Slug | Title | Tags | Grade | Source (lessons.js) |
|---|---|---|---|---|---|
| 1 | `what-is-html` | What is HTML? | html, structure, web | JSS3 | "What is HTML?" |
| 2 | `html-tags` | Tags & Structure | html, tags, elements, closing-tags | JSS3 | "Tags and Structure" |
| 3 | `headings-paragraphs` | Headings & Paragraphs | html, headings, text, semantics | JSS3 | "Headings and Paragraphs" |
| 4 | `links-images` | Links & Images | html, links, images, alt-text | JSS3 | "Links and Images" |
| 5 | `html-lists` | Lists | html, lists, ol, ul | SS1 | "Lists" |
| 6 | `html-tables` | Tables | html, tables, rows, cells | SS1 | "Tables" |
| 7 | `html-forms` | Forms & Inputs | html, forms, inputs, labels | SS1 | "Forms and Inputs" |
| 8 | `semantic-html` | Semantic HTML | html, semantics, header, nav, footer | SS1 | "Semantic HTML" |
| 9 | `what-is-css` | What is CSS? / Cascading | css, styling, cascade | SS2 | "What is CSS?" |
| 10 | `css-selectors` | Selectors | css, selectors, class, id, specificity | SS2 | "Selectors" |
| 11 | `box-model` | The Box Model | css, box-model, padding, margin, border | SS2 | "The Box Model" |
| 12 | `colors-fonts` | Colours & Fonts | css, colors, fonts, design | SS2 | "Colours & Fonts" |
| 13 | `what-is-js` | What is JavaScript? | javascript, behavior, logic | SS3 | "What is JavaScript?" |
| 14 | `js-variables` | Variables (let/const) | javascript, variables, let, const, equality | SS3 | "Variables" |
| 15 | `js-functions` | Functions | javascript, functions, parameters, return | SS3 | "Functions" |
| 16 | `dom-basics` | DOM Basics | javascript, dom, events, querySelector | SS3 | "DOM Basics" |

## Tier 2 — Scratch concepts (transitional; seed only if Scratch students stay active)

| # | Slug | Title | Tags | Grade |
|---|---|---|---|---|
| 17 | `scratch-events` | Events / Green Flag | scratch, events, green-flag | JSS1 |
| 18 | `scratch-motion` | Motion & Coordinates | scratch, motion, coordinates, x-y | JSS1 |
| 19 | `scratch-loops` | Loops: Repeat vs Forever | scratch, loops, repeat, forever | JSS1 |
| 20 | `scratch-conditionals` | Control Blocks (If/Else) | scratch, conditionals, if-else, control | JSS2 |
| 21 | `scratch-variables` | Variables | scratch, variables, score, state | JSS2 |
| 22 | `scratch-broadcast` | Broadcast Messages | scratch, broadcast, messages, events | JSS2 |
| 23 | `scratch-clones` | Clones | scratch, clones, sprites | JSS2 |
| 24 | `what-is-scratch` | What is Scratch? | scratch, blocks, sprites, stage | JSS1 |

## `common_confusions` starter material (drawn from the lessons' own warning callouts)

The existing lesson content already encodes known failure modes as "Watch Out" callouts —
these are grounded starting points, pending the owner's review against real RSSOWO
teaching experience (§7 open item 2):

- **html-tags:** missed closing tags break layout and make debugging hard.
- **js-variables:** `=` (assignment) vs `===` (strict equality); stale values when not reset.
- **css-selectors:** ID selectors are very specific — students overuse `#id` where `.class`
  is right; dot-vs-hash syntax mixups.
- **box-model:** widths behave unexpectedly without `box-sizing: border-box`.
- **html-tables:** using tables for page layout instead of data.
- **scratch-loops:** game logic not wrapped in a Forever loop, so it runs once and stops.
- **scratch-events:** no event block at the top → script never runs.
- **scratch-clones:** clones never deleted → project slows down.
