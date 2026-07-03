-- Concept Knowledge Base — migration 002: seed the 16 Tier-1 concepts
-- (HTML/CSS/JS — the concepts that survive the curriculum pivot; Scratch skipped
-- per knowledge-base/open-decisions.md §2 resolution.)
--
-- content_md is written in Moya's voice (warm, plain English, short sentences,
-- everyday analogies) — NOT textbook-neutral. Edit freely; these are v1 drafts
-- meant to be improved from real usage and gap review.

-- ═══ HTML — JSS3 ═══════════════════════════════════════════════════════════

insert into concept_pages (slug, title, content_md, common_confusions, difficulty_tier) values
('what-is-html', 'What is HTML?', $md$
**HTML is the skeleton of every web page.** Every site you have ever visited — Google, WhatsApp Web, your school's site — starts as HTML.

Think of building a house: before paint or furniture, you need the frame — walls, doors, rooms. HTML is that frame. It says *what things are* and *where they go*: "this is a heading", "this is a paragraph", "this is an image".

```html
<h1>My First Page</h1>
<p>I am learning HTML with MoyaCode!</p>
```

That's already a real web page. Save it, open it in a browser, and it works.

**Remember:** HTML is structure, not beauty. The beauty comes later with CSS — first we build the frame.
$md$, array['Thinking HTML is a programming language with logic — it''s a markup language: it describes structure, it doesn''t compute', 'Expecting HTML alone to look styled — plain HTML looks plain on purpose'], 'beginner'),

('html-tags', 'Tags & Structure', $md$
**Tags are HTML's containers.** Almost every tag comes as a pair: an opening tag and a closing tag, with content between them.

Think of a pot of soup: you open the pot, put the soup in, close the pot. `<p>` opens, your text goes in, `</p>` closes. That slash is the "closing the pot" signal.

```html
<p>This text lives inside a paragraph tag.</p>
```

Tags can live inside other tags too — a list holds list items, a page holds everything.

**Remember:** every tag you open, you close. One missing `</div>` can scatter your whole page — and it's the number one bug new coders hunt for. If your layout looks broken, check your closing tags first.
$md$, array['Forgetting closing tags — layout breaks and it''s hard to spot', 'Writing the slash on the opening tag instead of the closing one', 'Overlapping tags instead of nesting them properly'], 'beginner'),

('headings-paragraphs', 'Headings & Paragraphs', $md$
**Headings and paragraphs organize your words.** `<h1>` to `<h6>` are headings — `<h1>` is the biggest and most important. `<p>` is a paragraph of normal text.

Think of a newspaper: the front-page headline is the `<h1>`. Section titles are `<h2>`. The stories themselves are `<p>` paragraphs. Nobody prints a newspaper as one giant block of text — structure makes it readable.

```html
<h1>School News</h1>
<h2>Football Update</h2>
<p>Our team won 2–1 on Friday.</p>
```

**Remember:** headings are about *meaning*, not size. Use one `<h1>` per page, and don't pick a heading just because it "looks big" — CSS controls looks; headings communicate structure to readers, search engines, and screen readers.
$md$, array['Using headings for size instead of meaning', 'Multiple h1s on one page', 'Skipping levels randomly (h1 straight to h5)'], 'beginner'),

('links-images', 'Links & Images', $md$
**Links and images make the web the web.** A link (`<a>`) is a door to another page. An image (`<img>`) shows a picture.

```html
<a href="https://moyacode.com">Visit MoyaCode</a>
<img src="robot.png" alt="MoyaBot the friendly robot" />
```

The `href` is the address the door leads to. The `src` is where the picture file lives. And `alt`? That's the description read aloud for someone who can't see the image, and shown if the picture fails to load — like a name tag on a photo.

**Remember:** `<img>` has no closing tag (nothing goes "inside" an image), and **always write the alt text**. It's a small kindness that makes your page work for everyone — and it's a habit real professionals check for.
$md$, array['Confusing href (links) with src (images)', 'Skipping alt text', 'Expecting <img> to need a closing tag'], 'beginner'),

-- ═══ HTML — SS1 ════════════════════════════════════════════════════════════

('html-lists', 'Lists', $md$
**Two kinds of lists, one simple question: does order matter?**

`<ol>` is an **ordered** list — numbered. Use it when sequence matters, like a recipe: step 1 boil water, step 2 add rice. You can't swap them.

`<ul>` is an **unordered** list — bullets. Use it for a market list: yam, pepper, oil — any order, same result.

Each item, either way, is an `<li>`.

```html
<ul>
  <li>Yam</li>
  <li>Pepper</li>
</ul>
```

**Remember:** `<li>` never stands alone — it always lives inside a `<ul>` or `<ol>`. Ask "would the meaning change if I shuffled these?" Yes → `<ol>`. No → `<ul>`.
$md$, array['Using li outside of a ul/ol parent', 'Picking ol vs ul by looks instead of whether order matters'], 'beginner'),

