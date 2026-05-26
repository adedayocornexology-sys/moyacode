// Examiner — independent pass/fail judge. Takes the Watcher's activity record;
// returns verdicts. Never touches teaching logic or summary templates.
// The Examiner is the gate the teacher cannot open for their own student.

const COURSE_ORDER = ["jss1", "jss2", "jss3", "ss1", "ss2", "ss3"];

// Thresholds
const THRESHOLD_STRONG = 0.80; // A or B — clean advance
const THRESHOLD_PASS   = 0.60; // C — passed, but borderline
const DROPOUT_DAYS     = 7;    // inactive this long = at-risk flag

// ─── PUBLIC API ───────────────────────────────────────────────────────────────

export function examineRecord(record) {
  const { courses, totals } = record;

  const courseVerdicts = {};
  for (const key of COURSE_ORDER) {
    courseVerdicts[key] = examineCourse(key, courses[key]);
  }

  const overall = examineOverall(courseVerdicts, totals);

  return {
    examinedAt:     new Date().toISOString(),
    courseVerdicts,
    overall,
  };
}

// ─── COURSE VERDICT ──────────────────────────────────────────────────────────
// result:         "not-started" | "fail" | "incomplete" | "pass"
// grade:          null | "F" | "D" | "C" | "B" | "A"
// recommendation: "not-started" | "retry" | "advance-with-note" | "advance"
// attempts:       rough count of how many times the student sat this course

function examineCourse(key, course) {
  const { completed, questionsAnswered, correctAnswers, accuracy } = course;
  const totalQs = 5; // fixed per course in current quiz engine
  const attempts = questionsAnswered > 0 ? Math.ceil(questionsAnswered / totalQs) : 0;

  if (questionsAnswered === 0) {
    return {
      result: "not-started",
      grade: null,
      recommendation: "not-started",
      attempts: 0,
      notes: "No questions attempted.",
    };
  }

  if (!completed) {
    // Started but didn't reach a pass
    const pct = Math.round(accuracy * 100);
    return {
      result: accuracy >= THRESHOLD_PASS ? "incomplete" : "fail",
      grade:  accuracy >= THRESHOLD_PASS ? "D" : "F",
      recommendation: "retry",
      attempts,
      notes: attempts > 1
        ? `${pct}% accuracy across ${attempts} attempts — not yet passed.`
        : `${pct}% accuracy — below the 60% pass mark.`,
    };
  }

  // Completed — grade by accuracy on the passing attempt set
  // We use overall accuracy because multiple low-accuracy attempts before
  // a pass are signal the student found this hard.
  const pct = Math.round(accuracy * 100);

  if (accuracy === 1.0) {
    return {
      result: "pass",
      grade: "A",
      recommendation: "advance",
      attempts,
      notes: attempts > 1
        ? `Perfect score on a retry — shows persistence and mastery.`
        : `Perfect score, first attempt.`,
    };
  }

  if (accuracy >= THRESHOLD_STRONG) {
    return {
      result: "pass",
      grade: "B",
      recommendation: "advance",
      attempts,
      notes: `${pct}% accuracy — strong pass.${attempts > 1 ? ` Took ${attempts} attempts.` : ""}`,
    };
  }

  // 60–79% — passed but borderline
  return {
    result: "pass",
    grade: "C",
    recommendation: "advance-with-note",
    attempts,
    notes: `${pct}% accuracy — passed, but borderline. Review recommended before advancing.${attempts > 1 ? ` Took ${attempts} attempts.` : ""}`,
  };
}

// ─── OVERALL VERDICT ─────────────────────────────────────────────────────────

function examineOverall(courseVerdicts, totals) {
  const passed      = COURSE_ORDER.filter(k => courseVerdicts[k].result === "pass");
  const failed      = COURSE_ORDER.filter(k => ["fail", "incomplete"].includes(courseVerdicts[k].result));
  const notStarted  = COURSE_ORDER.filter(k => courseVerdicts[k].result === "not-started");
  const borderline  = COURSE_ORDER.filter(k => courseVerdicts[k].grade === "C");

  // Furthest course attempted (for dropout context)
  let highestAttempted = null;
  for (let i = COURSE_ORDER.length - 1; i >= 0; i--) {
    if (courseVerdicts[COURSE_ORDER[i]].result !== "not-started") {
      highestAttempted = COURSE_ORDER[i];
      break;
    }
  }

  // Next unlocked course (first non-passed)
  const nextCourse = COURSE_ORDER.find(k => courseVerdicts[k].result !== "pass") || null;

  // Standing
  let standing;
  if (passed.length === COURSE_ORDER.length)          standing = "graduate";
  else if (passed.length >= 4)                         standing = "advanced";
  else if (passed.length >= 2)                         standing = "progressing";
  else if (totals.questionsAnswered > 0)               standing = "early";
  else                                                 standing = "not-started";

  // Dropout risk
  const atRisk = (
    totals.daysSinceLastActive !== null &&
    totals.daysSinceLastActive >= DROPOUT_DAYS &&
    standing !== "graduate"
  );

  const recommendation = buildRecommendation(standing, nextCourse, borderline, failed, atRisk);

  return {
    standing,           // "not-started" | "early" | "progressing" | "advanced" | "graduate"
    passedCount:     passed.length,
    failedCount:     failed.length,
    notStartedCount: notStarted.length,
    borderlineCount: borderline.length,
    borderlineCourses: borderline,
    highestAttempted,
    nextCourse,
    atRisk,
    daysSinceLastActive: totals.daysSinceLastActive,
    recommendation,
  };
}

function buildRecommendation(standing, nextCourse, borderline, failed, atRisk) {
  if (standing === "graduate") {
    return "All courses passed. Student is ready for the advanced track or a capstone assessment.";
  }
  if (standing === "not-started") {
    return "Student has not begun any course. Prompt to start JSS1 · Scratch Basics.";
  }

  const parts = [];

  if (atRisk) {
    parts.push("Student has been inactive for a week or more — re-engagement needed.");
  }

  if (failed.length > 0) {
    parts.push(`Retry required: ${failed.map(k => k.toUpperCase()).join(", ")}.`);
  }

  if (nextCourse && !failed.includes(nextCourse)) {
    parts.push(`Next course to unlock: ${nextCourse.toUpperCase()}.`);
  }

  if (borderline.length > 0) {
    parts.push(
      `Borderline passes on ${borderline.map(k => k.toUpperCase()).join(", ")} — ` +
      `optional review before advancing.`
    );
  }

  return parts.join(" ") || "Continue to the next course.";
}
