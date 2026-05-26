// Watcher — reads activity logs, builds the activity record, renders summaries.
// One source of truth (buildActivityRecord); two templates (renderParentReport, renderStudentReflection).

const COURSE_META = {
  jss1: { title: "JSS1 · Scratch Basics",   totalQs: 5, maxXP: 55 },
  jss2: { title: "JSS2 · Advanced Scratch",  totalQs: 5, maxXP: 55 },
  jss3: { title: "JSS3 · Intro to HTML",     totalQs: 5, maxXP: 55 },
  ss1:  { title: "SS1 · Advanced HTML",      totalQs: 5, maxXP: 55 },
  ss2:  { title: "SS2 · CSS Styling",        totalQs: 5, maxXP: 55 },
  ss3:  { title: "SS3 · JavaScript Logic",   totalQs: 5, maxXP: 55 },
};

const COURSE_ORDER = ["jss1", "jss2", "jss3", "ss1", "ss2", "ss3"];

function readLocal(key, fallback = "") {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? v : fallback;
  } catch { return fallback; }
}

function readLog() {
  try {
    return JSON.parse(localStorage.getItem("moyacode_session_log") || "[]");
  } catch { return []; }
}

// ─── ACTIVITY RECORD ──────────────────────────────────────────────────────────
// The single structured record the two templates render from.
export function buildActivityRecord() {
  const log = readLog();
  const now = new Date();

  const student = {
    dream:      readLocal("moyacode_dream"),
    motivation: readLocal("moyacode_motivation"),
    goal:       readLocal("moyacode_goal"),
  };

  const courses = {};
  for (const key of COURSE_ORDER) {
    const entries    = log.filter(e => e.classKey === key);
    const timestamps = entries.map(e => e.timestamp).filter(Boolean).sort();

    courses[key] = {
      title:             COURSE_META[key].title,
      completed:         readLocal(`moyacode_progress_${key}`) === "complete",
      lessonSeen:        readLocal(`moyacode_lesson_seen_${key}`) === "true",
      questionsAnswered: entries.length,
      correctAnswers:    entries.filter(e => e.isCorrect).length,
      xpEarned:          entries.reduce((s, e) => s + (e.xpAwarded || 0), 0),
      accuracy:          entries.length ? entries.filter(e => e.isCorrect).length / entries.length : 0,
      firstActive:       timestamps[0] || null,
      lastActive:        timestamps[timestamps.length - 1] || null,
    };
  }

  const allTimestamps     = log.map(e => e.timestamp).filter(Boolean).sort();
  const activeDates       = new Set(allTimestamps.map(t => t.slice(0, 10)));
  const firstSeen         = allTimestamps[0] || null;
  const lastSeen          = allTimestamps[allTimestamps.length - 1] || null;
  const daysSinceLastActive = lastSeen
    ? Math.floor((now - new Date(lastSeen)) / 86_400_000)
    : null;

  const questionsAnswered = log.length;
  const correctAnswers    = log.filter(e => e.isCorrect).length;
  const totalXP           = log.reduce((s, e) => s + (e.xpAwarded || 0), 0);

  return {
    generatedAt: now.toISOString(),
    student,
    courses,
    totals: {
      coursesCompleted:  COURSE_ORDER.filter(k => courses[k].completed).length,
      coursesStarted:    COURSE_ORDER.filter(k => courses[k].questionsAnswered > 0).length,
      questionsAnswered,
      correctAnswers,
      totalXP,
      overallAccuracy:   questionsAnswered ? correctAnswers / questionsAnswered : 0,
      activeDays:        activeDates.size,
      firstSeen,
      lastSeen,
      daysSinceLastActive,
    },
  };
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function pct(ratio) {
  return Math.round(ratio * 100) + "%";
}

function dayLabel(n) {
  if (n === null || n === undefined) return "—";
  if (n === 0) return "today";
  if (n === 1) return "yesterday";
  return `${n} days ago`;
}

// ─── PARENT REPORT ────────────────────────────────────────────────────────────
// Tone: plain, factual, lightly formal. Honest about struggle, not alarming.
// Job: protect the sale — reassure the parent their money is working.
export function renderParentReport(record) {
  const { student, courses, totals, generatedAt } = record;
  const lines = [];

  lines.push("MOYACODE — STUDENT PROGRESS REPORT");
  lines.push(`Generated: ${fmtDate(generatedAt)}`);
  lines.push("");

  if (student.dream) {
    lines.push(`Student's stated goal: "${student.dream}"`);
    lines.push("");
  }

  lines.push(`COURSES COMPLETED: ${totals.coursesCompleted} of 6`);
  lines.push("");

  for (const key of COURSE_ORDER) {
    const c = courses[key];
    if (c.completed) {
      lines.push(`  ✓ ${c.title}`);
      lines.push(`    ${c.correctAnswers}/${c.questionsAnswered} correct · ${c.xpEarned} XP earned`);
    } else if (c.questionsAnswered > 0) {
      lines.push(`  → ${c.title}  (in progress, not yet passed)`);
      lines.push(`    ${c.correctAnswers}/${c.questionsAnswered} correct · ${pct(c.accuracy)} accuracy`);
      if (c.accuracy < 0.5) {
        lines.push(`    Note: finding this section challenging — additional practice recommended.`);
      }
    } else {
      lines.push(`  ○ ${c.title}  (not started)`);
    }
  }

  lines.push("");
  lines.push("SUMMARY");
  lines.push(`  Total XP earned:    ${totals.totalXP}`);
  lines.push(`  Questions answered: ${totals.questionsAnswered}`);
  lines.push(`  Overall accuracy:   ${pct(totals.overallAccuracy)}`);
  lines.push(`  Active days:        ${totals.activeDays}`);
  lines.push(`  First session:      ${fmtDate(totals.firstSeen)}`);
  lines.push(`  Last active:        ${dayLabel(totals.daysSinceLastActive)}`);

  if (totals.daysSinceLastActive !== null && totals.daysSinceLastActive > 7) {
    lines.push("");
    lines.push(
      `Note: No activity in the past ${totals.daysSinceLastActive} days. ` +
      `A check-in may help re-engage your student.`
    );
  }

  lines.push("");
  lines.push("—");
  lines.push("Sent by MoyaCode · moyacode.com");

  return lines.join("\n");
}

// ─── STUDENT REFLECTION ───────────────────────────────────────────────────────
// Tone: warm, journey-framed, in the teaching agent's voice.
// Job: protect retention — celebrate then point forward.
export function renderStudentReflection(record) {
  const { student, courses, totals } = record;
  const lines = [];

  const completed   = COURSE_ORDER.filter(k => courses[k].completed);
  const inProgress  = COURSE_ORDER.filter(k => !courses[k].completed && courses[k].questionsAnswered > 0);
  const notStarted  = COURSE_ORDER.filter(k => courses[k].questionsAnswered === 0);

  lines.push("Hey, Coder. Here's your journey so far.");
  lines.push("");

  if (completed.length > 0) {
    lines.push("WHAT YOU'VE MASTERED:");
    for (const key of completed) {
      const c = courses[key];
      if (c.accuracy === 1) {
        lines.push(`  ★ ${c.title}`);
        lines.push(`    Perfect score — you didn't miss a single one.`);
      } else {
        lines.push(`  ★ ${c.title}`);
        lines.push(`    ${c.correctAnswers} out of ${c.questionsAnswered} — passed. Well done.`);
      }
    }
    lines.push("");
  }

  if (inProgress.length > 0) {
    lines.push("WHAT YOU'RE WORKING ON:");
    for (const key of inProgress) {
      const c = courses[key];
      lines.push(`  → ${c.title}`);
      if (c.accuracy >= 0.6) {
        lines.push(`    ${c.correctAnswers} of ${c.questionsAnswered} correct — you're close. One more push gets you there.`);
      } else {
        lines.push(`    ${c.correctAnswers} of ${c.questionsAnswered} correct — still finding your feet here. That's fine. Keep going.`);
      }
    }
    lines.push("");
  }

  if (completed.length === 0 && inProgress.length === 0) {
    lines.push("You haven't started any quests yet — but you're here, and that counts.");
    lines.push("Pick your first course and take one step.");
    lines.push("");
  } else if (notStarted.length > 0 && completed.length > 0) {
    const next = notStarted[0];
    lines.push(`NEXT UP: ${courses[next].title}`);
    lines.push(`  You've proven you can do this. Keep the streak alive.`);
    lines.push("");
  }

  if (student.dream) {
    lines.push(`YOUR DREAM:`);
    lines.push(`You said you want to "${student.dream}".`);
    lines.push(`Every question you answer gets you closer. Keep stacking.`);
    lines.push("");
  }

  lines.push(`TOTAL XP: ${totals.totalXP} ⚡`);
  if (totals.activeDays > 1) lines.push(`Days you showed up: ${totals.activeDays}`);

  if (totals.daysSinceLastActive !== null && totals.daysSinceLastActive > 3) {
    lines.push("");
    lines.push(`It's been a little while. Come back and pick up where you left off.`);
  }

  lines.push("");
  lines.push("— Your MoyaCode Faculty");

  return lines.join("\n");
}
