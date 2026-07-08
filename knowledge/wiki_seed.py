"""
MoyaCode knowledge base — seed content for the wiki store.

Source of truth for what Moya can answer about MoyaCode itself: the
learning path, each track's ideas, MoyaCoin, tutors, the arcade, and the
bootcamp. Content is distilled from lessons.js and CONSTITUTION.md; when
those change, update this file too.

Schema mirrors the Ajasin chat harness (and supabase/wiki_knowledge.sql,
which takes over once the MoyaCode Supabase project is unpaused):
pages -> index entries -> typed relations.
"""

# page_type: concept | lesson | project | track | faq | announcement
PAGES = [
    {
        "slug": "how-moyacode-works",
        "page_type": "faq",
        "title": "How MoyaCode works",
        "content_md": (
            "MoyaCode is a free, gamified coding school for Nigerian secondary-school "
            "students, built to run well on low-end phones. You learn through quests: "
            "short lessons followed by quizzes. Correct answers earn XP, streaks keep "
            "you motivated, and finishing a track unlocks the next one.\n\n"
            "The path follows your class level: JSS1 and JSS2 learn Scratch, JSS3 and "
            "SS1 learn HTML, SS2 learns CSS, and SS3 learns JavaScript. Each track has "
            "a teacher character guiding it.\n\n"
            "Learning is never paywalled. The core curriculum, lessons, quizzes and "
            "basic explanations are 100% free, and always will be. You can start "
            "without an account; an account is a save point, not a toll booth: it "
            "keeps your progress safe across devices."
        ),
    },
    {
        "slug": "learning-path",
        "page_type": "track",
        "title": "The learning path: Scratch to JavaScript",
        "content_md": (
            "MoyaCode's curriculum runs in class order, each track building on the "
            "last:\n\n"
            "1. JSS1: Scratch Basics, with teacher Tolu. Events, movement, loops.\n"
            "2. JSS2: Advanced Scratch, with Tolu. Control blocks, variables, "
            "broadcast, clones.\n"
            "3. JSS3: Intro to HTML, with teacher Chidi. Tags, headings, links, "
            "images.\n"
            "4. SS1: Advanced HTML, with Chidi. Lists, tables, forms, semantic "
            "HTML.\n"
            "5. SS2: CSS Styling, with teacher Amaka. Selectors, the box model, "
            "colours and fonts.\n"
            "6. SS3: JavaScript Logic, with teacher Emeka. Variables, functions, "
            "the DOM.\n\n"
            "Each track is worth 50 XP and ends with a quest (quiz). Finish all six "
            "and you are a MoyaCode graduate, ready to build real projects in the "
            "Arcade."
        ),
    },
    {
        "slug": "jss1-scratch-basics",
        "page_type": "lesson",
        "title": "JSS1: Scratch Basics",
        "content_md": (
            "Scratch is a visual coding tool: instead of typing code you drag and "
            "connect blocks to build games, stories and animations. A project has a "
            "stage, sprites, scripts and events; events decide when code starts.\n\n"
            "Key ideas in this track:\n"
            "- The 'when green flag clicked' event block is the entry point of most "
            "scripts. No event block at the top means the script may never run.\n"
            "- Sprites move with x and y coordinates: x right and left, y up and "
            "down. That is how most game movement works.\n"
            "- Repeat loops run a fixed number of times; Forever loops run "
            "continuously, which is where most game control logic lives.\n\n"
            "The quest asks about event blocks, movement blocks and loop behaviour. "
            "Teacher: Tolu."
        ),
    },
    {
        "slug": "jss2-advanced-scratch",
        "page_type": "lesson",
        "title": "JSS2: Advanced Scratch",
        "content_md": (
            "This track goes deeper into Scratch:\n"
            "- Control blocks shape decision flow: with if/else only one branch runs "
            "at a time.\n"
            "- Variables store changing values like score, lives and timers. Reset "
            "them when the green flag is clicked so old values don't leak in.\n"
            "- Broadcast messages let one sprite signal others: 'broadcast' pairs "
            "with 'when I receive' for sprite-to-sprite coordination.\n"
            "- Clones create runtime copies of sprites, good for bullets, enemies "
            "and collectibles. Delete clones when done or the project slows down.\n\n"
            "The quest covers control, variables, broadcast and clone patterns. "
            "Teacher: Tolu."
        ),
    },
    {
        "slug": "jss3-intro-html",
        "page_type": "lesson",
        "title": "JSS3: Intro to HTML",
        "content_md": (
            "HTML (HyperText Markup Language) gives web pages their structure: "
            "headings, paragraphs, links and media. Browsers read HTML and build the "
            "visual page from it.\n\n"
            "Key ideas:\n"
            "- Most elements use opening and closing tags, like <p> ... </p>. A "
            "missed closing tag can break the layout.\n"
            "- Headings h1 to h6 give hierarchy; p is for paragraphs. Headings also "
            "help search engines and assistive tools.\n"
            "- Links use the a tag with href. Images use img with src and alt; "
            "always write alt text describing the image.\n\n"
            "Teacher: Chidi."
        ),
    },
    {
        "slug": "ss1-advanced-html",
        "page_type": "lesson",
        "title": "SS1: Advanced HTML",
        "content_md": (
            "Real pages need more than headings and paragraphs:\n"
            "- Lists: ol is numbered, ul is bullets, items are li.\n"
            "- Tables organise data into rows (tr) and cells (td and th). Use tables "
            "for data, not page layout.\n"
            "- Forms collect user data with input, select, textarea and submit "
            "controls. Link labels to inputs with for and id for usability.\n"
            "- Semantic tags like header, nav, main, section, article and footer "
            "describe what each part of the page means.\n\n"
            "Teacher: Chidi."
        ),
    },
    {
        "slug": "ss2-css-styling",
        "page_type": "lesson",
        "title": "SS2: CSS Styling",
        "content_md": (
            "CSS controls how a page looks: colours, typography, spacing and layout. "
            "If HTML is structure, CSS is visual design. Styles cascade from parent "
            "to child unless a more specific rule overrides them.\n\n"
            "Key ideas:\n"
            "- Selectors decide what gets styled: element (p), class (.card), and "
            "ID (#header). Class uses a dot, ID uses a hash. Prefer classes for "
            "reusable styling because IDs are very specific.\n"
            "- The box model: every element is content, padding, border and margin. "
            "Use box-sizing: border-box so widths are easier to reason about.\n"
            "- Use consistent font scales and colour tokens; fewer colours with "
            "stronger contrast makes cleaner UI.\n\n"
            "Teacher: Amaka."
        ),
    },
    {
        "slug": "ss3-javascript-logic",
        "page_type": "lesson",
        "title": "SS3: JavaScript Logic",
        "content_md": (
            "JavaScript adds behaviour to web pages: click handlers, dynamic "
            "updates, logic and data processing.\n\n"
            "Key ideas:\n"
            "- Use let for values that change and const for fixed references. Use = "
            "to assign and === for strict equality checks.\n"
            "- Functions package reusable logic: inputs are parameters, outputs are "
            "return values.\n"
            "- The DOM is how JavaScript talks to the page: "
            "document.getElementById or querySelector to read and update content "
            "and react to events.\n\n"
            "This is the final track. Teacher: Emeka."
        ),
    },
    {
        "slug": "moyacoin",
        "page_type": "concept",
        "title": "MoyaCoin and XP",
        "content_md": (
            "MoyaCode has two currencies with two different jobs:\n\n"
            "- XP is status and progress. You earn it by learning and it can never "
            "be spent.\n"
            "- MoyaCoin is the spendable wallet. Levelling up grants MoyaCoin, so "
            "doing the work funds the help.\n\n"
            "Why MoyaCoin exists: the AI is the part that costs real money, so "
            "MoyaCoin meters AI usage. It buys AI depth and speed: deep tutoring, "
            "code review, extended answers. Core learning stays free no matter "
            "what; a student with zero coins can always keep learning.\n\n"
            "You earn coins from the signup bonus, daily streaks, completing "
            "lessons and quizzes, and levelling up. MoyaCoin is virtual and never "
            "converts to cash."
        ),
    },
    {
        "slug": "moya-assistant",
        "page_type": "concept",
        "title": "Moya, your learning guide",
        "content_md": (
            "Moya is the in-app guide every student pairs with. Moya remembers "
            "where you stopped, greets you with a continue-where-you-left-off card, "
            "recommends what to learn next, opens lessons for you, and answers "
            "questions about coding and about MoyaCode itself.\n\n"
            "Moya acts for you, in your own session, and never guesses your "
            "progress: it checks your real learner state first. Tap the Ask Moya "
            "button on any page to start."
        ),
    },
    {
        "slug": "tutors-proteges",
        "page_type": "concept",
        "title": "Near-peer tutors (the protégé programme)",
        "content_md": (
            "MoyaCode's human tutors are near-peers: students who just finished the "
            "track themselves, starting with graduating SS3 students from RSS Owo. "
            "Someone who walked the path months ago explains it better than a "
            "distant expert.\n\n"
            "Tutors see only their assigned students, coach them with the help of a "
            "co-pilot agent, and earn MoyaCoin for sessions and good outcomes. "
            "Students can request a tutor from inside the app."
        ),
    },
    {
        "slug": "arcade",
        "page_type": "project",
        "title": "The Arcade: games by students",
        "content_md": (
            "The Arcade is where MoyaCode students' own games and projects live. "
            "Finish the tracks and your work can feature there too. Visit /arcade "
            "to play what other students have built and leave feedback."
        ),
    },
    {
        "slug": "owo-bootcamp",
        "page_type": "announcement",
        "title": "The Owo AI-Fluency Bootcamp",
        "content_md": (
            "MoyaCode runs a 5-day AI-Fluency Bootcamp in Owo at the Ajasin "
            "Foundation, teaching students to work with AI tools hands-on. Seats "
            "are limited (about 50 per run). Fees are kept low, in the 10 to 20 "
            "thousand naira range per week. Ask Moya for the current dates or see "
            "the bootcamp briefing site for details.\n\n"
            "Unlike the bootcamp (a paid, in-person event), everything on "
            "moyacode.com's learning platform stays free."
        ),
    },
]