('html-tables', 'Tables', $md$
**Tables organize data into rows and cells — like your class register.**

Your teacher's register has rows (one per student) and columns (name, score, position). HTML tables work exactly like that: `<table>` wraps it all, `<tr>` is a table row, `<th>` is a header cell (bold, the column title), `<td>` is a data cell.

```html
<table>
  <tr><th>Name</th><th>Score</th></tr>
  <tr><td>Kemi</td><td>85</td></tr>
</table>
```

**Remember:** tables are for **data** — scores, timetables, results. Long ago people used tables to lay out whole pages; that era is over. If it's not row-and-column data, use other tags and let CSS handle layout.
$md$, array['Using tables for page layout instead of data', 'Forgetting tr around cells', 'Mixing up th (header) and td (data)'], 'intermediate'),

('html-forms', 'Forms & Inputs', $md$
**Forms are how a page listens.** Everything you've ever typed into a website — a search, a password, a WhatsApp Web message — went through a form.

Think of a school admission form: labelled boxes for your name, your class, your date of birth, then a place to submit. HTML forms are the same: `<form>` wraps it, `<input>` collects short answers, `<textarea>` collects long text, `<select>` gives a dropdown of options, and a submit button sends it all.

```html
<form>
  <label for="name">Your name</label>
  <input id="name" type="text" />
  <button type="submit">Send</button>
</form>
```

**Remember:** every input deserves a `<label>`, connected by `for` and `id`. It's what makes tapping the label focus the box — small detail, professional feel.
$md$, array['Inputs without labels', 'Wrong input type (text where number/email fits)', 'Button outside the form does nothing'], 'intermediate'),

('semantic-html', 'Semantic HTML', $md$
**Semantic tags are rooms with names.** You could build a whole page out of plain `<div>` boxes — but that's like a house where every room is just "room". Which one is the kitchen?

Semantic tags name the rooms: `<header>` for the top area, `<nav>` for the menu, `<main>` for the main content, `<section>` and `<article>` for grouped content, `<footer>` for the bottom.

```html
<header>Logo and title</header>
<main>The real content</main>
<footer>Contact info</footer>
```

The page *looks* the same — so why bother? Because meaning matters to more than eyes: search engines rank you better, screen readers navigate you properly, and other coders (including future-you) read your code without crying.

**Remember:** if a box has a clear job, give it its real name. `<div>` is only for boxes with no meaning.
$md$, array['Div-for-everything', 'Thinking semantic tags change the look — they change meaning, not style', 'Multiple <main> tags on one page'], 'intermediate'),

-- ═══ CSS — SS2 ═════════════════════════════════════════════════════════════

('what-is-css', 'What is CSS? (and the Cascade)', $md$
**CSS is the paint, clothes, and style of a web page.** HTML built the house; CSS decides colors, sizes, spacing, fonts — how everything *looks*.

```css
h1 { color: teal; font-size: 32px; }
```

That one rule restyles every `<h1>` on the page. That's the power: one instruction, applied everywhere.

The "C" means **cascading** — styles flow down from parents to children, like family resemblance. Set a font on `<body>` and everything inside inherits it, unless something more specific overrides it. When two rules argue, the more specific one wins.

**Remember:** HTML = what things *are*. CSS = how things *look*. Keep them separate in your head and your files — that separation is what makes big projects manageable.
$md$, array['Expecting CSS to change page structure', 'Confusion when a parent style "mysteriously" appears on a child — that''s the cascade working', 'Fighting the cascade with !important instead of understanding specificity'], 'intermediate'),

('css-selectors', 'Selectors (element, class, ID)', $md$
**Selectors are how CSS chooses who to style — exactly like a teacher calling students.**

- **Element selector** (`p`) — "All students, stand up." Every paragraph obeys.
- **Class selector** (`.warning`) — "JSS3B, stand up." Only elements wearing `class="warning"` obey. Many elements can share a class.
- **ID selector** (`#header`) — "Adebayo, stand up." Exactly one element, `id="header"`. IDs must be unique.

```css
p        { color: gray; }
.warning { color: red; }
#header  { background: navy; }
```

**Remember:** class = dot (`.`), ID = hash (`#`) — mixing those up is the classic bug. And prefer classes for styling: IDs are very "loud" (hard to override) and you only get one per page. Reusable style = class.
$md$, array['Dot vs hash mixups', 'Reusing an ID on multiple elements', 'Overusing IDs where classes are right — specificity fights later'], 'intermediate'),

