// Faculty teaching agents — one per subject track.
// Each agent owns a set of courses, introduces themselves to the student
// at lesson start, and hands off explicitly when their track is complete.

export const AGENTS = [
  {
    id:     "scratch",
    name:   "Tolu",
    role:   "Scratch & Visual Programming",
    emoji:  "🎮",
    tracks: ["jss1", "jss2"],
    intro(profile) {
      const opener = profile.dream
        ? `You said you want to "${profile.dream}" — visual programming is the perfect place to start.`
        : `Welcome to visual programming.`;
      return `${opener} In Scratch, you build real programs by snapping blocks together — no typing required yet. By the end of this track, you'll have sprites moving, reacting, and talking to each other. Let's go.`;
    },
    farewell(nextAgent) {
      if (!nextAgent) return "You've completed everything. You are a MoyaCode legend.";
      return `Scratch done. You can make things move, react, and communicate — that is real programming logic. I'm passing you to ${nextAgent.emoji} ${nextAgent.name}, who'll teach you HTML. The web starts here.`;
    },
  },
  {
    id:     "html",
    name:   "Chidi",
    role:   "HTML & Web Structure",
    emoji:  "🌐",
    tracks: ["jss3", "ss1"],
    intro(profile) {
      const opener = profile.dream
        ? `You're aiming for "${profile.dream}".`
        : `Good to have you here.`;
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
    tracks: ["ss2"],
    intro(profile) {
      const opener = profile.dream
        ? `You're building toward "${profile.dream}".`
        : `Ready to make things look good?`;
      return `${opener} CSS is what makes the web beautiful. I'm Amaka. You already know how to structure a page — now I'll teach you how to control colors, fonts, spacing, and layout. This is where your pages start looking like real products.`;
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
    tracks: ["ss3"],
    intro(profile) {
      const opener = profile.dream
        ? `You said you want to "${profile.dream}" — JavaScript is what makes that possible.`
        : `This is where everything comes to life.`;
      return `${opener} I'm Emeka. You've got structure from HTML and style from CSS. Now we add behavior — buttons that do things, logic that responds, code that runs. This is the track that turns a webpage into a product.`;
    },
    farewell(_nextAgent) {
      return "All four tracks done — Scratch, HTML, CSS, JavaScript. You are a MoyaCode graduate.";
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
