// Faculty teaching agents — one per subject track.
// Each agent owns a set of courses, introduces themselves to the student
// at lesson start, and hands off explicitly when their track is complete.

export const AGENTS = [
  {
    id:     "html",
    name:   "Chidi",
    role:   "HTML & Web Structure",
    emoji:  "🌐",
    tracks: ["jss1"],
    intro(profile) {
      const opener = profile.dream
        ? `You said you want to "${profile.dream}" — every website that dream needs starts right here.`
        : `Welcome — this is where the web begins.`;
      return `${opener} Every website you've ever visited was built with HTML. I'm Chidi, and I'll show you how web pages are structured — from a blank file to a real page with headings, images, and links. By the end of this track, you'll read and write HTML with confidence.`;
    },
    farewell(nextAgent) {
      if (!nextAgent) return "You've completed everything. You are a MoyaCode legend.";
      return `HTML complete. You can now write the structure of any web page. I'm handing you to ${nextAgent.emoji} ${nextAgent.name} — the layer that controls how everything looks.`;
    },
  },
  {
    id:     "css",
    name:   "Amaka",
    role:   "CSS Styling",
    emoji:  "🎨",
    tracks: ["jss2"],
    intro(profile) {
      const opener = profile.dream
        ? `You're building toward "${profile.dream}".`
        : `Ready to make things look good?`;
      return `${opener} CSS is what makes the web beautiful. I'm Amaka. You already know how to structure a page — now I'll teach you how to control colours, fonts, spacing, and layout. This is where your pages start looking like real products.`;
    },
    farewell(nextAgent) {
      if (!nextAgent) return "You've completed everything. You are a MoyaCode legend.";
      return `CSS mastered. Your pages look exactly how you want them. I'm passing you to ${nextAgent.emoji} ${nextAgent.name} — the layer that makes pages respond and do things.`;
    },
  },
  {
    id:     "js",
    name:   "Emeka",
    role:   "JavaScript",
    emoji:  "⚡",
    tracks: ["jss3"],
    intro(profile) {
      const opener = profile.dream
        ? `You said you want to "${profile.dream}" — JavaScript is what makes that possible.`
        : `This is where everything comes to life.`;
      return `${opener} I'm Emeka. You've got structure from HTML and style from CSS. Now we add behaviour — buttons that do things, logic that responds, code that runs. Finish this and you've mastered the whole frontend.`;
    },
    farewell(nextAgent) {
      if (!nextAgent) return "You've completed everything. You are a MoyaCode legend.";
      return `That's the frontend done — HTML, CSS, and JavaScript. Real websites, built by you. Now ${nextAgent.emoji} ${nextAgent.name} takes you behind the scenes, to the server.`;
    },
  },
  {
    id:     "backend",
    name:   "Ngozi",
    role:   "Servers & Databases",
    emoji:  "🖥️",
    tracks: ["ss1", "ss2"],
    intro(profile) {
      const opener = profile.dream
        ? `To really build "${profile.dream}", you need the backend — and that's me.`
        : `Welcome behind the scenes.`;
      return `I'm Ngozi. So far your code ran in the browser; now we go to the server, where the real power lives. You'll learn to run JavaScript on a server with Node.js, build simple APIs, and store real data safely in a database with Supabase. This is what turns a website into an app.`;
    },
    farewell(nextAgent) {
      if (!nextAgent) return "You've completed everything. You are a MoyaCode legend.";
      return `Backend done — servers, APIs, and databases. You now have every piece of the stack. I'm handing you to ${nextAgent.emoji} ${nextAgent.name} to put it all together into a real project.`;
    },
  },
  {
    id:     "projects",
    name:   "Kunle",
    role:   "Full-Stack Projects",
    emoji:  "🚀",
    tracks: ["ss3"],
    intro(profile) {
      const opener = profile.dream
        ? `Time to build "${profile.dream}" for real.`
        : `Time to build something real.`;
      return `I'm Kunle. You know the whole stack now — frontend, server, and database. In this final track we plan, build, test, and ship a full-stack project to the internet, using AI as your pair the way real developers do. This is what a junior developer actually does.`;
    },
    farewell(_nextAgent) {
      return "All tracks done — HTML, CSS, JavaScript, servers, databases, and a shipped project. You are a MoyaCode graduate and a full-stack developer.";
    },
  },
];

const COURSE_ORDER = ["jss1", "jss2", "jss3", "ss1", "ss2", "ss3"];

export function getAgentForCourse(classKey) {
  return AGENTS.find(a => a.tracks.includes(classKey)) || null;
}

// Returns the next agent only when the current course is the last in its
// agent's track and the next course belongs to a different agent.
export function getNextAgent(classKey) {
  const current = getAgentForCourse(classKey);
  if (!current) return null;

  const idx = COURSE_ORDER.indexOf(classKey);
  for (let i = idx + 1; i < COURSE_ORDER.length; i++) {
    const candidate = getAgentForCourse(COURSE_ORDER[i]);
    if (candidate && candidate.id !== current.id) return candidate;
  }
  return null;
}

// Whether completing classKey triggers a cross-agent handoff.
export function isHandoffCourse(classKey) {
  const current = getAgentForCourse(classKey);
  if (!current) return false;
  // Last course in this agent's track?
  const ownedCourses = COURSE_ORDER.filter(k => current.tracks.includes(k));
  return ownedCourses[ownedCourses.length - 1] === classKey;
}

// Log a cross-agent handoff to localStorage (Watcher reads this).
export function logHandoff(fromKey, toKey) {
  const from = getAgentForCourse(fromKey);
  const to   = getAgentForCourse(toKey);
  if (!from || !to || from.id === to.id) return;
  try {
    const k    = "moyacode_handoffs";
    const log  = JSON.parse(localStorage.getItem(k) || "[]");
    log.push({
      fromCourse:    fromKey,
      toCourse:      toKey,
      fromAgentId:   from.id,
      fromAgentName: from.name,
      toAgentId:     to.id,
      toAgentName:   to.name,
      timestamp:     new Date().toISOString(),
    });
    localStorage.setItem(k, JSON.stringify(log));
  } catch {}
}