# (title, summary, tags, page_slug, relevance_weight)
INDEX = [
    ("How MoyaCode works", "What MoyaCode is: a free gamified coding school for Nigerian secondary students with quests, XP, streaks and tracks per class level. Signup is optional, learning is always free.",
     ["free", "how", "works", "about", "moyacode", "xp", "quests", "signup", "account", "cost", "price"], "how-moyacode-works", 1.5),
    ("The learning path", "The full curriculum in order: Scratch (JSS1, JSS2), HTML (JSS3, SS1), CSS (SS2), JavaScript (SS3), with teachers Tolu, Chidi, Amaka and Emeka.",
     ["curriculum", "path", "tracks", "classes", "order", "next", "teachers", "scratch", "html", "css", "javascript"], "learning-path", 1.4),
    ("Scratch Basics (JSS1)", "Beginner Scratch: events like when green flag clicked, sprite movement with x and y coordinates, repeat and forever loops.",
     ["scratch", "jss1", "blocks", "sprite", "green", "flag", "loops", "events", "motion", "coordinates"], "jss1-scratch-basics", 1.0),
    ("Advanced Scratch (JSS2)", "Deeper Scratch: if/else control blocks, variables for score and lives, broadcast messages between sprites, and clones.",
     ["scratch", "jss2", "variables", "broadcast", "clones", "control", "if", "else"], "jss2-advanced-scratch", 1.0),
    ("Intro to HTML (JSS3)", "HTML basics: what HTML is, opening and closing tags, headings h1 to h6, paragraphs, links with a href, images with src and alt.",
     ["html", "jss3", "tags", "headings", "links", "images", "alt", "structure"], "jss3-intro-html", 1.0),
    ("Advanced HTML (SS1)", "Real page structures: ordered and unordered lists, tables with rows and cells, forms and inputs, semantic tags like header nav main footer.",
     ["html", "ss1", "lists", "tables", "forms", "inputs", "semantic"], "ss1-advanced-html", 1.0),
    ("CSS Styling (SS2)", "CSS fundamentals: element class and ID selectors, specificity, the box model with padding border margin, colours and fonts.",
     ["css", "ss2", "selectors", "class", "box", "model", "padding", "margin", "colours", "fonts", "styling"], "ss2-css-styling", 1.0),
    ("JavaScript Logic (SS3)", "JavaScript foundations: let and const variables, strict equality, functions with parameters and return values, DOM access with querySelector.",
     ["javascript", "js", "ss3", "variables", "functions", "dom", "queryselector", "logic"], "ss3-javascript-logic", 1.0),
    ("MoyaCoin and XP", "The two currencies: XP is earned status that cannot be spent; MoyaCoin is earned and spent on AI help like deep tutoring and code review. Learning itself is always free.",
     ["moyacoin", "coins", "xp", "wallet", "spend", "earn", "levels", "free", "money", "cash"], "moyacoin", 1.3),
    ("Moya, your guide", "What Moya the assistant does: remembers progress, resumes learning, recommends next steps, opens lessons, answers questions.",
     ["moya", "assistant", "guide", "help", "resume", "continue", "agent"], "moya-assistant", 1.1),
    ("Near-peer tutors", "Human tutors who just finished the track themselves, starting with SS3 graduates of RSS Owo. How tutoring and the protege programme work.",
     ["tutor", "tutors", "protege", "teacher", "human", "help", "rss", "owo", "mentor"], "tutors-proteges", 1.1),
    ("The Arcade", "Where students' own games live. Play games built by other MoyaCode students at /arcade.",
     ["arcade", "games", "play", "projects", "showcase"], "arcade", 1.0),
    ("Owo AI-Fluency Bootcamp", "The 5-day in-person AI bootcamp at the Ajasin Foundation in Owo: limited seats, low fees, hands-on AI skills. The online platform itself stays free.",
     ["bootcamp", "owo", "ai", "fluency", "event", "register", "fees", "ajasin"], "owo-bootcamp", 1.2),
]

