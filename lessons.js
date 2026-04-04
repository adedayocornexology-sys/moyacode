// Lesson content banks used by lesson.html
const LESSON_BANKS = {
  jss1: {
    title: "Scratch Basics", classLabel: "JSS1", quizKey: "jss1", totalXP: 50,
    steps: [
      { id:"what-is-scratch", title:"What is Scratch?", readMins:2, sections:[
        { type:"prose", text:"Scratch is a visual programming language made for beginners. Instead of typing code, you drag and drop colourful blocks to build programs." },
        { type:"callout", variant:"info", title:"Key Idea", text:"Every program is a project. Characters are sprites. The canvas is the stage." },
        { type:"prose", text:"Think of Scratch like LEGO — each block snaps to the next to create logic." }
      ], codeBlock:null },
      { id:"green-flag", title:"The Green Flag Block", readMins:3, sections:[
        { type:"prose", text:"When green flag clicked is the standard entry point that starts scripts." },
        { type:"callout", variant:"warning", title:"Watch Out", text:"If your script has no starting event, it will not run." },
        { type:"callout", variant:"tip", title:"MoyaBot Tip", text:"Start most projects by placing the Green Flag block first." }
      ], codeBlock:{label:"Scratch Pseudocode", code:`when green flag clicked\n  say [Hello, World!] for (2) secs\n  move (10) steps`} },
      { id:"sprites-and-motion", title:"Sprites & Motion", readMins:3, sections:[
        { type:"prose", text:"Sprites are characters/objects. Motion blocks move sprites around x/y coordinates." },
        { type:"callout", variant:"info", title:"Key Idea", text:"X is left/right. Y is up/down." }
      ], codeBlock:{label:"Motion Example", code:`when green flag clicked\n  forever\n    if <key [right arrow] pressed?> then\n      change x by (10)`} },
      { id:"loops-forever", title:"Loops — Forever & Repeat", readMins:3, sections:[
        { type:"prose", text:"Loops repeat actions and reduce duplicate blocks." },
        { type:"callout", variant:"info", title:"Forever vs Repeat", text:"Forever is endless, Repeat runs N times." }
      ], codeBlock:{label:"Loop Examples", code:`when green flag clicked\n  forever\n    next costume`} },
      { id:"quiz-ready", title:"Ready for the Quest?", readMins:1, sections:[
        { type:"prose", text:"You now know stage/sprites, green flag, motion, and loops." },
        { type:"callout", variant:"tip", title:"MoyaBot Says", text:"You are ready — trust your reading and go for it." }
      ], codeBlock:null }
    ]
  },
  jss2: {
    title:"Advanced Scratch", classLabel:"JSS2", quizKey:"jss2", totalXP:50,
    steps:[
      { id:"control-blocks", title:"Control Blocks", readMins:3, sections:[
        {type:"prose", text:"If/Then/Else controls branching logic."},
        {type:"callout", variant:"info", title:"Key Idea", text:"Only one branch runs per condition check."}
      ], codeBlock:{label:"If-Else Example", code:`if <touching [edge]?> then\n  say [I hit the wall!]`} },
      { id:"variables", title:"Variables", readMins:3, sections:[
        {type:"prose", text:"Variables store changing values like score/lives."},
        {type:"callout", variant:"tip", title:"MoyaBot Tip", text:"Reset score to 0 on green flag click."}
      ], codeBlock:{label:"Score Variable", code:`set [score] to (0)\nchange [score] by (1)`} },
      { id:"broadcast", title:"Broadcast Messages", readMins:3, sections:[
        {type:"prose", text:"Broadcast enables sprite-to-sprite communication."}
      ], codeBlock:{label:"Broadcast Example", code:`broadcast [game-start]\nwhen I receive [game-start]`} },
      { id:"clones", title:"Clones", readMins:3, sections:[
        {type:"prose", text:"Clones create runtime copies for bullets/enemies."},
        {type:"callout", variant:"warning", title:"Watch Out", text:"Delete clones when no longer needed."}
      ], codeBlock:{label:"Clone Example", code:`create clone of [myself]\nwhen I start as a clone`} },
      { id:"quiz-ready", title:"Ready for the Quest?", readMins:1, sections:[{type:"prose", text:"You covered control, variables, broadcast, and clones."}], codeBlock:null }
    ]
  },
  jss3: {
    title:"Intro to HTML", classLabel:"JSS3", quizKey:"jss3", totalXP:50,
    steps:[
      { id:"what-is-html", title:"What is HTML?", readMins:2, sections:[{type:"prose", text:"HTML structures web pages."}], codeBlock:{label:"Minimal HTML Page", code:`&lt;!DOCTYPE html&gt;\n&lt;html&gt;...&lt;/html&gt;`} },
      { id:"tags-and-structure", title:"Tags & Structure", readMins:4, sections:[{type:"prose", text:"Most HTML tags come in opening/closing pairs."}], codeBlock:{label:"Tag Anatomy", code:`&lt;h1&gt;Hello&lt;/h1&gt;`} },
      { id:"headings-and-text", title:"Headings & Text", readMins:3, sections:[{type:"prose", text:"Use h1-h6 for hierarchy, p for paragraphs."}], codeBlock:{label:"Headings & Text Tags", code:`&lt;h1&gt;Title&lt;/h1&gt;\n&lt;p&gt;Body&lt;/p&gt;`} },
      { id:"links-and-images", title:"Links & Images", readMins:4, sections:[{type:"prose", text:"a uses href; img uses src and alt."}], codeBlock:{label:"Links & Images", code:`&lt;a href="about.html"&gt;About&lt;/a&gt;`} },
      { id:"quiz-ready", title:"Ready for the Quest?", readMins:1, sections:[{type:"prose", text:"You are ready for the HTML quiz."}], codeBlock:null }
    ]
  },
  ss1: {
    title:"Advanced HTML", classLabel:"SS1", quizKey:"ss1", totalXP:50,
    steps:[
      { id:"lists", title:"Lists", readMins:3, sections:[{type:"prose", text:"Use ol/ul with li items."}], codeBlock:{label:"List Examples", code:`&lt;ol&gt;&lt;li&gt;Step&lt;/li&gt;&lt;/ol&gt;`} },
      { id:"tables", title:"Tables", readMins:4, sections:[{type:"prose", text:"Use table > tr > td/th for tabular data."}], codeBlock:{label:"Basic Table", code:`&lt;table&gt;...&lt;/table&gt;`} },
      { id:"forms", title:"Forms & Inputs", readMins:4, sections:[{type:"prose", text:"Forms collect user input via input/select/button."}], codeBlock:{label:"Simple Form", code:`&lt;form&gt;...&lt;/form&gt;`} },
      { id:"semantic-html", title:"Semantic HTML", readMins:3, sections:[{type:"prose", text:"Use header/nav/main/section/article/footer."}], codeBlock:{label:"Semantic Page Structure", code:`&lt;main&gt;...&lt;/main&gt;`} },
      { id:"quiz-ready", title:"Ready for the Quest?", readMins:1, sections:[{type:"prose", text:"You are ready for advanced HTML questions."}], codeBlock:null }
    ]
  },
  ss2: {
    title:"CSS Styling", classLabel:"SS2", quizKey:"ss2", totalXP:50,
    steps:[
      { id:"what-is-css", title:"What is CSS?", readMins:2, sections:[{type:"prose", text:"CSS controls presentation and layout."}], codeBlock:{label:"Basic CSS", code:`h1 { color: #00E5A0; }`} },
      { id:"selectors", title:"Selectors", readMins:4, sections:[{type:"prose", text:"Element, class (.), and id (#) selectors are core."}], codeBlock:{label:"Selectors", code:`.card { border-radius: 12px; }`} },
      { id:"box-model", title:"The Box Model", readMins:4, sections:[{type:"prose", text:"Content, padding, border, margin."}], codeBlock:{label:"Box Model", code:`* { box-sizing: border-box; }`} },
      { id:"colors-and-fonts", title:"Colours & Fonts", readMins:3, sections:[{type:"prose", text:"Use hex/rgba and readable typography."}], codeBlock:{label:"Colours & Fonts", code:`body { font-family: 'Space Grotesk', sans-serif; }`} },
      { id:"quiz-ready", title:"Ready for the Quest?", readMins:1, sections:[{type:"prose", text:"You are ready for CSS quiz questions."}], codeBlock:null }
    ]
  },
  ss3: {
    title:"JavaScript Logic", classLabel:"SS3", quizKey:"ss3", totalXP:50,
    steps:[
      { id:"what-is-js", title:"What is JavaScript?", readMins:2, sections:[{type:"prose", text:"JavaScript powers interactivity and logic on the web."}], codeBlock:{label:"Your First JavaScript", code:`console.log("Hello, MoyaCode!");`} },
      { id:"variables-js", title:"Variables", readMins:3, sections:[{type:"prose", text:"Use const by default; use let when values change."}], codeBlock:{label:"Variables", code:`const maxLives = 3;\nlet xp = 0;`} },
      { id:"functions", title:"Functions", readMins:4, sections:[{type:"prose", text:"Functions package reusable logic."}], codeBlock:{label:"Functions", code:`function greet(name){ return 'Hi ' + name; }`} },
      { id:"dom", title:"The DOM", readMins:4, sections:[{type:"prose", text:"DOM APIs let JS read/update HTML and respond to events."}], codeBlock:{label:"DOM Basics", code:`document.getElementById('start-btn');`} },
      { id:"quiz-ready", title:"Ready for the Quest?", readMins:1, sections:[{type:"prose", text:"You are ready for JavaScript logic quiz questions."}], codeBlock:null }
    ]
  }
};
