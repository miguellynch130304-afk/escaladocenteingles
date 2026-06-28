import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const functionOrder = ['now', 'temporary', 'future', 'annoying'];

const functionLabels = {
  now: 'ACTIONS HAPPENING NOW',
  temporary: 'TEMPORARY ACTIONS',
  future: 'FUTURE ARRANGEMENTS',
  annoying: 'CHANGING / ANNOYING ACTIONS'
};

const guidedExamples = [
  { id: 'annoying', sentence: 'The cat is always meowing.' },
  { id: 'future', sentence: 'He is playing soccer tomorrow.' },
  { id: 'temporary', sentence: 'Victor is studying English this week.' },
  { id: 'now', sentence: 'Victor is eating now.' }
];

const practiceExamples = [
  { id: 'annoying', sentence: 'My sister is always bothering me.' },
  { id: 'temporary', sentence: 'They are working this week.' },
  { id: 'future', sentence: 'He is studying with Ana tomorrow.' },
  { id: 'now', sentence: 'She is eating lunch now.' }
];

const readingChoices = {
  monitor: 'a team of engineers is monitoring the control panels',
  scientist: 'the lead scientist is biting her nails',
  tested: 'the agency tested the engine last year',
  testing: 'the space agency is testing a brand-new engine this week',
  launch: 'the rocket is launching at midnight',
  gathers: 'the crowd gathers near the gates every year',
  gathering: 'a massive crowd is gathering near the gates'
};

const readingFunctions = {
  monitor: 'Action happening right now',
  scientist: 'Action happening right now',
  testing: 'Temporary situation',
  launch: 'Definite future arrangement',
  gathering: 'Changing or developing situation'
};

const correctReadingChoices = Object.keys(readingFunctions);

const tenseChoiceItems = [
  {
    sentence: 'Can you please answer the phone?',
    options: ['I have a shower.', "I'm having a shower."],
    answer: 1,
    function: 'Action happening now'
  },
  {
    sentence: 'Choose the natural fact.',
    options: ['Summer comes after spring.', 'Summer is coming after spring.'],
    answer: 0,
    function: 'General truth'
  },
  {
    sentence: 'Choose the correct answer.',
    options: [
      'That woman looks at you. I am believing she is wanting to talk.',
      'That woman is looking at you. I believe she wants to talk.'
    ],
    answer: 1,
    function: 'Now action + stative verbs'
  },
  {
    sentence: 'Choose the storytelling.',
    options: [
      'Stevenson takes the ball and passes it to McFerry.',
      'Stevenson is taking the ball and is passing it to McFerry.'
    ],
    answer: 0,
    function: 'Storytelling / commentary'
  },
  {
    sentence: 'Choose the temporary situation.',
    options: [
      "Kevin doesn't go out this week. He studies for a test.",
      "Kevin isn't going out this week. He is studying for a test."
    ],
    answer: 1,
    function: 'Temporary action'
  },
  {
    sentence: 'Choose the daily habit.',
    options: ['My mum drinks three cups of coffee a day.', 'My mum is drinking three cups of coffee a day.'],
    answer: 0,
    function: 'Habit'
  },
  {
    sentence: 'Choose the future plan.',
    options: ['Kathy is meeting Maria tomorrow afternoon.', 'Kathy meets Maria tomorrow afternoon.'],
    answer: 0,
    function: 'Future arrangement'
  },
  {
    sentence: 'Choose the correct answer.',
    options: ['The bus leaves!', 'The bus is leaving!'],
    answer: 1,
    function: 'Action happening now'
  }
];

