// Rich lesson content bank used by lesson.html
// Curriculum (2026-07-22 rebrand): frontend across JSS, backend across SS.
//   JSS1 HTML · JSS2 CSS · JSS3 JavaScript  →  SS1 Server JS · SS2 Database · SS3 Projects
// Reference standards woven throughout: MDN (developer.mozilla.org) + roadmap.sh.
const LESSON_BANKS = {
  jss1: {
    title: 'HTML — Structure of the Web', classLabel: 'JSS1', quizKey: 'jss1', totalXP: 50,
    steps: [
      { id:'html-intro', title:'What is HTML?', readMins:2, sections:[
        { type:'prose', text:'HTML (HyperText Markup Language) is the structure of every web page — the headings, paragraphs, links, images and buttons you see. It is the very first thing a web developer learns.' },
        { type:'prose', text:'Your browser reads HTML and builds the page from it. If a website were a house, HTML would be the walls and rooms.' },
        { type:'callout', variant:'info', title:'Reference', text:'The MDN Web Docs (developer.mozilla.org) are the world standard for HTML. We follow them here.' }
      ]},
      { id:'tags', title:'Tags and Elements', readMins:4, sections:[
        { type:'prose', text:'Most HTML is written as elements with an opening and closing tag, like <p>Hello</p>. The text lives between the tags.' },
        { type:'callout', variant:'warning', title:'Watch Out', text:'Forgetting a closing tag (like </p>) is the most common beginner bug and can break your whole layout.' }
      ], codeBlock:{ label:'A basic page', code:`<!DOCTYPE html>\n<html>\n  <body>\n    <h1>My First Page</h1>\n    <p>Welcome to the web.</p>\n  </body>\n</html>` }},
      { id:'text', title:'Headings and Paragraphs', readMins:3, sections:[
        { type:'prose', text:'Use <h1> to <h6> for headings — <h1> is the biggest and most important, <h6> the smallest. Use <p> for normal paragraph text.' },
        { type:'callout', variant:'info', title:'Semantics', text:'Headings describe structure to readers, search engines, and screen readers for blind users. Use them in order.' }
      ], codeBlock:{ label:'Headings', code:`<h1>Main title</h1>\n<h2>A section</h2>\n<p>Some words about the section.</p>` }},
      { id:'links-images', title:'Links and Images', readMins:4, sections:[
        { type:'prose', text:'Links use the <a> tag with an href attribute pointing where to go. Images use <img> with a src (the file) and alt (a text description).' },
        { type:'callout', variant:'tip', title:'Accessibility', text:'Always write alt text. It describes the image to people who cannot see it, and shows if the image fails to load.' }
      ], codeBlock:{ label:'Link and image', code:`<a href="https://moyacode.vercel.app">Visit MoyaCode</a>\n<img src="logo.png" alt="MoyaCode logo" />` }},
      { id:'ready', title:'Ready for the Quest?', readMins:1, sections:[
        { type:'prose', text:'You can now build the skeleton of a real web page: headings, paragraphs, links, and images.' },
        { type:'callout', variant:'info', title:'Quiz Focus', text:'Expect questions on tags, headings, the <a> and <img> tags, and their attributes.' }
      ]}
    ]
  },

  jss2: {
    title: 'CSS — Styling the Web', classLabel: 'JSS2', quizKey: 'jss2', totalXP: 50,
    steps: [
      { id:'css-intro', title:'What is CSS?', readMins:2, sections:[
        { type:'prose', text:'CSS (Cascading Style Sheets) controls how a page looks: colours, fonts, spacing, and layout. HTML is the structure; CSS is the design.' },
        { type:'callout', variant:'info', title:'Cascading', text:'Styles "cascade" from parent elements to children unless a more specific rule overrides them.' }
      ], codeBlock:{ label:'Starter CSS', code:`body {\n  font-family: sans-serif;\n  color: #1a1a2e;\n  background: #f4f4f8;\n}` }},
      { id:'selectors', title:'Selectors', readMins:4, sections:[
        { type:'prose', text:'A selector chooses what to style. An element selector (p) targets all paragraphs, a class selector (.card) targets elements with class="card", and an ID selector (#header) targets one unique element.' },
        { type:'callout', variant:'warning', title:'Remember', text:'Class = dot (.card). ID = hash (#header). This trips up almost every beginner once.' }
      ], codeBlock:{ label:'Selectors', code:`p { color: #333; }\n.card { border-radius: 12px; }\n#hero { min-height: 100vh; }` }},
      { id:'box-model', title:'The Box Model', readMins:4, sections:[
        { type:'prose', text:'Every element is a box with four layers: content, padding (space inside), border, and margin (space outside).' },
        { type:'prose', text:'Add box-sizing: border-box so that padding and border are counted inside the width — it makes layouts far easier to reason about.' }
      ], codeBlock:{ label:'Box model', code:`* { box-sizing: border-box; }\n.card {\n  padding: 16px;\n  margin: 12px;\n  border: 1px solid #ccc;\n}` }},
      { id:'layout', title:'Layout with Flexbox', readMins:4, sections:[
        { type:'prose', text:'Flexbox arranges items in a row or column and spaces them neatly. Set display: flex on a container and its children line up automatically.' },
        { type:'callout', variant:'tip', title:'Design Tip', text:'Fewer colours with strong contrast almost always looks cleaner than many colours.' }
      ], codeBlock:{ label:'Flexbox', code:`.row {\n  display: flex;\n  gap: 12px;\n  justify-content: space-between;\n}` }},
      { id:'ready', title:'Ready for the Quest?', readMins:1, sections:[
        { type:'prose', text:'You can now make a page look good: selectors, the box model, and simple layouts.' },
        { type:'callout', variant:'info', title:'Quiz Focus', text:'Expect selector types, the box model layers, and exact property names.' }
      ]}
    ]
  },

  jss3: {
    title: 'JavaScript — Making It Work', classLabel: 'JSS3', quizKey: 'jss3', totalXP: 50,
    steps: [
      { id:'js-intro', title:'What is JavaScript?', readMins:2, sections:[
        { type:'prose', text:'JavaScript makes pages do things: respond to clicks, update content, check forms, and run logic. HTML is structure, CSS is style, JavaScript is behaviour. Together they are the three languages of the frontend.' },
        { type:'callout', variant:'info', title:'Big idea', text:'By the end of JSS3 you can build a complete, interactive website. That is the whole frontend.' }
      ]},
      { id:'variables', title:'Variables and Values', readMins:3, sections:[
        { type:'prose', text:'A variable stores a value. Use let when the value can change and const when it should not. Values can be numbers, text (strings), or true/false (booleans).' },
        { type:'callout', variant:'warning', title:'Syntax', text:'A single = assigns a value. Three (===) checks if two values are strictly equal. Do not mix them up.' }
      ], codeBlock:{ label:'Variables', code:`let score = 0;\nconst name = "Ada";\nscore = score + 10;` }},
      { id:'functions', title:'Functions', readMins:4, sections:[
        { type:'prose', text:'A function is reusable logic you can run whenever you like. It takes inputs (parameters) and can give back a result (return value).' }
      ], codeBlock:{ label:'A function', code:`function addXp(current, amount) {\n  return current + amount;\n}\n\nlet total = addXp(50, 10); // 60` }},
      { id:'dom', title:'Changing the Page (the DOM)', readMins:4, sections:[
        { type:'prose', text:'The DOM is the live version of your HTML that JavaScript can read and change. Use document.querySelector to find an element, then update it or listen for events like a click.' }
      ], codeBlock:{ label:'React to a click', code:`const btn = document.querySelector("#go");\nbtn.addEventListener("click", () => {\n  document.querySelector("#msg").textContent = "Clicked!";\n});` }},
      { id:'ready', title:'Ready for the Quest?', readMins:1, sections:[
        { type:'prose', text:'You have completed the frontend: HTML, CSS, and JavaScript. Next, in Senior School, you take JavaScript to the server.' },
        { type:'callout', variant:'info', title:'Quiz Focus', text:'Expect variables (let/const), functions, ===, and basic DOM updates.' }
      ]}
    ]
  },

  ss1: {
    title: 'JavaScript on the Server', classLabel: 'SS1', quizKey: 'ss1', totalXP: 50,
    steps: [
      { id:'server-intro', title:'Frontend vs Backend', readMins:3, sections:[
        { type:'prose', text:'The frontend runs in the user’s browser. The backend runs on a server — a computer, somewhere else, that you control. The same language you learned, JavaScript, can run on the server using Node.js.' },
        { type:'callout', variant:'info', title:'Why a server?', text:'A server keeps secrets safe (like passwords and keys), stores data for everyone, and does work the browser should not be trusted to do.' }
      ]},
      { id:'node', title:'Node.js and Running Code', readMins:3, sections:[
        { type:'prose', text:'Node.js lets JavaScript run outside the browser. Instead of clicking a button, your code runs as a program on the server. This is where the backend lives.' }
      ], codeBlock:{ label:'A tiny Node program', code:`// hello.js  →  run with:  node hello.js\nconsole.log("This ran on the server, not the browser.");` }},
      { id:'http', title:'Requests and Responses', readMins:4, sections:[
        { type:'prose', text:'The web works by request and response. The browser sends a request ("give me the home page"), and the server sends back a response (the page, or some data). Each request has a method: GET to read, POST to send new data.' },
        { type:'callout', variant:'tip', title:'Real life', text:'When you tap "Ask Moya", your browser sends a POST request to a server; the server thinks and sends a response back.' }
      ]},
      { id:'api', title:'Building a Simple API', readMins:4, sections:[
        { type:'prose', text:'A server exposes URLs called routes. When a request hits a route, your code runs and returns a response — often JSON, a simple text format for data. This is how the frontend and backend talk.' }
      ], codeBlock:{ label:'A route (Express-style)', code:`app.get("/api/score", (req, res) => {\n  res.json({ score: 100 });\n});` }},
      { id:'ready', title:'Ready for the Quest?', readMins:1, sections:[
        { type:'prose', text:'You understand the backend: servers, Node.js, requests and responses, and simple API routes.' },
        { type:'callout', variant:'info', title:'Quiz Focus', text:'Expect frontend vs backend, GET vs POST, what a server does, and what JSON is.' }
      ]}
    ]
  },

  ss2: {
    title: 'JavaScript + Database', classLabel: 'SS2', quizKey: 'ss2', totalXP: 50,
    steps: [
      { id:'db-intro', title:'Why Databases?', readMins:3, sections:[
        { type:'prose', text:'A server forgets everything when it restarts. A database remembers — it stores your users, their progress, their posts, permanently. Every real app needs one.' },
        { type:'callout', variant:'info', title:'We use Supabase', text:'Supabase gives you a real database (PostgreSQL) with an easy way to read and write data from your code. MoyaCode itself runs on Supabase.' }
      ]},
      { id:'tables', title:'Tables, Rows and Columns', readMins:4, sections:[
        { type:'prose', text:'Data lives in tables. A table has columns (the fields, like name and score) and rows (one record each, like one student). Think of a spreadsheet with strict rules.' }
      ], codeBlock:{ label:'A students table', code:`students\n────────────────────────\nid | name  | score\n1  | Ada   | 120\n2  | Emeka | 90` }},
      { id:'crud', title:'Reading and Writing Data', readMins:4, sections:[
        { type:'prose', text:'The four things you do with data are: Create, Read, Update, Delete — often called CRUD. With Supabase you do them with short JavaScript calls.' }
      ], codeBlock:{ label:'Read and insert', code:`// read\nconst { data } = await supabase\n  .from("students").select("*");\n\n// create\nawait supabase.from("students")\n  .insert({ name: "Ada", score: 120 });` }},
      { id:'security', title:'Keeping Data Safe', readMins:4, sections:[
        { type:'prose', text:'Never let one user read another user’s private data. Supabase uses Row Level Security (RLS): rules that say a user can only see their own rows. Security is part of building, not an afterthought.' },
        { type:'callout', variant:'warning', title:'Golden rule', text:'Secret keys stay on the server. Never put a database secret in frontend code the browser can read.' }
      ]},
      { id:'ready', title:'Ready for the Quest?', readMins:1, sections:[
        { type:'prose', text:'You can now store and protect real data: tables, CRUD, and Row Level Security with Supabase.' },
        { type:'callout', variant:'info', title:'Quiz Focus', text:'Expect tables vs rows vs columns, the four CRUD actions, and why RLS matters.' }
      ]}
    ]
  },

  ss3: {
    title: 'Build a Full-Stack Project', classLabel: 'SS3', quizKey: 'ss3', totalXP: 50,
    steps: [
      { id:'plan', title:'Planning a Project', readMins:3, sections:[
        { type:'prose', text:'You now know the whole stack: HTML, CSS, JavaScript, a server, and a database. SS3 is where you put it together and build something real. Every good project starts with a plan: what does it do, and who is it for?' },
        { type:'callout', variant:'tip', title:'Start small', text:'A finished small app beats an unfinished big one. Pick one clear feature and build it fully.' }
      ]},
      { id:'pieces', title:'How the Pieces Connect', readMins:4, sections:[
        { type:'prose', text:'The frontend (HTML/CSS/JS) shows the app and takes input. It sends requests to your backend (server). The backend reads and writes the database, then responds. That round trip is a full-stack app.' }
      ], codeBlock:{ label:'The flow', code:`Browser (frontend)\n   → request →  Server (backend)\n                    → query →  Database\n                    ← data  ←\n   ← response ←` }},
      { id:'build', title:'Build, Test, Fix', readMins:4, sections:[
        { type:'prose', text:'Build one small piece at a time and test it before moving on. When something breaks — and it will — read the error, check one thing at a time, and use AI (like Moya) to explain what you do not understand.' },
        { type:'callout', variant:'info', title:'AI is your pair', text:'Professional developers use AI every day to explain errors and suggest fixes. Learning to work with it is a real skill.' }
      ]},
      { id:'ship', title:'Ship It to the World', readMins:3, sections:[
        { type:'prose', text:'A project no one can visit is unfinished. Deploying puts your app on the internet with a real link you can share — the same way MoyaCode is live for you right now.' }
      ]},
      { id:'ready', title:'Ready for the Quest?', readMins:1, sections:[
        { type:'prose', text:'You have the full picture of building and shipping software. This is what a junior developer does.' },
        { type:'callout', variant:'info', title:'Quiz Focus', text:'Expect the frontend→backend→database flow, planning, testing, and what deploying means.' }
      ]}
    ]
  }
};