('box-model', 'The Box Model', $md$
**Every element on a page is a box — even the round-looking ones.** And every box has four layers.

Think of posting a gift to a friend: the **gift** itself (content), the **bubble wrap** around it (padding), the **carton** (border), and the **space between your carton and the next one** in the van (margin).

```css
.card {
  padding: 16px;   /* bubble wrap: space inside */
  border: 2px solid teal;
  margin: 12px;    /* space outside, between boxes */
}
```

**Remember:** padding = space *inside* the border, margin = space *outside* it. And put `* { box-sizing: border-box; }` at the top of your CSS — it makes width mean "the whole carton", so your layout maths stops surprising you. Nearly every professional stylesheet starts with it.
$md$, array['Padding vs margin mixups', 'Widths behaving strangely without box-sizing: border-box', 'Using margin to create space inside a box'], 'intermediate'),

('colors-fonts', 'Colours & Fonts', $md$
**Colours and fonts are your page's uniform.** A school where everyone wears whatever they like looks chaotic; a school with a uniform looks sharp. Pages work the same way.

```css
body {
  font-family: 'Space Grotesk', sans-serif;
  color: #1a2036;
  background: #f8faff;
}
```

Colours can be names (`teal`), hex codes (`#00E5A0`), or `rgb(...)`. Hex is the one you'll see everywhere — six characters: two for red, two for green, two for blue.

**Remember:** fewer colours, stronger contrast. Pick 2–3 colours and stick to them like a uniform — a page with ten colours looks like noise. And always check your text is readable against its background; if you have to squint, your users gave up already.
$md$, array['Too many colors on one page', 'Low contrast text nobody can read', 'Font names with spaces need quotes'], 'intermediate'),

-- ═══ JavaScript — SS3 ══════════════════════════════════════════════════════

('what-is-js', 'What is JavaScript?', $md$
**JavaScript is what makes a page *do things*.** HTML is the house, CSS is the paint — JavaScript is the electricity: switches that respond, doors that open when you knock, lights that react.

Without JS, a page just sits there. With JS: buttons respond to clicks, scores update, games run, forms check themselves before submitting.

```js
document.querySelector('button').addEventListener('click', () => {
  alert('You clicked me!');
});
```

That's a real interaction — the page *listened* and *responded*.

**Remember:** JavaScript is a full programming language — it has logic, memory, and decisions. It's also the language of this entire quiz app you're using right now. Everything you'll build interactive on the web runs through it.
$md$, array['Confusing Java with JavaScript — different languages entirely', 'Expecting JS to work before the page elements exist (script order matters)'], 'intermediate'),

('js-variables', 'Variables (let & const)', $md$
**A variable is a labelled container for a value.** Your score in a game, a student's name, the number of lives left — each lives in a labelled container so you can use it and change it later.

- `let` — a container whose contents can change: a whiteboard you can wipe and rewrite.
- `const` — written in permanent marker: set once, never reassigned.

```js
let score = 0;
score = score + 10;    // fine — let can change

const appName = 'MoyaCode';
```

**Remember the two classic traps:** `=` **assigns** ("put this in the container"), but `===` **compares** ("are these equal?"). Mixing them breaks logic silently. And reset your variables at the start of each game round — stale old values cause the weirdest bugs.
$md$, array['= (assignment) vs === (comparison)', 'Reassigning a const', 'Stale values not reset between rounds/sessions'], 'intermediate'),

('js-functions', 'Functions', $md$
**A function is a recipe you write once and cook anytime.** Instead of repeating the same five lines everywhere, you wrap them, name them, and call the name.

Ingredients go in (**parameters**), the finished dish comes out (**return value**).

```js
function addXP(current, bonus) {
  return current + bonus;
}

let xp = addXP(50, 10);  // xp is now 60
```

`current` and `bonus` are the ingredients. `return` hands back the result — no return, no dish; the function just did work and kept quiet.

**Remember:** writing `addXP` defines the recipe; writing `addXP(50, 10)` — with brackets — actually cooks it. Forgetting the brackets (or forgetting the `return`) are the two ways beginners end up staring at `undefined`.
$md$, array['Forgetting return and getting undefined', 'Defining a function but never calling it', 'Confusing parameters (recipe) with arguments (actual values)'], 'intermediate'),

