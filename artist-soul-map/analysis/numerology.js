// Numerology engine — Life Path calculation and compatibility scoring

// Reduce a number to single digit, preserving master numbers 11, 22, 33
function reduceToLifePath(n) {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split('').reduce((s, d) => s + parseInt(d, 10), 0);
  }
  return n;
}

export function calcLifePath(dateString) {
  // Accept YYYY-MM-DD or DD/MM/YYYY or MM/DD/YYYY — normalise by stripping separators
  const digits = dateString.replace(/\D/g, '');
  if (digits.length < 8) throw new Error(`Invalid date: ${dateString}`);

  // Parse as YYYYMMDD
  let year, month, day;
  if (digits.length === 8 && parseInt(digits.slice(0, 4)) > 1000) {
    year  = digits.slice(0, 4);
    month = digits.slice(4, 6);
    day   = digits.slice(6, 8);
  } else {
    throw new Error(`Date must be YYYY-MM-DD format. Got: ${dateString}`);
  }

  const monthNum = reduceToLifePath(parseInt(month, 10));
  const dayNum   = reduceToLifePath(parseInt(day,   10));
  const yearNum  = reduceToLifePath(
    String(year).split('').reduce((s, d) => s + parseInt(d, 10), 0)
  );

  return reduceToLifePath(monthNum + dayNum + yearNum);
}

export function lifePathLabel(n) {
  const labels = {
    1:  'The Leader',
    2:  'The Diplomat',
    3:  'The Creator',
    4:  'The Builder',
    5:  'The Freedom Seeker',
    6:  'The Nurturer',
    7:  'The Seeker',
    8:  'The Powerhouse',
    9:  'The Humanitarian',
    11: 'The Intuitive (Master)',
    22: 'The Master Builder',
    33: 'The Master Teacher',
  };
  return labels[n] ?? `Life Path ${n}`;
}

// Compatibility score (0–100) between two Life Path numbers
// Based on traditional numerology affinity tables
const COMPAT = {
  // [a][b] = score (symmetric — fill both directions)
  '1-1': 65, '1-2': 50, '1-3': 85, '1-4': 45, '1-5': 80,
  '1-6': 55, '1-7': 60, '1-8': 70, '1-9': 75,
  '1-11': 55, '1-22': 60, '1-33': 70,

  '2-2': 70, '2-3': 60, '2-4': 85, '2-5': 45, '2-6': 90,
  '2-7': 50, '2-8': 75, '2-9': 55,
  '2-11': 90, '2-22': 70, '2-33': 80,

  '3-3': 75, '3-4': 45, '3-5': 85, '3-6': 65, '3-7': 80,
  '3-8': 55, '3-9': 70,
  '3-11': 65, '3-22': 55, '3-33': 90,

  '4-4': 65, '4-5': 50, '4-6': 80, '4-7': 55, '4-8': 85,
  '4-9': 45,
  '4-11': 60, '4-22': 90, '4-33': 70,

  '5-5': 60, '5-6': 50, '5-7': 80, '5-8': 55, '5-9': 65,
  '5-11': 70, '5-22': 55, '5-33': 60,

  '6-6': 80, '6-7': 50, '6-8': 75, '6-9': 85,
  '6-11': 80, '6-22': 75, '6-33': 95,

  '7-7': 70, '7-8': 50, '7-9': 80,
  '7-11': 85, '7-22': 60, '7-33': 75,

  '8-8': 75, '8-9': 55,
  '8-11': 65, '8-22': 85, '8-33': 70,

  '9-9': 80,
  '9-11': 70, '9-22': 65, '9-33': 85,

  '11-11': 75, '11-22': 80, '11-33': 90,
  '22-22': 70, '22-33': 85,
  '33-33': 80,
};

export function compatibilityScore(a, b) {
  const key1 = `${Math.min(a, b)}-${Math.max(a, b)}`;
  return COMPAT[key1] ?? 50; // neutral default
}

export function compatibilityLabel(score) {
  if (score >= 88) return 'Soul-level alignment';
  if (score >= 75) return 'Strong affinity';
  if (score >= 62) return 'Natural resonance';
  if (score >= 50) return 'Moderate connection';
  return 'Challenging dynamic';
}
