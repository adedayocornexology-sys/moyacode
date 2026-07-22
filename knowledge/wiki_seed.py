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
            "The path follows your class level: JSS1 learns HTML, JSS2 learns CSS and "
            "JSS3 learns JavaScript — that is the whole frontend. Then SS1 takes "
            "JavaScript to the server, SS2 adds a database, and SS3 builds a full "
            "project. Each track has a teacher character guiding it.\n\n"
            "Learning is never paywalled. The core curriculum, lessons, quizzes and "
            "basic explanations are 100% free, and always will be. You can start "
            "without an account; an account is a save point, not a toll booth: it "
            "keeps your progress safe across devices."
        ),
    },
    {
        "slug": "learning-path",
        "page_type": "track",
        "title": "The learning path: frontend to full-stack",
        "content_md": (
            "MoyaCode's curriculum runs in class order, each track building on the "
            "last:\n\n"
            "1. JSS1: HTML, with teacher Chidi. Tags, headings, links, images — the "
            "structure of the web.\n"
            "2. JSS2: CSS, with teacher Amaka. Selectors, the box model, colours and "
            "layout.\n"
            "3. JSS3: JavaScript, with teacher Emeka. Variables, functions and the "
            "DOM. This completes the frontend.\n"
            "4. SS1: JavaScript on the Server, with teacher Ngozi. Node.js, requests "
            "and responses, and simple APIs.\n"
            "5. SS2: JavaScript + Database, with Ngozi. Tables, reading and writing "
            "data, and Row Level Security with Supabase.\n"
            "6. SS3: Full-Stack Project, with teacher Kunle. Plan, build, test and "
            "ship a real app.\n\n"
            "Each track is worth 50 XP and ends with a quest (quiz). Finish all six "
            "and you are a MoyaCode graduate — a junior full-stack developer, ready "
            "to build real projects in the Arcade. The standard references are MDN "
            "and roadmap.sh."
        ),
    },
    {
        "slug": "jss1-html",
        "page_type": "lesson",
        "title": "JSS1: HTML — Structure of the Web",
        "content_md": (
            "HTML (HyperText Markup Language) gives web pages their structure: "
            "headings, paragraphs, links and images. Browsers read HTML and build "
            "the visual page from it. It is the first thing every web developer "
            "learns.\n\n"
            "Key ideas:\n"
            "- Most elements use opening and closing tags, like <p> ... </p>. A "
            "missed closing tag is the most common beginner bug and can break the "
            "layout.\n"
            "- Headings h1 to h6 give hierarchy; p is for paragraphs. Headings also "
            "help search engines and screen readers.\n"
            "- Links use the a tag with href (where it goes). Images use img with "
            "src (the file) and alt (a text description); always write alt text.\n\n"
            "The quest covers tags, headings, href and alt. Teacher: Chidi. "
            "Reference: MDN."
        ),
    },
    {
        "slug": "jss2-css",
        "page_type": "lesson",
        "title": "JSS2: CSS — Styling the Web",
        "content_md": (
            "CSS (Cascading Style Sheets) controls how a page looks: colours, "
            "fonts, spacing and layout. HTML is the structure; CSS is the design. "
            "Styles cascade from parent to child unless a more specific rule "
            "overrides them.\n\n"
            "Key ideas:\n"
            "- Selectors decide what gets styled: element (p), class (.card), and "
            "ID (#header). Class uses a dot, ID uses a hash — the classic mix-up.\n"
            "- The box model: every element is content, padding, border and margin. "
            "Use box-sizing: border-box so widths are easier to reason about.\n"
            "- display: flex (flexbox) lines items up in a neat row or column.\n\n"
            "The quest covers selectors, the box model and property names. "
            "Teacher: Amaka. Reference: MDN."
        ),
    },
    {
        "slug": "jss3-javascript",
        "page_type": "lesson",
        "title": "JSS3: JavaScript — Making It Work",
        "content_md": (
            "JavaScript adds behaviour to web pages: click handlers, dynamic "
            "updates, logic and data. HTML is structure, CSS is style, JavaScript "
            "is behaviour — the three languages of the frontend. Finish this and "
            "you can build a complete interactive website.\n\n"
            "Key ideas:\n"
            "- Use let for values that change and const for fixed ones. Use = to "
            "assign and === for strict equality.\n"
            "- Functions package reusable logic: inputs are parameters, outputs are "
            "return values.\n"
            "- The DOM is how JavaScript talks to the page: document.querySelector "
            "finds an element so you can update it or react to a click.\n\n"
            "This completes the frontend. Teacher: Emeka. Reference: MDN."
        ),
    },
    {
        "slug": "ss1-server",
        "page_type": "lesson",
        "title": "SS1: JavaScript on the Server",
        "content_md": (
            "The frontend runs in the browser; the backend runs on a server — a "
            "computer you control. The same JavaScript you learned can run on the "
            "server using Node.js.\n\n"
            "Key ideas:\n"
            "- A server keeps secrets safe, stores data for everyone, and does work "
            "the browser shouldn't be trusted with.\n"
            "- The web works by request and response. GET reads data; POST sends new "
            "data. When you tap 'Ask Moya', the browser sends a POST request.\n"
            "- A server exposes URLs called routes; when a request hits a route your "
            "code runs and returns a response, often JSON (a simple data format).\n\n"
            "The quest covers frontend vs backend, GET vs POST, Node.js and JSON. "
            "Teacher: Ngozi. References: MDN, roadmap.sh (backend)."
        ),
    },
    {
        "slug": "ss2-database",
        "page_type": "lesson",
        "title": "SS2: JavaScript + Database",
        "content_md": (
            "A server forgets everything when it restarts; a database remembers. It "
            "stores users, progress and posts permanently. MoyaCode uses Supabase "
            "(PostgreSQL).\n\n"
            "Key ideas:\n"
            "- Data lives in tables with columns (fields like name, score) and rows "
            "(one record each). Think of a strict spreadsheet.\n"
            "- The four data actions are Create, Read, Update, Delete (CRUD), done "
            "with short JavaScript calls to Supabase.\n"
            "- Row Level Security (RLS) rules ensure a user can only see their own "
            "rows. Secret keys stay on the server, never in frontend code.\n\n"
            "The quest covers tables/rows/columns, CRUD and RLS. Teacher: Ngozi. "
            "Reference: Supabase docs, MDN."
        ),
    },
    {
        "slug": "ss3-projects",
        "page_type": "lesson",
        "title": "SS3: Build a Full-Stack Project",
        "content_md": (
            "You now know the whole stack: HTML, CSS, JavaScript, a server and a "
            "database. This final track puts it together into a real, shipped "
            "project.\n\n"
            "Key ideas:\n"
            "- Start with a plan: what does it do and who is it for? A finished "
            "small app beats an unfinished big one.\n"
            "- The frontend sends requests to the backend, which reads and writes "
            "the database and responds. That round trip is a full-stack app.\n"
            "- Build one piece at a time and test before moving on. Use AI (like "
            "Moya) to explain errors, the way real developers do. Then deploy so "
            "anyone can visit — the way MoyaCode is live for you.\n\n"
            "This is the final track. Teacher: Kunle. References: MDN, roadmap.sh."
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
    ("The learning path", "The full curriculum in order: HTML (JSS1), CSS (JSS2), JavaScript (JSS3), then server JS (SS1), database (SS2) and a full-stack project (SS3), with teachers Chidi, Amaka, Emeka, Ngozi and Kunle.",
     ["curriculum", "path", "tracks", "classes", "order", "next", "teachers", "frontend", "backend", "html", "css", "javascript", "fullstack"], "learning-path", 1.4),
    ("HTML — Structure (JSS1)", "HTML basics: what HTML is, opening and closing tags, headings h1 to h6, paragraphs, links with a href, images with src and alt.",
     ["html", "jss1", "tags", "headings", "links", "images", "alt", "structure", "frontend"], "jss1-html", 1.0),
    ("CSS — Styling (JSS2)", "CSS fundamentals: element, class and ID selectors, the box model with padding border margin, font-size, and flexbox layout.",
     ["css", "jss2", "selectors", "class", "box", "model", "padding", "margin", "flexbox", "layout", "styling", "frontend"], "jss2-css", 1.0),
    ("JavaScript — Behaviour (JSS3)", "JavaScript foundations: let and const, strict equality ===, functions with parameters and return values, and the DOM with querySelector. Completes the frontend.",
     ["javascript", "js", "jss3", "variables", "functions", "dom", "queryselector", "frontend", "behaviour"], "jss3-javascript", 1.0),
    ("JavaScript on the Server (SS1)", "The backend: frontend vs backend, running JavaScript with Node.js, requests and responses (GET and POST), and building simple APIs that return JSON.",
     ["backend", "server", "ss1", "node", "nodejs", "api", "get", "post", "request", "response", "json"], "ss1-server", 1.0),
    ("JavaScript + Database (SS2)", "Storing data: tables, rows and columns, the four CRUD actions, Supabase, and Row Level Security so users only see their own data.",
     ["database", "ss2", "supabase", "tables", "rows", "columns", "crud", "rls", "security", "data"], "ss2-database", 1.0),
    ("Full-Stack Project (SS3)", "Building for real: planning, how frontend-backend-database connect, build-test-fix with AI, and deploying a project to the internet.",
     ["project", "ss3", "fullstack", "deploy", "ship", "plan", "build", "capstone", "ai"], "ss3-projects", 1.0),
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
    ("jss1-html", "prerequisite_of", "jss2-css", "Structure the page before you style it"),
    ("jss2-css", "prerequisite_of", "jss3-javascript", "Style the page, then make it behave"),
    ("jss3-javascript", "prerequisite_of", "ss1-server", "Learn JavaScript in the browser before the server"),
    ("ss1-server", "prerequisite_of", "ss2-database", "Build a server before connecting a database"),
    ("ss2-database", "prerequisite_of", "ss3-projects", "Know the full stack before the capstone project"),
    ("jss1-html", "part_of", "learning-path", None),
    ("jss2-css", "part_of", "learning-path", None),
    ("jss3-javascript", "part_of", "learning-path", None),
    ("ss1-server", "part_of", "learning-path", None),
    ("ss2-database", "part_of", "learning-path", None),
    ("ss3-projects", "part_of", "learning-path", None),
    ("learning-path", "part_of", "how-moyacode-works", None),
    ("moyacoin", "part_of", "how-moyacode-works", "How the economy fits the free promise"),
    ("moya-assistant", "see_also", "moyacoin", "Deep AI help is what MoyaCoin meters"),
    ("tutors-proteges", "see_also", "moya-assistant", "Human tutors complement the AI guide"),
    ("ss3-projects", "continued_by", "arcade", "Graduates build and feature games in the Arcade"),
    ("how-moyacode-works", "see_also", "owo-bootcamp", "The paid in-person event, separate from the free platform"),
]
