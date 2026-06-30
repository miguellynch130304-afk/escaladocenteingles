import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const functionOrder = ['pcPlan', 'goingPlan', 'goingPrediction', 'willDecision', 'willPromise', 'scheduled'];

const functionLabels = {
  pcPlan: 'PRESENT CONTINUOUS - FUTURE PLAN',
  goingPlan: 'BE GOING TO - INTENTION / PLAN',
  goingPrediction: 'BE GOING TO - OBVIOUS PREDICTION',
  willDecision: 'WILL - DECISION AT THE MOMENT',
  willPromise: 'WILL - PROMISE / PREDICTION',
  scheduled: 'PRESENT SIMPLE - SCHEDULED EVENT'
};

const guidedExamples = [
  { id: 'pcPlan', sentence: 'I am travelling to Cuzco tomorrow.' },
  { id: 'goingPlan', sentence: 'I am going to travel to Cuzco next week.' },
  { id: 'goingPrediction', sentence: 'There are clouds in the sky. It is going to rain.' },
  { id: 'willDecision', sentence: 'Will you wear a dress or a blouse?' },
  { id: 'willPromise', sentence: 'Odebrecht will pay all damages.' },
  { id: 'scheduled', sentence: 'My plane takes off at 4 p.m.' }
];

const practiceExamples = [
  { id: 'pcPlan', sentence: 'I am wearing my night dress tonight.' },
  { id: 'goingPlan', sentence: 'I am going to wear my night dress tonight.' },
  { id: 'goingPrediction', sentence: 'Look at those black clouds. It is going to rain.' },
  { id: 'willDecision', sentence: 'I will give you some tokens.' },
  { id: 'willPromise', sentence: 'I will help you with those matches.' },
  { id: 'scheduled', sentence: 'I travel to Cuzco at 2 p.m.' }
];

const formCards = [
  {
    label: 'WILL',
    use: 'Decision at the moment, prediction, or promise',
    structure: 'will + base verb',
    example: 'I will give you some money.'
  },
  {
    label: 'BE GOING TO',
    use: 'Future intention, plan, or obvious prediction',
    structure: 'am / is / are + going to + verb',
    example: 'I am going to travel next week.'
  },
  {
    label: 'PRESENT CONTINUOUS',
    use: 'Future plan or formal arrangement',
    structure: 'am / is / are + verb-ing',
    example: 'I am travelling tomorrow.'
  },
  {
    label: 'PRESENT SIMPLE',
    use: 'Scheduled event',
    structure: 'base verb / -s',
    example: 'The plane takes off at 4 p.m.'
  }
];

const willExamples = [
  {
    sentence: 'Dina will not go to jail.',
    functionLabel: 'prediction',
    note: 'The speaker predicts what will happen.'
  },
  {
    sentence: 'I will give you the money next week.',
    functionLabel: 'promise',
    note: 'The speaker promises a future action.'
  },
  {
    sentence: 'No, I will take a taxi.',
    functionLabel: 'decision at the moment',
    note: 'The speaker decides while speaking.'
  },
  {
    sentence: 'We will qualify to Canada.',
    functionLabel: 'prediction',
    note: 'The speaker predicts a future result.'
  },
  {
    sentence: 'I am tired. I will go home now.',
    functionLabel: 'decision at the moment',
    note: 'The decision is immediate.'
  }
];

const exerciseItems = [
  {
    prompt: 'What ________ you ________ when you grow up? (do)',
    answer: 'will you do',
    explanation: 'Use will for a general future question.'
  },
  {
    prompt: 'I ________ an acrobat in a circus. (be)',
    answer: 'am going to be',
    explanation: 'Use be going to for an intention or plan.'
  },
  {
    prompt: "I haven't seen him for a long time but I think I ________ him. (recognize)",
    answer: 'will recognize',
    explanation: 'Use will for a prediction or opinion.'
  },
  {
    prompt: 'I need some tokens to telephone my friend. I ________ you some. (give)',
    answer: 'will give',
    explanation: 'Use will for a decision made at the moment.'
  },
  {
    prompt: 'I got the plane tickets. I ________ on Sunday. (fly)',
    answer: 'am flying',
    alternatives: ['am going to fly'],
    explanation: 'Present Continuous is natural for an arranged future plan.'
  },
  {
    prompt: 'Have you got any plans for the summer? Yes, we ________ to Italy in June. (go)',
    answer: 'are going',
    alternatives: ['are going to go'],
    explanation: 'Use Present Continuous or going to for a planned trip.'
  },
  {
    prompt: "Don't play with those matches; you ________ yourself. (burn)",
    answer: 'are going to burn',
    explanation: 'Use be going to for an obvious prediction.'
  },
  {
    prompt: "Whose is that night dress? It's mine. I ________ it at John's graduation party. (wear)",
    answer: 'am wearing',
    alternatives: ['am going to wear'],
    explanation: 'Use Present Continuous for an arrangement.'
  },
  {
    prompt: 'Why did you call your grandma? I ________ her at the weekend. (visit)',
    answer: 'am going to visit',
    alternatives: ['am visiting'],
    explanation: 'Use going to or Present Continuous for an intended visit.'
  },
  {
    prompt: "If your passport isn't valid any more, you ________ abroad this month. (not be able to go)",
    answer: "won't be able to go",
    alternatives: ['will not be able to go'],
    explanation: 'Use will not for a future result.'
  },
  {
    prompt: 'What are you doing with that brush? I ________ my room. (paint)',
    answer: 'am going to paint',
    explanation: 'Use going to when there is present evidence or intention.'
  },
  {
    prompt: 'Why are you wearing your anorak? I ________ out. (go)',
    answer: 'am going',
    alternatives: ['am going to go'],
    explanation: 'The clothing shows an arranged/immediate plan.'
  }
];

