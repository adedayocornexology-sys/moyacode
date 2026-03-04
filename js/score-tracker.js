const SESSION_LOG_KEY = 'moyacode_session_log';

function readSessionLog() {
  try {
    const raw = localStorage.getItem(SESSION_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn('Failed to read score log:', error);
    return [];
  }
}

export function appendScoreLogEntry({ questionId, classKey, isCorrect, timestamp, xpAwarded }) {
  const currentLog = readSessionLog();
  const entry = { questionId, classKey, isCorrect, timestamp, xpAwarded };
  currentLog.push(entry);
  localStorage.setItem(SESSION_LOG_KEY, JSON.stringify(currentLog));
  return entry;
}

export function getSessionLog() {
  return readSessionLog();
}