# (from_slug, relation_type, to_slug, description)
RELATIONS = [
    ("jss1-scratch-basics", "prerequisite_of", "jss2-advanced-scratch", "Finish Scratch Basics before Advanced Scratch"),
    ("jss2-advanced-scratch", "prerequisite_of", "jss3-intro-html", "Scratch thinking prepares you for real code"),
    ("jss3-intro-html", "prerequisite_of", "ss1-advanced-html", "HTML basics come before advanced structures"),
    ("ss1-advanced-html", "prerequisite_of", "ss2-css-styling", "Structure first, then styling"),
    ("ss2-css-styling", "prerequisite_of", "ss3-javascript-logic", "Style the page, then make it behave"),
    ("jss1-scratch-basics", "part_of", "learning-path", None),
    ("jss2-advanced-scratch", "part_of", "learning-path", None),
    ("jss3-intro-html", "part_of", "learning-path", None),
    ("ss1-advanced-html", "part_of", "learning-path", None),
    ("ss2-css-styling", "part_of", "learning-path", None),
    ("ss3-javascript-logic", "part_of", "learning-path", None),
    ("learning-path", "part_of", "how-moyacode-works", None),
    ("moyacoin", "part_of", "how-moyacode-works", "How the economy fits the free promise"),
    ("moya-assistant", "see_also", "moyacoin", "Deep AI help is what MoyaCoin meters"),
    ("tutors-proteges", "see_also", "moya-assistant", "Human tutors complement the AI guide"),
    ("ss3-javascript-logic", "continued_by", "arcade", "Graduates build and feature games in the Arcade"),
    ("how-moyacode-works", "see_also", "owo-bootcamp", "The paid in-person event, separate from the free platform"),
]
