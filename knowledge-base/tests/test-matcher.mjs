import { isConfusedLike, matchConcept, inferTopic } from '../../js/concept-matcher.js';

// Index rows mirroring 002_seed_concepts.sql
const INDEX = [
  { id:'1',  concept_slug:'what-is-html',        title:'What is HTML?',                  tags:['html','structure','web','webpage','markup'], grade_level:['JSS3'], page_id:'p1' },
  { id:'2',  concept_slug:'html-tags',           title:'Tags & Structure',               tags:['tags','tag','element','closing-tags','nesting','structure'], grade_level:['JSS3'], page_id:'p2' },
  { id:'3',  concept_slug:'headings-paragraphs', title:'Headings & Paragraphs',          tags:['headings','heading','paragraph','h1','text'], grade_level:['JSS3'], page_id:'p3' },
  { id:'4',  concept_slug:'links-images',        title:'Links & Images',                 tags:['links','link','anchor','images','image','href','src','alt-text'], grade_level:['JSS3'], page_id:'p4' },
  { id:'5',  concept_slug:'html-lists',          title:'Lists',                          tags:['lists','list','ol','ul','li','bullet','ordered','unordered'], grade_level:['SS1'], page_id:'p5' },
  { id:'6',  concept_slug:'html-tables',         title:'Tables',                         tags:['tables','table','rows','row','cells','td','tr','th'], grade_level:['SS1'], page_id:'p6' },
  { id:'7',  concept_slug:'html-forms',          title:'Forms & Inputs',                 tags:['forms','form','inputs','input','label','textarea','select','submit'], grade_level:['SS1'], page_id:'p7' },
  { id:'8',  concept_slug:'semantic-html',       title:'Semantic HTML',                  tags:['semantic','semantics','header','nav','main','footer','section','article'], grade_level:['SS1'], page_id:'p8' },
  { id:'9',  concept_slug:'what-is-css',         title:'What is CSS? (and the Cascade)', tags:['css','style','styling','stylesheet','cascade','cascading'], grade_level:['SS2'], page_id:'p9' },
  { id:'10', concept_slug:'css-selectors',       title:'Selectors (element, class, ID)', tags:['selectors','selector','class','id','specificity'], grade_level:['SS2'], page_id:'p10' },
  { id:'11', concept_slug:'box-model',           title:'The Box Model',                  tags:['box-model','box','padding','margin','border','box-sizing','spacing'], grade_level:['SS2'], page_id:'p11' },
  { id:'12', concept_slug:'colors-fonts',        title:'Colours & Fonts',                tags:['colors','colours','color','colour','fonts','font','hex','typography'], grade_level:['SS2'], page_id:'p12' },
  { id:'13', concept_slug:'what-is-js',          title:'What is JavaScript?',            tags:['javascript','js','behavior','interactive','logic','script'], grade_level:['SS3'], page_id:'p13' },
  { id:'14', concept_slug:'js-variables',        title:'Variables (let & const)',        tags:['variables','variable','let','const','assignment','equality'], grade_level:['SS3'], page_id:'p14' },
  { id:'15', concept_slug:'js-functions',        title:'Functions',                      tags:['functions','function','parameters','parameter','return','arguments'], grade_level:['SS3'], page_id:'p15' },
  { id:'16', concept_slug:'dom-basics',          title:'DOM Basics',                     tags:['dom','queryselector','getelementbyid','events','event','click','addeventlistener'], grade_level:['SS3'], page_id:'p16' },
];

// Realistic student messages → expected slug (null = should NOT match / should gap-log)
const CASES = [
  // ── should match (12 cases across topics & grades) ──
  ["what is html sef, I don't get it",                        'what-is-html',        'jss3'],
  ["why does my page break when I forget a closing tag",      'html-tags',           'jss3'],
  ["what's the difference between h1 and p",                  'headings-paragraphs', 'jss3'],
  ["how do I put an image on my page? whats alt text",        'links-images',        'jss3'],
  ["I'm confused about ol vs ul lists",                       'html-lists',          'ss1'],
  ["explain how tables work with tr and td",                  'html-tables',         'ss1'],
  ["how do forms collect input from the user",                'html-forms',          'ss1'],
  ["what is semantic html? why not just use div",             'semantic-html',       'ss1'],
  ["I don't understand the difference between class and id selector", 'css-selectors', 'ss2'],
  ["explain padding vs margin in the box model",              'box-model',           'ss2'],
  ["wetin be const and let? when do I use each variable",     'js-variables',        'ss3'],
  ["how does querySelector work? my click event does nothing",'dom-basics',          'ss3'],
  // grade boost tiebreaker: generic "css" question from an SS2 student
  ["what is css and how does the cascade work",               'what-is-css',         'ss2'],
  ["explain functions and return values please",              'js-functions',        null],
  // ── should NOT match → gap/fallback path ──
  ["what is a python dictionary",                             null,                  'ss3'],
  ["explain flexbox to me",                                   null,                  'ss2'],
  // ── should not even trigger (not confused-like) ──
  ["good morning moya",                                       'NOT_CONFUSED',        null],
  ["continue my lesson",                                      'NOT_CONFUSED',        null],
];

let pass = 0, fail = 0;
for (const [msg, expected, grade] of CASES) {
  const confused = isConfusedLike(msg);
  let result;
  if (expected === 'NOT_CONFUSED') {
    result = confused ? 'CONFUSED(!)': 'NOT_CONFUSED';
    ok(result === 'NOT_CONFUSED', msg, expected, result);
    continue;
  }
  if (!confused) { ok(false, msg, expected ?? 'gap', 'not detected as confused'); continue; }
  const hit = matchConcept(msg, INDEX, grade);
  result = hit ? hit.concept_slug : null;
  ok(result === expected, msg, expected ?? 'gap→' + (inferTopic(msg) || 'null'), result ?? 'gap→' + (inferTopic(msg) || 'null'));
}

function ok(cond, msg, expected, got) {
  if (cond) { pass++; console.log(`  ✓ "${msg}" → ${got}`); }
  else { fail++; console.log(`  ✗ "${msg}"  expected=${expected}  got=${got}`); }
}
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