const slides = [
  { id: 'forms', label: 'Forms', title: 'Future Forms' },
  { id: 'guided', label: 'Watch', title: 'Recognizing Future Forms' },
  { id: 'match', label: 'Connect', title: 'Build the Connections' },
  { id: 'paragraph', label: 'Essay', title: 'Paragraph + Paragraph = Composition Essay' },
  { id: 'will', label: 'Will', title: 'Future with Will / Will Not' },
  { id: 'composition', label: 'Write', title: 'Composition Essay' },
  { id: 'exercises', label: 'Practice', title: 'Exercises' }
];

const normalize = (value) => value.trim().toLowerCase().replace(/[.?!]/g, '').replace(/\s+/g, ' ');

const buildPath = (start, end) => {
  const distance = Math.max(70, (end.x - start.x) * 0.46);
  return `M ${start.x} ${start.y} C ${start.x + distance} ${start.y}, ${end.x - distance} ${end.y}, ${end.x} ${end.y}`;
};

const FutureMatchingBoard = ({ mode = 'automatic', examples, markerId }) => {
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
  const correctCount = Object.entries(connections).filter(([sourceId, targetId]) => sourceId === targetId).length;

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

  return (
    <div>
      <div className={`ff-arrow-board is-${mode}`} ref={boardRef}>
        <svg className="ff-arrow-layer" aria-hidden="true">
          <defs>
            <marker id={markerId} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
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
                  'ff-connection-line',
                  mode === 'automatic' ? 'is-automatic' : '',
                  checked && isCorrect ? 'is-correct' : '',
                  checked && !isCorrect ? 'is-wrong' : ''
                ].filter(Boolean).join(' ')}
                style={{ '--connection-delay': `${0.3 + index * 0.24}s` }}
              />
            );
          })}
        </svg>

        <div className="ff-match-column">
          <span className="ff-column-label">EXAMPLES</span>
          {examples.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={[
                'ff-match-item ff-sentence-item',
                selectedSource === item.id ? 'is-selected' : '',
                connections[item.id] ? 'is-connected' : ''
              ].filter(Boolean).join(' ')}
              style={{ '--item-delay': `${index * 0.08}s` }}
              disabled={mode !== 'interactive'}
              onClick={() => {
                if (mode === 'interactive') {
                  setSelectedSource((current) => (current === item.id ? '' : item.id));
                }
              }}
            >
              <span className="ff-example-number">{index + 1}</span>
              <span>{item.sentence}</span>
              <span
                className="ff-connection-dot is-source"
                ref={(element) => {
                  sourceRefs.current[item.id] = element;
                }}
              />
            </button>
          ))}
        </div>

        <div className="ff-function-panel">
          <span className="ff-column-label">FUNCTIONS</span>
          {functionOrder.map((id, index) => {
            const isUsed = Object.values(connections).includes(id);
            return (
              <button
                type="button"
                key={id}
                className={[
                  'ff-match-item ff-function-item',
                  mode === 'interactive' && selectedSource ? 'is-available' : '',
                  isUsed ? 'is-used' : ''
                ].filter(Boolean).join(' ')}
                style={{ '--item-delay': `${0.12 + index * 0.08}s` }}
                disabled={mode !== 'interactive'}
                onClick={() => connectTarget(id)}
              >
                <span
                  className="ff-connection-dot is-target"
                  ref={(element) => {
                    targetRefs.current[id] = element;
                  }}
                />
                {functionLabels[id]}
              </button>
            );
          })}
        </div>
      </div>

      {mode === 'interactive' ? (
        <div className="ff-match-controls">
          <span><strong>{completedCount}/6</strong> connections built</span>
          <div>
            <Button variant="outline-secondary" size="sm" onClick={() => { setConnections({}); setSelectedSource(''); setChecked(false); }}>
              Reset
            </Button>
            <Button variant="primary" size="sm" disabled={completedCount !== examples.length} onClick={() => setChecked(true)}>
              Check
            </Button>
          </div>
          {checked ? (
            <div className={`ff-result ${correctCount === examples.length ? 'is-perfect' : ''}`}>
              <strong>{correctCount}/6 correct.</strong>
              <span>{correctCount === examples.length ? 'Excellent. Every future form is identified.' : 'Check the time marker and the speaker intention.'}</span>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="ff-auto-caption">Watch how intention, evidence, schedules, and immediate decisions choose different future forms.</div>
      )}
    </div>
  );
};

const FutureFormsBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [exerciseAnswers, setExerciseAnswers] = useState({});
  const [exerciseChecked, setExerciseChecked] = useState(false);
  const [writingDraft, setWritingDraft] = useState('');

  const slide = slides[activeSlide];
  const slideProgress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const wordCount = writingDraft.trim() ? writingDraft.trim().split(/\s+/).length : 0;
  const exerciseScore = exerciseItems.filter((item, index) => {
    const answer = normalize(exerciseAnswers[index] || '');
    return answer === normalize(item.answer) || (item.alternatives || []).some((alt) => answer === normalize(alt));
  }).length;

  const goToSlide = (index) => {
    setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));
  };

  const renderSlide = () => {
    if (slide.id === 'forms') {
      return (
        <div className="pc-slide-content">
          <div className="ff-title-card">
            <span>FUTURE FORMS</span>
            <p>Choose the future form according to the speaker&apos;s intention, evidence, arrangement, or schedule.</p>
          </div>
          <div className="ff-form-grid">
            {formCards.map((card, index) => (
              <article key={card.label} style={{ '--item-delay': `${index * 0.1}s` }}>
                <span>{card.label}</span>
                <h3>{card.use}</h3>
                <p>{card.structure}</p>
                <blockquote>{card.example}</blockquote>
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
            <span>WATCH THE PATTERN</span>
            <p>The arrows show why each sentence uses a different future form.</p>
          </div>
          <FutureMatchingBoard mode="automatic" examples={guidedExamples} markerId="ff-guided-arrow" />
        </div>
      );
    }

    if (slide.id === 'match') {
      return (
        <div className="pc-slide-content">
          <div className="pc-lead">
            <span>YOUR TURN</span>
            <p>Connect each sentence to only one function.</p>
          </div>
          <FutureMatchingBoard mode="interactive" examples={practiceExamples} markerId="ff-practice-arrow" />
        </div>
      );
    }

    if (slide.id === 'paragraph') {
      return (
        <div className="pc-slide-content">
          <div className="ff-composition-board">
            <span>PARAGRAPH + PARAGRAPH = COMPOSITION ESSAY</span>
            <p>
              This week I am completing a Canada visa application online; I will meet with teachers;
              my daughter is going to travel to Chancay; I arrive in Chancay at 2 p.m.
            </p>
            <div>
              <article>
                <strong>This week I am completing a Canada visa application online.</strong>
                <small>Present Continuous - future plan</small>
              </article>
              <article>
                <strong>I will meet with teachers.</strong>
                <small>Will - decision or promise</small>
              </article>
              <article>
                <strong>My daughter is going to travel to Chancay.</strong>
                <small>Be going to - intention</small>
              </article>
              <article>
                <strong>I arrive in Chancay at 2 p.m.</strong>
                <small>Present Simple - scheduled event</small>
              </article>
            </div>
            <aside>
              <b>Comma</b>
              <b>Semicolon</b>
              <b>Colon</b>
              <b>Period</b>
            </aside>
          </div>
        </div>
      );
    }

    if (slide.id === 'will') {
      return (
        <div className="pc-slide-content">
          <div className="ff-will-intro">
            <span>Future with WILL / WILL NOT</span>
            <p><b>Will</b> is common for predictions, promises, and decisions made at the very moment of speaking.</p>
          </div>
          <div className="ff-will-list">
            {willExamples.map((item, index) => (
              <article key={item.sentence} style={{ '--item-delay': `${index * 0.1}s` }}>
                <span>{index + 1}</span>
                <div>
                  <strong>{item.sentence}</strong>
                  <p>{item.note}</p>
                </div>
                <em>{item.functionLabel}</em>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'composition') {
      return (
        <div className="pc-slide-content">
          <div className="pc-writing-layout">
            <div>
              <div className="pc-writing-model ff-writing-model">
                <span>MODEL OPENING</span>
                <blockquote>
                  Odebrecht will not get a new contract in Peru again. It will pay all damages and reparations to the government, and it will read more about that case.
                </blockquote>
              </div>
              <Form.Control
                as="textarea"
                rows={10}
                className="pc-writing-area"
                value={writingDraft}
                placeholder="Write your own future forms paragraph here..."
                aria-label="Future Forms composition"
                onChange={(event) => setWritingDraft(event.target.value)}
              />
              <div className="pc-word-count">{wordCount} words</div>
            </div>
            <aside className="pc-writing-guide ff-writing-guide">
              <span>YOUR ESSAY</span>
              <h3>Write 70-100 words about plans, predictions, promises, and schedules.</h3>
              <p>Include at least:</p>
              <ul>
                <li><i className="fe fe-check-circle" /> one future plan <small>(I am travelling...)</small></li>
                <li><i className="fe fe-check-circle" /> one intention <small>(I am going to...)</small></li>
                <li><i className="fe fe-check-circle" /> one decision or promise <small>(I will...)</small></li>
                <li><i className="fe fe-check-circle" /> one scheduled event <small>(The bus leaves...)</small></li>
                <li><i className="fe fe-check-circle" /> correct punctuation</li>
              </ul>
              <div className={wordCount >= 70 ? 'is-ready' : ''}>
                <strong>{wordCount}/70 minimum words</strong>
                <span>{wordCount >= 70 ? 'Your paragraph is ready to review.' : `${Math.max(0, 70 - wordCount)} more words to reach the minimum.`}</span>
              </div>
            </aside>
          </div>
        </div>
      );
    }

    return (
      <div className="pc-slide-content">
        <div className="pc-gap-intro">
          <span>FILL IN THE BLANKS</span>
          <p>Use the correct future form: will, going to, Present Continuous, or Present Simple.</p>
        </div>
        <div className="ff-exercise-grid">
          {exerciseItems.map((item, index) => {
            const currentAnswer = exerciseAnswers[index] || '';
            const normalizedAnswer = normalize(currentAnswer);
            const isCorrect = normalizedAnswer === normalize(item.answer) || (item.alternatives || []).some((alt) => normalizedAnswer === normalize(alt));
            return (
              <article key={item.prompt} className={exerciseChecked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
                <label>{index + 1}. {item.prompt}</label>
                <Form.Control
                  value={currentAnswer}
                  placeholder="Type the correct future form"
                  onChange={(event) => {
                    setExerciseAnswers((current) => ({ ...current, [index]: event.target.value }));
                    setExerciseChecked(false);
                  }}
                />
                {exerciseChecked ? <small>{item.answer}. {item.explanation}</small> : null}
              </article>
            );
          })}
        </div>
        <div className="pc-exercise-actions">
          <Button variant="primary" onClick={() => setExerciseChecked(true)}>Check</Button>
          {exerciseChecked ? <div className={`ff-result ${exerciseScore === exerciseItems.length ? 'is-perfect' : ''}`}><strong>{exerciseScore}/{exerciseItems.length} correct.</strong></div> : null}
        </div>
      </div>
    );
  };

  return (
    <section className="pc-base-class ff-base-class">
      <div className="pc-class-toolbar">
        <Button variant="link" className="pc-class-exit" onClick={onBack}>
          <i className="fe fe-arrow-left" /> Back to modules
        </Button>
        <div className="pc-class-progress">
          <div>
            <span>BASE CLASS</span>
            <small>Slide {activeSlide + 1} of {slides.length}</small>
          </div>
          <ProgressBar now={slideProgress} />
        </div>
      </div>

      <div className="pc-slide-shell" key={slide.id}>
        <header className="pc-slide-header">
          <div>
            <span>FUTURE FORMS - BASE CLASS</span>
            <h2>{slide.title}</h2>
          </div>
          <div className="pc-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>

        {renderSlide()}

        <footer className="pc-slide-footer">
          <Button variant="light" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}>
            <i className="fe fe-arrow-left me-2" /> Previous
          </Button>
          <div className="pc-slide-dots" aria-label="Future Forms base class slides">
            {slides.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={index === activeSlide ? 'is-active' : ''}
                onClick={() => goToSlide(index)}
                aria-label={`Open slide ${index + 1}: ${item.label}`}
              >
                <span>{index + 1}</span>
                <small>{item.label}</small>
              </button>
            ))}
          </div>
          {activeSlide < slides.length - 1 ? (
            <Button variant="primary" onClick={() => goToSlide(activeSlide + 1)}>
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

export default FutureFormsBaseClass;