const multipleChoiceItems = [
  {
    prompt: "My mother ______ that's a good idea.",
    options: ["doesn't think", 'not thinks', "she doesn't think", "isn't thinking"],
    answer: 0,
    note: 'Think expresses an opinion here, so it is stative.'
  },
  {
    prompt: 'What time ______ at the station?',
    options: ['arrives the train', 'does arrive the train', 'is the train arriving', 'does the train arrive'],
    answer: 3,
    note: 'Use does + subject + base verb for a timetable question.'
  },
  {
    prompt: '______ a barbecue next Saturday?',
    options: ['Does Jack have', 'Jack having', 'Jack has', 'Is Jack having'],
    answer: 3,
    note: 'Present Continuous can express a confirmed future arrangement.'
  },
  {
    prompt: 'Harry ______ to us about his problems.',
    options: ['never talking', 'is never talking', "doesn't never talk", 'never talks'],
    answer: 3,
    note: 'Never talks describes a repeated habit.'
  },
  {
    prompt: 'Frank ______ speak French.',
    options: ["don't", "doesn't", "isn't", "aren't"],
    answer: 1,
    note: 'Third-person singular uses does not + base verb.'
  },
  {
    prompt: "We ______ with you, so don't wait for us.",
    options: ['not coming', "don't come", "aren't coming", "doesn't come"],
    answer: 2,
    note: 'A current decision or arrangement uses are not coming.'
  },
  {
    prompt: "I ______ drink milk. I can't stand it.",
    options: ['rarely', 'always', 'often', 'usually'],
    answer: 0,
    note: 'Rarely matches the negative preference in the second sentence.'
  }
];

const gapFillItems = [
  { prompt: 'My best friend Julie ______ at the Playtime toy shop. (work)', answer: 'works', function: 'Permanent situation' },
  { prompt: 'She ______ working there. (like)', answer: 'likes', function: 'Stative verb' },
  { prompt: 'She ______ lots of people every day. (meet)', answer: 'meets', function: 'Habit' },
  { prompt: 'She ______ children. (love)', answer: 'loves', function: 'Stative verb' },
  { prompt: 'She ______ showing them how the toys work. (enjoy)', answer: 'enjoys', function: 'Habit' },
  { prompt: 'The shop ______ at 10 a.m. (open)', answer: 'opens', function: 'Scheduled event' },
  { prompt: 'It ______ at 6 p.m. (close)', answer: 'closes', function: 'Scheduled event' },
  { prompt: 'Julie ______ working long hours. (not mind)', answer: "doesn't mind", alternatives: ['does not mind'], function: 'Stative verb' },
  { prompt: 'Her colleagues ______ about the job. (always / complain)', answer: 'are always complaining', function: 'Repeated annoying action' },
  { prompt: 'They ______ the job is tiring. (think)', answer: 'think', function: 'Stative verb' },
  { prompt: 'This week, Julie ______ at the shop. (not work)', answer: "isn't working", alternatives: ['is not working'], function: 'Temporary action' },
  { prompt: 'She ______ at home relaxing. (not sit)', answer: "isn't sitting", alternatives: ['is not sitting'], function: 'Action happening now' },
  { prompt: "She ______ at a friend's restaurant. (work)", answer: 'is working', function: 'Temporary action' },
  { prompt: 'She ______ the extra money. (need)', answer: 'needs', function: 'Stative verb' },
  { prompt: 'She ______ to buy a car. (want)', answer: 'wants', function: 'Stative verb' }
];

const slides = [
  { id: 'time', label: 'Time', title: 'Time Expressions' },
  { id: 'guided', label: 'Watch', title: 'Present Continuous Functions' },
  { id: 'match', label: 'Connect', title: 'Match Each Function' },
  { id: 'syntax', label: 'Build', title: 'Syntax and WH Questions' },
  { id: 'reading', label: 'Read', title: 'Mission Control Reading' },
  { id: 'breakdown', label: 'Check', title: 'Functions Identified' },
  { id: 'writing', label: 'Write', title: 'Writing Essay' },
  { id: 'stative-rule', label: 'Rule', title: 'Stative Verbs Use' },
  { id: 'stative-table', label: 'Compare', title: 'Stative and Action Meanings' },
  { id: 'tense-choice', label: 'Choose', title: 'Find the Tense and Function' },
  { id: 'multiple-choice', label: 'Quiz', title: 'Find the Correct Answer' },
  { id: 'gap-fill', label: 'Complete', title: 'Present Simple vs Progressive' }
];

const normalize = (value) => value.trim().toLowerCase().replace(/\s+/g, ' ');

const buildPath = (start, end) => {
  const distance = Math.max(70, (end.x - start.x) * 0.48);
  return `M ${start.x} ${start.y} C ${start.x + distance} ${start.y}, ${end.x - distance} ${end.y}, ${end.x} ${end.y}`;
};

