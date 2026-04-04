// Rich lesson content bank used by lesson.html
const LESSON_BANKS = {
  jss1: {
    title: 'Scratch Basics', classLabel: 'JSS1', quizKey: 'jss1', totalXP: 50,
    steps: [
      { id:'intro', title:'What is Scratch?', readMins:2, sections:[
        { type:'prose', text:'Scratch is a visual coding tool. Instead of typing code, you drag and connect blocks to create games, stories, and animations.' },
        { type:'callout', variant:'info', title:'Core Idea', text:'A Scratch project has a stage, sprites, scripts, and events. Events decide when code starts.' },
        { type:'prose', text:'Think of blocks like LEGO pieces: one block alone does little, but connected blocks create powerful behavior.' }
      ]},
      { id:'green-flag', title:'When Green Flag Clicked', readMins:3, sections:[
        { type:'prose', text:'Most Scratch scripts begin with the event block “when green flag clicked.” This is your entry point.' },
        { type:'callout', variant:'warning', title:'Watch Out', text:'If there is no event block at the top, your script may never run.' },
        { type:'prose', text:'Use this block whenever you want your project to start from a clean state.' }
      ], codeBlock:{ label:'Scratch Pseudocode', code:`when green flag clicked\nset [score] to (0)\nsay [Welcome!] for (2) secs` }},
      { id:'motion', title:'Motion and Coordinates', readMins:3, sections:[
        { type:'prose', text:'Sprites move with x and y coordinates. Increasing x moves right, decreasing x moves left.' },
        { type:'prose', text:'Increasing y moves up, decreasing y moves down. This is how most game movement works.' }
      ], codeBlock:{ label:'Movement Example', code:`if <key [right arrow] pressed?> then\n  change x by (10)\nif <key [left arrow] pressed?> then\n  change x by (-10)` }},
      { id:'loops', title:'Loops: Repeat vs Forever', readMins:3, sections:[
        { type:'prose', text:'Use Repeat when you know exactly how many times to run a block sequence.' },
        { type:'prose', text:'Use Forever for continuous behavior, like listening for key input in a game.' },
        { type:'callout', variant:'tip', title:'MoyaBot Tip', text:'Most game control logic lives inside a Forever loop.' }
      ]},
      { id:'ready', title:'Ready for the Quest?', readMins:1, sections:[
        { type:'prose', text:'You now understand events, movement, and loops — the core of beginner Scratch logic.' },
        { type:'callout', variant:'info', title:'Quiz Focus', text:'Expect questions about event blocks, movement blocks, and loop behavior.' }
      ]}
    ]
  },

  jss2: {
    title: 'Advanced Scratch', classLabel: 'JSS2', quizKey: 'jss2', totalXP: 50,
    steps: [
      { id:'control', title:'Control Blocks', readMins:3, sections:[
        { type:'prose', text:'Control blocks shape decision flow. “if / else” lets your project react differently depending on conditions.' },
        { type:'callout', variant:'info', title:'Logic Flow', text:'Only one branch runs at a time: either IF branch or ELSE branch.' }
      ]},
      { id:'variables', title:'Variables', readMins:3, sections:[
        { type:'prose', text:'Variables store changing values such as score, lives, and timer values.' },
        { type:'callout', variant:'tip', title:'Good Habit', text:'Reset variables when green flag is clicked to avoid stale values.' }
      ], codeBlock:{ label:'Variable Flow', code:`when green flag clicked\nset [lives] to (3)\nset [score] to (0)` }},
      { id:'broadcast', title:'Broadcast Messages', readMins:3, sections:[
        { type:'prose', text:'Broadcast lets one sprite send a message so other sprites can react. This is sprite-to-sprite communication.' },
        { type:'prose', text:'Use “broadcast [message]” with “when I receive [message]” to coordinate gameplay.' }
      ]},
      { id:'clones', title:'Clones', readMins:3, sections:[
        { type:'prose', text:'Clones create copies of sprites at runtime. Useful for bullets, enemies, or collectibles.' },
        { type:'callout', variant:'warning', title:'Performance Tip', text:'Delete clones when done, or your project can become slow.' }
      ]},
      { id:'ready', title:'Ready for the Quest?', readMins:1, sections:[
        { type:'prose', text:'You are now ready for Advanced Scratch quiz questions on control, variables, broadcast, and clone patterns.' }
      ]}
    ]
  },

  jss3: {
    title: 'Intro to HTML', classLabel: 'JSS3', quizKey: 'jss3', totalXP: 50,
    steps: [
      { id:'html-intro', title:'What is HTML?', readMins:2, sections:[
        { type:'prose', text:'HTML (HyperText Markup Language) provides structure for web pages: headings, paragraphs, links, and media.' },
        { type:'prose', text:'Browsers read HTML and build the visual page from it.' }
      ]},
      { id:'tags', title:'Tags and Structure', readMins:4, sections:[
        { type:'prose', text:'Most HTML elements use opening and closing tags, for example: <p> ... </p>.' },
        { type:'callout', variant:'warning', title:'Watch Out', text:'Missed closing tags can break layout and make debugging hard.' }
      ], codeBlock:{ label:'Basic Structure', code:`<html>\n  <body>\n    <h1>Title</h1>\n  </body>\n</html>` }},
      { id:'text', title:'Headings and Paragraphs', readMins:3, sections:[
        { type:'prose', text:'Use h1 to h6 for heading hierarchy. Use p for paragraph text.' },
        { type:'callout', variant:'info', title:'Semantics', text:'Headings communicate structure to readers, search engines, and assistive tools.' }
      ]},
      { id:'links-images', title:'Links and Images', readMins:4, sections:[
        { type:'prose', text:'Links use the a tag and href attribute. Images use img with src and alt.' },
        { type:'callout', variant:'tip', title:'Accessibility', text:'Always include alt text to describe images.' }
      ]},
      { id:'ready', title:'Ready for the Quest?', readMins:1, sections:[{ type:'prose', text:'You have the core HTML basics to tackle the quest confidently.' }]}
    ]
  },

  ss1: {
    title: 'Advanced HTML', classLabel: 'SS1', quizKey: 'ss1', totalXP: 50,
    steps: [
      { id:'lists', title:'Lists', readMins:3, sections:[{ type:'prose', text:'Ordered lists (<ol>) are numbered. Unordered lists (<ul>) are bullets. List items are <li>.' }]},
      { id:'tables', title:'Tables', readMins:4, sections:[{ type:'prose', text:'Tables organize data into rows (<tr>) and cells (<td>/<th>).' },{ type:'callout', variant:'warning', title:'Best Practice', text:'Use tables for data, not overall page layout.' }]},
      { id:'forms', title:'Forms and Inputs', readMins:4, sections:[{ type:'prose', text:'Forms collect user data using input, select, textarea, and submit controls.' },{ type:'prose', text:'Labels improve usability and accessibility when linked via for/id.' }]},
      { id:'semantic', title:'Semantic HTML', readMins:3, sections:[{ type:'prose', text:'Use semantic tags like header, nav, main, section, article, and footer to describe meaning.' }]},
      { id:'ready', title:'Ready for the Quest?', readMins:1, sections:[{ type:'prose', text:'You now know advanced HTML structures used in real pages.' }]}
    ]
  },

  ss2: {
    title: 'CSS Styling', classLabel: 'SS2', quizKey: 'ss2', totalXP: 50,
    steps: [
      { id:'css-intro', title:'What is CSS?', readMins:2, sections:[
        { type:'prose', text:'CSS controls presentation and layout: colors, typography, spacing, and responsiveness.' },
        { type:'prose', text:'If HTML is structure, CSS is visual design.' },
        { type:'callout', variant:'info', title:'Cascading', text:'Styles cascade from parent to child unless overridden with more specific rules.' }
      ], codeBlock:{ label:'Starter CSS', code:`body {\n  font-family: sans-serif;\n  color: #CBD5F0;\n}` }},
      { id:'selectors', title:'Selectors', readMins:4, sections:[
        { type:'prose', text:'Selectors decide what gets styled: element selector (p), class selector (.card), and ID selector (#header).' },
        { type:'callout', variant:'warning', title:'Specificity', text:'ID selectors are very specific; prefer classes for reusable styling.' }
      ], codeBlock:{ label:'Selector Examples', code:`p { color: #CBD5F0; }\n.card { border-radius: 12px; }\n#hero { min-height: 100vh; }` }},
      { id:'box-model', title:'The Box Model', readMins:4, sections:[
        { type:'prose', text:'Every element is a box made of content, padding, border, and margin.' },
        { type:'prose', text:'Use box-sizing: border-box so widths are easier to reason about.' }
      ], codeBlock:{ label:'Box Model', code:`* { box-sizing: border-box; }\n.card { padding: 16px; margin: 12px; border: 1px solid #243350; }` }},
      { id:'fonts-colors', title:'Colours & Fonts', readMins:3, sections:[
        { type:'prose', text:'Use consistent font scales and color tokens for readable design systems.' },
        { type:'callout', variant:'tip', title:'Design Tip', text:'Use fewer colors with stronger contrast for cleaner UI.' }
      ]},
      { id:'ready', title:'Ready for the Quest?', readMins:1, sections:[
        { type:'prose', text:'You are ready for CSS quiz questions on selector types, property names, and styling logic.' },
        { type:'callout', variant:'info', title:'Remember', text:'Class = dot (.), ID = hash (#), and property names must be exact.' }
      ]}
    ]
  },

  ss3: {
    title: 'JavaScript Logic', classLabel: 'SS3', quizKey: 'ss3', totalXP: 50,
    steps: [
      { id:'js-intro', title:'What is JavaScript?', readMins:2, sections:[{ type:'prose', text:'JavaScript adds behavior to web pages: click handlers, dynamic updates, logic, and data processing.' }]},
      { id:'variables', title:'Variables', readMins:3, sections:[{ type:'prose', text:'Use let for changing values and const for fixed references.' },{ type:'callout', variant:'warning', title:'Syntax', text:'Use = for assignment and === for strict equality checks.' }]},
      { id:'functions', title:'Functions', readMins:4, sections:[{ type:'prose', text:'Functions package reusable logic. Inputs are parameters; outputs are return values.' }]},
      { id:'dom', title:'DOM Basics', readMins:4, sections:[{ type:'prose', text:'Use document.getElementById or querySelector to read/update page content and react to events.' }]},
      { id:'ready', title:'Ready for the Quest?', readMins:1, sections:[{ type:'prose', text:'You now have the JS foundations needed for your final quest.' }]}
    ]
  }
};