('dom-basics', 'DOM Basics', $md$
**The DOM is your remote control for the page.** Every tag in your HTML becomes an object JavaScript can find, read, and change — while the page is running, no reload.

Find an element, change it, or listen to it:

```js
const title = document.querySelector('#title');
title.textContent = 'You did it!';

document.querySelector('#btn').addEventListener('click', () => {
  title.style.color = 'teal';
});
```

`querySelector` uses the same selectors you learned in CSS — `#id`, `.class`, `tag`. Your CSS knowledge just became a superpower here.

**Remember:** the element must exist before your script looks for it — that's why scripts load at the bottom of the page (or wait for it to load). "querySelector returned null" almost always means "I looked too early or typed the selector wrong."
$md$, array['Script runs before elements exist — null errors', 'Wrong selector string (forgetting # or .)', 'textContent vs innerHTML confusion'], 'intermediate');

-- ═══ The index — one row per concept, tags drive retrieval ═════════════════

insert into concept_index (concept_slug, title, summary, tags, grade_level, page_id) values
('what-is-html', 'What is HTML?', 'What HTML is and why every web page starts with it.',
 array['html','structure','web','webpage','markup'], array['JSS3'],
 (select id from concept_pages where slug = 'what-is-html')),
('html-tags', 'Tags & Structure', 'How tags open, close, and nest to structure a page.',
 array['tags','tag','element','closing-tags','nesting','structure'], array['JSS3'],
 (select id from concept_pages where slug = 'html-tags')),
('headings-paragraphs', 'Headings & Paragraphs', 'Using h1–h6 and p to organize text by meaning.',
 array['headings','heading','paragraph','h1','text'], array['JSS3'],
 (select id from concept_pages where slug = 'headings-paragraphs')),
('links-images', 'Links & Images', 'Anchors, images, href vs src, and why alt text matters.',
 array['links','link','anchor','images','image','href','src','alt-text'], array['JSS3'],
 (select id from concept_pages where slug = 'links-images')),
('html-lists', 'Lists', 'Ordered vs unordered lists and list items.',
 array['lists','list','ol','ul','li','bullet','ordered','unordered'], array['SS1'],
 (select id from concept_pages where slug = 'html-lists')),
('html-tables', 'Tables', 'Rows, cells, and headers for presenting data.',
 array['tables','table','rows','row','cells','td','tr','th'], array['SS1'],
 (select id from concept_pages where slug = 'html-tables')),
('html-forms', 'Forms & Inputs', 'Collecting user input with forms, inputs, and labels.',
 array['forms','form','inputs','input','label','textarea','select','submit'], array['SS1'],
 (select id from concept_pages where slug = 'html-forms')),
('semantic-html', 'Semantic HTML', 'Meaningful tags: header, nav, main, section, footer.',
 array['semantic','semantics','header','nav','main','footer','section','article'], array['SS1'],
 (select id from concept_pages where slug = 'semantic-html')),
('what-is-css', 'What is CSS? (and the Cascade)', 'What CSS does and how the cascade applies styles.',
 array['css','style','styling','stylesheet','cascade','cascading'], array['SS2'],
 (select id from concept_pages where slug = 'what-is-css')),
('css-selectors', 'Selectors (element, class, ID)', 'Choosing what to style: elements, classes, IDs, specificity.',
 array['selectors','selector','class','id','specificity'], array['SS2'],
 (select id from concept_pages where slug = 'css-selectors')),
('box-model', 'The Box Model', 'Content, padding, border, margin — and box-sizing.',
 array['box-model','box','padding','margin','border','box-sizing','spacing'], array['SS2'],
 (select id from concept_pages where slug = 'box-model')),
('colors-fonts', 'Colours & Fonts', 'Color values, font families, contrast and consistency.',
 array['colors','colours','color','colour','fonts','font','hex','typography'], array['SS2'],
 (select id from concept_pages where slug = 'colors-fonts')),
('what-is-js', 'What is JavaScript?', 'What JavaScript is and what "behavior" means on a page.',
 array['javascript','js','behavior','interactive','logic','script'], array['SS3'],
 (select id from concept_pages where slug = 'what-is-js')),
('js-variables', 'Variables (let & const)', 'Storing values, let vs const, = vs ===.',
 array['variables','variable','let','const','assignment','equality'], array['SS3'],
 (select id from concept_pages where slug = 'js-variables')),
('js-functions', 'Functions', 'Reusable logic: parameters, arguments, return values.',
 array['functions','function','parameters','parameter','return','arguments'], array['SS3'],
 (select id from concept_pages where slug = 'js-functions')),
('dom-basics', 'DOM Basics', 'Finding and changing page elements; reacting to events.',
 array['dom','queryselector','getelementbyid','events','event','click','addeventlistener'], array['SS3'],
 (select id from concept_pages where slug = 'dom-basics'));