const ContinuousMatchingBoard = ({ mode = 'automatic', examples, markerId }) => {
  const boardRef = useRef(null);
  const sourceRefs = useRef({});
  const targetRefs = useRef({});
  const [points, setPoints] = useState({ sources: {}, targets: {} });
  const [selectedSource, setSelectedSource] = useState('');
  const [connections, setConnections] = useState(
    mode === 'automatic'
      ? Object.fromEntries(examples.map((item) => [item.id, item.id]))
      : {}
  );
  const [checked, setChecked] = useState(false);

  const measurePoints = useCallback(() => {
    if (!boardRef.current) {
      return;
    }

    const boardRect = boardRef.current.getBoundingClientRect();
    const nextPoints = { sources: {}, targets: {} };

    examples.forEach((item) => {
      const source = sourceRefs.current[item.id];
      if (source) {
        const rect = source.getBoundingClientRect();
        nextPoints.sources[item.id] = {
          x: rect.left + rect.width / 2 - boardRect.left,
          y: rect.top + rect.height / 2 - boardRect.top
        };
      }
    });

    functionOrder.forEach((id) => {
      const target = targetRefs.current[id];
      if (target) {
        const rect = target.getBoundingClientRect();
        nextPoints.targets[id] = {
          x: rect.left + rect.width / 2 - boardRect.left,
          y: rect.top + rect.height / 2 - boardRect.top
        };
      }
    });

    setPoints(nextPoints);
  }, [examples]);

  useEffect(() => {
    measurePoints();
    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(measurePoints)
      : null;

    if (observer && boardRef.current) {
      observer.observe(boardRef.current);
    }

    window.addEventListener('resize', measurePoints);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measurePoints);
    };
  }, [measurePoints]);

  const connectionEntries = Object.entries(connections).filter(
    ([sourceId, targetId]) => points.sources[sourceId] && points.targets[targetId]
  );
  const completedCount = Object.keys(connections).length;
  const correctCount = Object.entries(connections).filter(
    ([sourceId, targetId]) => sourceId === targetId
  ).length;

  const connectTarget = (targetId) => {
    if (mode !== 'interactive' || !selectedSource) {
      return;
    }

    setConnections((current) => {
      const uniqueConnections = Object.fromEntries(
        Object.entries(current).filter(
          ([sourceId, assignedTarget]) => sourceId === selectedSource || assignedTarget !== targetId
        )
      );
      return { ...uniqueConnections, [selectedSource]: targetId };
    });
    setSelectedSource('');
    setChecked(false);
  };

  const reset = () => {
    setConnections({});
    setSelectedSource('');
    setChecked(false);
  };

  return (
    <div>
      <div className={`pc-arrow-board is-${mode}`} ref={boardRef}>
        <svg className="pc-arrow-layer" aria-hidden="true">
          <defs>
            <marker id={markerId} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" />
            </marker>
          </defs>
          {connectionEntries.map(([sourceId, targetId], index) => {
            const isCorrect = sourceId === targetId;
            return (
              <path
                key={`${sourceId}-${targetId}`}
                d={buildPath(points.sources[sourceId], points.targets[targetId])}
                pathLength="1"
                markerEnd={`url(#${markerId})`}
                className={[
                  'pc-connection-line',
                  mode === 'automatic' ? 'is-automatic' : '',
                  checked && isCorrect ? 'is-correct' : '',
                  checked && !isCorrect ? 'is-wrong' : ''
                ].filter(Boolean).join(' ')}
                style={{ '--connection-delay': `${0.35 + index * 0.32}s` }}
              />
            );
          })}
        </svg>

        <div className="pc-match-column">
          <span className="pc-column-label">EXAMPLES</span>
          {examples.map((item, index) => {
            const assignedTarget = connections[item.id];
            return (
              <button
                type="button"
                key={item.id}
                className={[
                  'pc-match-item pc-sentence-item',
                  selectedSource === item.id ? 'is-selected' : '',
                  assignedTarget ? 'is-connected' : ''
                ].filter(Boolean).join(' ')}
                onClick={() => {
                  if (mode === 'interactive') {
                    setSelectedSource(item.id);
                    setChecked(false);
                  }
                }}
                disabled={mode === 'automatic'}
                style={{ '--item-delay': `${index * 0.1}s` }}
              >
                <span className="pc-example-number">{index + 1}</span>
                <span className="pc-example-copy">
                  <span>{item.sentence}</span>
                  {assignedTarget ? (
                    <small className="pc-linked-function">{functionLabels[assignedTarget]}</small>
                  ) : null}
                </span>
                <span
                  className="pc-connection-dot is-source"
                  ref={(element) => {
                    sourceRefs.current[item.id] = element;
                  }}
                />
              </button>
            );
          })}
        </div>

        <div className="pc-function-panel">
          <span className="pc-column-label">FUNCTIONS</span>
          {functionOrder.map((id, index) => (
            <button
              type="button"
              key={id}
              className={[
                'pc-match-item pc-function-item',
                selectedSource ? 'is-available' : '',
                Object.values(connections).includes(id) ? 'is-used' : ''
              ].filter(Boolean).join(' ')}
              onClick={() => connectTarget(id)}
              disabled={mode === 'automatic'}
              style={{ '--item-delay': `${0.2 + index * 0.1}s` }}
            >
              <span
                className="pc-connection-dot is-target"
                ref={(element) => {
                  targetRefs.current[id] = element;
                }}
              />
              <span>{functionLabels[id]}</span>
            </button>
          ))}
        </div>
      </div>

      {mode === 'interactive' ? (
        <div className="pc-match-controls">
          <div>
            <strong>{completedCount}/{examples.length} connections made</strong>
            <span>
              {selectedSource
                ? 'Now choose one function. Each function can be used once.'
                : 'Choose a sentence, then choose its function.'}
            </span>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Button variant="light" onClick={reset}>Reset</Button>
            <Button
              variant="primary"
              disabled={completedCount !== examples.length}
              onClick={() => setChecked(true)}
            >
              Check answers
            </Button>
          </div>
          {checked ? (
            <div className={`pc-result ${correctCount === examples.length ? 'is-perfect' : ''}`}>
              <strong>{correctCount}/{examples.length} correct.</strong>
              <span>{correctCount === examples.length ? 'Excellent work.' : 'Review the red connections and try again.'}</span>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="pc-auto-caption">Watch each example connect to its communicative function.</div>
      )}
    </div>
  );
};

const ReadingChoice = ({ id, selected, checked, onToggle }) => {
  const isCorrect = correctReadingChoices.includes(id);
  return (
    <button
      type="button"
      className={[
        'pc-reading-choice',
        selected ? 'is-selected' : '',
        checked && selected && isCorrect ? 'is-correct' : '',
        checked && selected && !isCorrect ? 'is-wrong' : '',
        checked && !selected && isCorrect ? 'is-missed' : ''
      ].filter(Boolean).join(' ')}
      aria-pressed={selected}
      onClick={() => onToggle(id)}
    >
      {readingChoices[id]}
    </button>
  );
};

const PresentContinuousBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedReading, setSelectedReading] = useState([]);
  const [readingChecked, setReadingChecked] = useState(false);
  const [writingDraft, setWritingDraft] = useState('');
  const [tenseSelections, setTenseSelections] = useState({});
  const [tenseChecked, setTenseChecked] = useState(false);
  const [quizSelections, setQuizSelections] = useState({});
  const [quizChecked, setQuizChecked] = useState(false);
  const [gapAnswers, setGapAnswers] = useState({});
  const [gapChecked, setGapChecked] = useState(false);

  const slide = slides[activeSlide];
  const progress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const wordCount = writingDraft.trim() ? writingDraft.trim().split(/\s+/).length : 0;
  const readingCorrect = selectedReading.filter((id) => correctReadingChoices.includes(id)).length;
  const tenseScore = tenseChoiceItems.filter((item, index) => Number(tenseSelections[index]) === item.answer).length;
  const quizScore = multipleChoiceItems.filter((item, index) => Number(quizSelections[index]) === item.answer).length;
  const gapScore = gapFillItems.filter((item, index) => {
    const accepted = [item.answer, ...(item.alternatives || [])].map(normalize);
    return accepted.includes(normalize(gapAnswers[index] || ''));
  }).length;

  const toggleReading = (id) => {
    setSelectedReading((current) => (
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    ));
    setReadingChecked(false);
  };

  const renderSlide = () => {
    if (slide.id === 'time') {
      const groups = [
        {
          label: 'Actions happening now',
          helper: 'At the exact moment of speaking',
          expressions: ['now', 'at the moment', 'at present', 'right now']
        },
        {
          label: 'Temporary actions',
          helper: 'Around now, for a limited period',
          expressions: ['these days', 'this week', 'this month', 'this year']
        },
        {
          label: 'Future arrangements',
          helper: 'Plans already arranged or confirmed',
          expressions: ['tomorrow', 'tonight', 'next week', 'next month', 'next year']
        }
      ];

      return (
        <div className="pc-slide-content">
          <div className="pc-time-intro">
            <span>WHEN?</span>
            <h3>Time expressions reveal the function.</h3>
            <p>Look for these clues before choosing Present Continuous.</p>
          </div>
          <div className="pc-time-grid">
            {groups.map((group, index) => (
              <article key={group.label} style={{ '--item-delay': `${index * 0.12}s` }}>
                <span>0{index + 1}</span>
                <h3>{group.label}</h3>
                <p>{group.helper}</p>
                <div>{group.expressions.map((item) => <small key={item}>{item}</small>)}</div>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'guided') {
      return (
        <div className="pc-slide-content">
          <div className="pc-lead">
            <span>WATCH THE CONNECTIONS</span>
            <p>The arrows connect each sentence to its Present Continuous function.</p>
          </div>
          <ContinuousMatchingBoard mode="automatic" examples={guidedExamples} markerId="pc-guided-arrow" />
        </div>
      );
    }

    if (slide.id === 'match') {
      return (
        <div className="pc-slide-content">
          <div className="pc-lead">
            <span>YOUR TURN</span>
            <p>Match every sentence with a different function.</p>
          </div>
          <ContinuousMatchingBoard mode="interactive" examples={practiceExamples} markerId="pc-practice-arrow" />
        </div>
      );
    }

    if (slide.id === 'syntax') {
      const tokens = [
        ['subject', 'The president'],
        ['auxiliary', 'is'],
        ['verb', 'governing'],
        ['place', 'at the palace'],
        ['people', 'with his ministers'],
        ['reason', 'to develop the economy'],
        ['time', 'right now']
      ];
      const questions = [
        ['WHERE', 'Where is he governing?', 'place'],
        ['WHEN', 'When is he governing?', 'time'],
        ['WHY', 'Why is he governing?', 'reason'],
        ['WHO · WITH', 'Who is he governing with?', 'people'],
        ['GENERAL QUESTION', 'What is he doing?', 'What + the verb do']
      ];

      return (
        <div className="pc-slide-content">
          <div className="pc-formula">
            <span>WH WORD</span><i className="fe fe-plus" />
            <strong>AM / IS / ARE</strong><i className="fe fe-plus" />
            <span>SUBJECT</span><i className="fe fe-plus" />
            <span>VERB-ING</span><i className="fe fe-help-circle" />
          </div>
          <div className="pc-token-sentence">
            {tokens.map(([role, text], index) => (
              <span key={role} className={`is-${role}`} style={{ '--item-delay': `${index * 0.09}s` }}>
                <small>{role}</small>{text}
              </span>
            ))}
          </div>
          <div className="pc-question-grid">
            {questions.map(([label, question, purpose], index) => (
              <div key={label} style={{ '--item-delay': `${0.3 + index * 0.08}s` }}>
                <span>{label}<small>{purpose}</small></span>
                <strong>{question}</strong>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'reading') {
      return (
        <div className="pc-slide-content">
          <div className="pc-reading-instruction">
            <strong>Find exactly five Present Continuous verb groups.</strong>
            <span>Select examples of now actions, temporary situations, future arrangements, and changing situations.</span>
          </div>
          <article className="pc-reading-paper">
            <h3>Launch Night</h3>
            <p>
              Right now, <ReadingChoice id="monitor" selected={selectedReading.includes('monitor')} checked={readingChecked} onToggle={toggleReading} />.
              Across the room, <ReadingChoice id="scientist" selected={selectedReading.includes('scientist')} checked={readingChecked} onToggle={toggleReading} /> while she watches the countdown.
            </p>
            <p>
              The team remembers that <ReadingChoice id="tested" selected={selectedReading.includes('tested')} checked={readingChecked} onToggle={toggleReading} />, but
              <ReadingChoice id="testing" selected={selectedReading.includes('testing')} checked={readingChecked} onToggle={toggleReading} />.
              Everyone knows that <ReadingChoice id="launch" selected={selectedReading.includes('launch')} checked={readingChecked} onToggle={toggleReading} />.
            </p>
            <p>
              Outside, <ReadingChoice id="gathers" selected={selectedReading.includes('gathers')} checked={readingChecked} onToggle={toggleReading} />, and tonight
              <ReadingChoice id="gathering" selected={selectedReading.includes('gathering')} checked={readingChecked} onToggle={toggleReading} /> as the launch approaches.
            </p>
          </article>
          <div className="pc-reading-actions">
            <span><strong>{selectedReading.length}/5</strong> phrases selected</span>
            <Button
              variant="primary"
              disabled={selectedReading.length !== 5}
              onClick={() => setReadingChecked(true)}
            >
              Check selections
            </Button>
          </div>
          {readingChecked ? (
            <div className={`pc-result ${readingCorrect === 5 ? 'is-perfect' : ''}`}>
              <strong>{readingCorrect}/5 correct.</strong>
              <span>{readingCorrect === 5 ? 'Excellent identification.' : 'Green choices are correct; yellow choices show what you missed.'}</span>
            </div>
          ) : null}
        </div>
      );
    }

    if (slide.id === 'breakdown') {
      const rows = [
        ['Actions happening right now', '...a team of engineers is monitoring the control panels...', 'Exact moment of speaking'],
        ['Actions happening right now', '...the lead scientist is biting her nails...', 'Visible current action'],
        ['Temporary situations', 'This week, the space agency is testing a new engine.', 'Limited period around now'],
        ['Definite future plans', 'The rocket is launching at midnight.', 'Confirmed arrangement'],
        ['Changing situations', 'A massive crowd is gathering near the gates.', 'Situation actively developing']
      ];

      return (
        <div className="pc-slide-content">
          <div className="pc-breakdown-list">
            {rows.map(([label, example, note], index) => (
              <article key={`${label}-${example}`} style={{ '--item-delay': `${index * 0.1}s` }}>
                <span>{index + 1}</span>
                <div><h3>{label}</h3><p>“{example}”</p></div>
                <small>{note}</small>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'writing') {
      return (
        <div className="pc-slide-content">
          <div className="pc-writing-layout">
            <div>
              <div className="pc-writing-model">
                <span>MODEL OPENING</span>
                <blockquote>
                  “I am visiting my grandmother tomorrow. We are travelling from Lima to Piura, and right now I am preparing everything for the trip.”
                </blockquote>
              </div>
              <Form.Control
                as="textarea"
                rows={10}
                value={writingDraft}
                className="pc-writing-area"
                placeholder="Write your own paragraph here..."
                aria-label="Present Continuous writing task"
                onChange={(event) => setWritingDraft(event.target.value)}
              />
              <div className="pc-word-count">{wordCount} words</div>
            </div>
            <aside className="pc-writing-guide">
              <span>YOUR ESSAY</span>
              <h3>Write 70–100 words about a busy day or future plan.</h3>
              <p>Include at least:</p>
              <ul>
                <li><i className="fe fe-check-circle" /> one action happening now</li>
                <li><i className="fe fe-check-circle" /> one temporary situation</li>
                <li><i className="fe fe-check-circle" /> one future arrangement</li>
                <li><i className="fe fe-check-circle" /> one changing situation</li>
              </ul>
              <div className={wordCount >= 70 ? 'is-ready' : ''}>
                <strong>{wordCount}/70 minimum words</strong>
                <span>{wordCount >= 70 ? 'Ready to review.' : `${70 - wordCount} more words to reach the minimum.`}</span>
              </div>
            </aside>
          </div>
        </div>
      );
    }

    if (slide.id === 'stative-rule') {
      return (
        <div className="pc-slide-content">
          <div className="pc-stative-rule">
            <span>THE GOLDEN RULE</span>
            <h3>Stative verbs describe a state, condition, sense, opinion, possession, or feeling.</h3>
            <p>They are normally not used in the Present Continuous because they do not describe a physical action in progress.</p>
            <div className="is-correct"><i className="fe fe-check" /><span><small>CORRECT</small>I know the answer.</span></div>
            <div className="is-wrong"><i className="fe fe-x" /><span><small>AVOID</small>I am knowing the answer.</span></div>
          </div>
          <div className="pc-stative-groups">
            {[
              ['Thoughts', 'know, believe, understand, remember'],
              ['Feelings', 'love, hate, want, prefer, need'],
              ['Possession', 'have, own, belong'],
              ['Senses', 'see, hear, taste, smell']
            ].map(([label, verbs]) => (
              <div key={label}><strong>{label}</strong><span>{verbs}</span></div>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'stative-table') {
      const rows = [
        ['THINK', 'opinion', 'I think she is a good actress.', 'She is thinking of buying a car.'],
        ['HAVE', 'possession / action', 'They have a Siamese cat.', 'We are having breakfast now.'],
        ['SEE', 'sense / arrangement', "I see Jack's car in the distance.", 'I am seeing my dentist tomorrow.'],
        ['TASTE', 'state / deliberate action', 'This cake tastes delicious.', 'The chef is tasting the food.'],
        ['LOOK', 'appearance / action', 'You look worried.', 'What are you looking at?'],
        ['WATCH', 'action verb', 'I watch football every weekend.', 'We are watching a football game.'],
        ['HEAR', 'sense with can', 'I can hear a strange noise.', 'Do not normally use hearing for the exact moment.'],
        ['WANT', 'emotion / desire', 'I want a glass of water.', 'Do not use: I am wanting...']
      ];

      return (
        <div className="pc-slide-content">
          <div className="pc-table-wrap">
            <table className="pc-stative-table">
              <thead>
                <tr><th>Verb</th><th>Meaning</th><th>Present Simple state</th><th>Present Continuous action</th></tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (slide.id === 'tense-choice') {
      return (
        <div className="pc-slide-content">
          <div className="pc-exercise-intro">
            <strong>Choose the natural sentence.</strong>
            <span>Decide between Present Simple and Present Continuous, then check the function.</span>
          </div>
          <div className="pc-choice-list">
            {tenseChoiceItems.map((item, index) => {
              const selection = tenseSelections[index];
              return (
                <article key={item.sentence}>
                  <span>{index + 1}</span>
                  <div>
                    <p>{item.sentence}</p>
                    <div className="pc-option-grid">
                      {item.options.map((option, optionIndex) => (
                        <button
                          type="button"
                          key={option}
                          className={[
                            Number(selection) === optionIndex ? 'is-selected' : '',
                            tenseChecked && optionIndex === item.answer ? 'is-correct' : '',
                            tenseChecked && Number(selection) === optionIndex && optionIndex !== item.answer ? 'is-wrong' : ''
                          ].filter(Boolean).join(' ')}
                          onClick={() => {
                            setTenseSelections((current) => ({ ...current, [index]: optionIndex }));
                            setTenseChecked(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {tenseChecked ? <small>{item.function}</small> : null}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="pc-exercise-actions">
            <span>{Object.keys(tenseSelections).length}/{tenseChoiceItems.length} answered</span>
            <Button
              variant="primary"
              disabled={Object.keys(tenseSelections).length !== tenseChoiceItems.length}
              onClick={() => setTenseChecked(true)}
            >
              Check exercise
            </Button>
          </div>
          {tenseChecked ? <div className="pc-result is-perfect"><strong>{tenseScore}/{tenseChoiceItems.length} correct.</strong></div> : null}
        </div>
      );
    }

    if (slide.id === 'multiple-choice') {
      return (
        <div className="pc-slide-content">
          <div className="pc-quiz-list">
            {multipleChoiceItems.map((item, index) => {
              const selection = quizSelections[index];
              return (
                <article key={item.prompt}>
                  <div className="pc-quiz-number">{index + 1}</div>
                  <div>
                    <p>{item.prompt}</p>
                    <div className="pc-quiz-options">
                      {item.options.map((option, optionIndex) => (
                        <button
                          type="button"
                          key={option}
                          className={[
                            Number(selection) === optionIndex ? 'is-selected' : '',
                            quizChecked && optionIndex === item.answer ? 'is-correct' : '',
                            quizChecked && Number(selection) === optionIndex && optionIndex !== item.answer ? 'is-wrong' : ''
                          ].filter(Boolean).join(' ')}
                          onClick={() => {
                            setQuizSelections((current) => ({ ...current, [index]: optionIndex }));
                            setQuizChecked(false);
                          }}
                        >
                          <span>{String.fromCharCode(65 + optionIndex)}</span>{option}
                        </button>
                      ))}
                    </div>
                    {quizChecked ? <small>{item.note}</small> : null}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="pc-exercise-actions">
            <span>{Object.keys(quizSelections).length}/{multipleChoiceItems.length} answered</span>
            <Button
              variant="primary"
              disabled={Object.keys(quizSelections).length !== multipleChoiceItems.length}
              onClick={() => setQuizChecked(true)}
            >
              Check answers
            </Button>
          </div>
          {quizChecked ? <div className="pc-result is-perfect"><strong>{quizScore}/{multipleChoiceItems.length} correct.</strong></div> : null}
        </div>
      );
    }

    return (
      <div className="pc-slide-content">
        <div className="pc-gap-intro">
          <strong>Complete each sentence with Present Simple or Present Progressive.</strong>
          <span>Use the verb in parentheses. Contractions and full negative forms are accepted.</span>
        </div>
        <div className="pc-gap-grid">
          {gapFillItems.map((item, index) => {
            const value = gapAnswers[index] || '';
            const accepted = [item.answer, ...(item.alternatives || [])].map(normalize);
            const isCorrect = accepted.includes(normalize(value));
            return (
              <label className={gapChecked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''} key={item.prompt}>
                <span>{index + 1}</span>
                <p>{item.prompt}</p>
                <Form.Control
                  value={value}
                  placeholder="Type the correct form"
                  onChange={(event) => {
                    setGapAnswers((current) => ({ ...current, [index]: event.target.value }));
                    setGapChecked(false);
                  }}
                />
                {gapChecked ? <small>{isCorrect ? item.function : `Answer: ${item.answer}`}</small> : null}
              </label>
            );
          })}
        </div>
        <div className="pc-exercise-actions">
          <span>{Object.values(gapAnswers).filter((value) => value.trim()).length}/{gapFillItems.length} completed</span>
          <Button
            variant="primary"
            disabled={Object.values(gapAnswers).filter((value) => value.trim()).length !== gapFillItems.length}
            onClick={() => setGapChecked(true)}
          >
            Check all answers
          </Button>
        </div>
        {gapChecked ? <div className="pc-result is-perfect"><strong>{gapScore}/{gapFillItems.length} correct.</strong></div> : null}
      </div>
    );
  };

  return (
    <section className="pc-base-class">
      <div className="pc-class-toolbar">
        <Button variant="link" className="pc-class-exit" onClick={onBack}>
          <i className="fe fe-arrow-left" /> Back to modules
        </Button>
        <div className="pc-class-progress">
          <div><span>BASE CLASS</span><small>Slide {activeSlide + 1} of {slides.length}</small></div>
          <ProgressBar now={progress} />
        </div>
      </div>

      <div className="pc-slide-shell" key={slide.id}>
        <header className="pc-slide-header">
          <div>
            <span>PRESENT CONTINUOUS · BASE CLASS</span>
            <h2>{slide.title}</h2>
          </div>
          <div className="pc-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>

        {renderSlide()}

        <footer className="pc-slide-footer">
          <Button
            variant="light"
            disabled={activeSlide === 0}
            onClick={() => setActiveSlide((current) => Math.max(0, current - 1))}
          >
            <i className="fe fe-arrow-left me-2" /> Previous
          </Button>
          <div className="pc-slide-dots" aria-label="Present Continuous slides">
            {slides.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={index === activeSlide ? 'is-active' : ''}
                aria-label={`Open slide ${index + 1}: ${item.label}`}
                onClick={() => setActiveSlide(index)}
              >
                <span>{index + 1}</span><small>{item.label}</small>
              </button>
            ))}
          </div>
          {activeSlide < slides.length - 1 ? (
            <Button variant="primary" onClick={() => setActiveSlide((current) => Math.min(slides.length - 1, current + 1))}>
              Next <i className="fe fe-arrow-right ms-2" />
            </Button>
          ) : (
            <Button variant="primary" onClick={onComplete}>
              Continue to Exam-Focused Lesson <i className="fe fe-arrow-right ms-2" />
            </Button>
          )}
        </footer>
      </div>
    </section>
  );
};

export default PresentContinuousBaseClass;
