import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const functionOrder = ['continuation', 'recent', 'nonspecific', 'specificPast', 'relevant'];

const functionLabels = {
  continuation: 'PAST TO PRESENT',
  recent: 'RECENTLY FINISHED ACTION',
  nonspecific: 'NON-SPECIFIC TIME IN THE PAST',
  specificPast: 'SPECIFIC TIME IN THE PAST',
  relevant: 'RELEVANT EVENT'
};

const guidedExamples = [
  { id: 'continuation', sentence: 'I have retired since 2023.' },
  { id: 'recent', sentence: 'I have just finished the class.' },
  { id: 'nonspecific', sentence: 'He has travelled to the U.S. in the past.' },
  { id: 'specificPast', sentence: 'We travelled to the U.S. in 2002.' },
  { id: 'relevant', sentence: 'Spain has won the World Cup.' }
];

const practiceExamples = [
  { id: 'continuation', sentence: 'She has worked here since Monday.' },
  { id: 'recent', sentence: 'They have already submitted the report.' },
  { id: 'nonspecific', sentence: 'Have you ever ridden a bicycle?' },
  { id: 'specificPast', sentence: 'I rode a bicycle last summer.' },
  { id: 'relevant', sentence: 'Our team has improved a lot.' }
];

const formulaRows = [
  {
    type: 'Affirmative',
    structure: 'Subject + have / has + past participle',
    example: 'They have finished.'
  },
  {
    type: 'Negative',
    structure: 'Subject + have / has + not + past participle',
    example: "He hasn't called."
  },
  {
    type: 'Question',
    structure: 'Have / Has + subject + past participle?',
    example: 'Have you seen it?'
  }
];

const functionExplanations = [
  {
    id: 'continuation',
    label: 'PAST TO PRESENT',
    description: 'The action or state started in the past and continues now. Since and for are common markers.',
    example: 'I have retired since 2023.'
  },
  {
    id: 'recent',
    label: 'RECENTLY FINISHED ACTION',
    description: 'The action finished very recently and the result still matters. Just is a strong signal.',
    example: 'I have just finished the class.'
  },
  {
    id: 'nonspecific',
    label: 'NON-SPECIFIC TIME IN THE PAST',
    description: 'The experience happened before now, but the exact time is not important.',
    example: 'Have you ever ridden a bicycle?'
  },
  {
    id: 'specificPast',
    label: 'SPECIFIC TIME IN THE PAST',
    description: 'A finished past time such as yesterday, last summer, or in 2002 needs the Past Simple.',
    example: 'I rode a bicycle last summer.'
  },
  {
    id: 'relevant',
    label: 'RELEVANT EVENT',
    description: 'A past event is connected to the present because its result, news value, or importance is current.',
    example: 'Our team has improved a lot.'
  }
];

const questionExamples = [
  {
    base: 'I have retired since 2023.',
    yesNo: 'Have you retired yet?',
    wh: 'When did you retire from professional sports?'
  },
  {
    base: 'I have just finished the class.',
    yesNo: 'Have you just finished the class?',
    wh: 'What have you just finished?'
  },
  {
    base: 'He has travelled to the U.S. in the past.',
    yesNo: 'Has he travelled by himself before?',
    wh: 'Where has he travelled in the past?'
  },
  {
    base: 'We travelled to the U.S. in 2002.',
    yesNo: 'Did you travel to the U.S. in 2002?',
    wh: 'When did you travel to the U.S.?'
  },
  {
    base: 'Spain has won the World Cup.',
    yesNo: 'Has Spain won an international championship?',
    wh: 'What has Spain won?'
  }
];

const completionItems = [
  {
    prompt: "Ann's hair was dirty. Now it's clean. (wash)",
    answer: 'Ann has washed her hair',
    functionLabel: 'recent result'
  },
  {
    prompt: 'Tom was 80 kg. Now he is 70 kg. (lose weight)',
    answer: 'Tom has lost weight',
    functionLabel: 'present result'
  },
  {
    prompt: "Bill played football yesterday. Now he can't walk. (break)",
    answer: 'Bill has broken his leg',
    functionLabel: 'present consequence'
  },
  {
    prompt: 'My sister is looking for her pen. (lose)',
    answer: 'My sister has lost her pen',
    functionLabel: 'unfinished result'
  },
  {
    prompt: 'Mary is on holiday in France. (go)',
    answer: 'Mary has gone to France',
    functionLabel: 'current location/result'
  },
  {
    prompt: "Mr. Hill was in Canada last week. He's back in London now. (be)",
    answer: 'Mr. Hill has been to Canada',
    functionLabel: 'life experience'
  }
];

const adverbItems = [
  {
    prompt: 'I have not finished my homework ________.',
    answer: 'yet',
    explanation: 'Use yet in negatives for an unfinished action.'
  },
  {
    prompt: 'I have ________ finished my homework.',
    answer: 'just',
    explanation: 'Use just for a recently finished action.'
  },
  {
    prompt: 'I have finished my homework ________.',
    answer: 'already',
    explanation: 'Use already when the action is complete earlier than expected.'
  },
  {
    prompt: 'She has ________ finished her homework.',
    answer: 'already',
    explanation: 'Already can go before the past participle.'
  },
  {
    prompt: 'Have you finished your homework ________?',
    answer: 'yet',
    explanation: 'Use yet in questions to ask about completion.'
  },
  {
    prompt: 'Have you ________ finished your homework?',
    answer: 'already',
    explanation: 'Use already in questions when completion may be surprising.'
  }
];

const slides = [
  { id: 'formula', label: 'Form', title: 'Present Perfect Formula' },
  { id: 'guided', label: 'Watch', title: 'Present Perfect vs Past Tense' },
  { id: 'match', label: 'Connect', title: 'Identify the Function' },
  { id: 'syntax', label: 'Ask', title: 'Syntax and Question Formulation' },
  { id: 'complete', label: 'Complete', title: 'Complete the Sentences and Find the Functions' },
  { id: 'ever', label: 'Contrast', title: 'Non-Specific vs Specific Time' },
  { id: 'adverbs', label: 'Adverbs', title: 'Adverbs of Completion and Present Perfect' },
  { id: 'composition', label: 'Write', title: 'Composition' }
];

const normalize = (value) => value.trim().toLowerCase().replace(/[.?!]/g, '').replace(/\s+/g, ' ');

const buildPath = (start, end) => {
  const distance = Math.max(70, (end.x - start.x) * 0.46);
  return `M ${start.x} ${start.y} C ${start.x + distance} ${start.y}, ${end.x - distance} ${end.y}, ${end.x} ${end.y}`;
};

const PresentPerfectMatchingBoard = ({ mode = 'automatic', examples, markerId }) => {
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
      <div className={`pp-arrow-board is-${mode}`} ref={boardRef}>
        <svg className="pp-arrow-layer" aria-hidden="true">
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
                  'pp-connection-line',
                  mode === 'automatic' ? 'is-automatic' : '',
                  checked && isCorrect ? 'is-correct' : '',
                  checked && !isCorrect ? 'is-wrong' : ''
                ].filter(Boolean).join(' ')}
                style={{ '--connection-delay': `${0.35 + index * 0.28}s` }}
              />
            );
          })}
        </svg>

        <div className="pp-match-column">
          <span className="pp-column-label">EXAMPLES</span>
          {examples.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={[
                'pp-match-item pp-sentence-item',
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
              <span className="pp-example-number">{index + 1}</span>
              <span>{item.sentence}</span>
              <span
                className="pp-connection-dot is-source"
                ref={(element) => {
                  sourceRefs.current[item.id] = element;
                }}
              />
            </button>
          ))}
        </div>

        <div className="pp-function-panel">
          <span className="pp-column-label">FUNCTIONS</span>
          {functionOrder.map((id, index) => {
            const isUsed = Object.values(connections).includes(id);
            return (
              <button
                type="button"
                key={id}
                className={[
                  'pp-match-item pp-function-item',
                  mode === 'interactive' && selectedSource ? 'is-available' : '',
                  isUsed ? 'is-used' : ''
                ].filter(Boolean).join(' ')}
                style={{ '--item-delay': `${0.12 + index * 0.08}s` }}
                disabled={mode !== 'interactive'}
                onClick={() => connectTarget(id)}
              >
                <span
                  className="pp-connection-dot is-target"
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
        <div className="pp-match-controls">
          <span><strong>{completedCount}/5</strong> connections built</span>
          <div>
            <Button variant="outline-secondary" size="sm" onClick={() => { setConnections({}); setSelectedSource(''); setChecked(false); }}>
              Reset
            </Button>
            <Button variant="primary" size="sm" disabled={completedCount !== examples.length} onClick={() => setChecked(true)}>
              Check
            </Button>
          </div>
          {checked ? (
            <div className={`pp-result ${correctCount === examples.length ? 'is-perfect' : ''}`}>
              <strong>{correctCount}/5 correct.</strong>
              <span>{correctCount === examples.length ? 'Excellent. You identified every function.' : 'Review the function labels and try again.'}</span>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="pp-auto-caption">Notice the key difference: specific finished time normally uses Past Simple.</div>
      )}
    </div>
  );
};

const PresentPerfectBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [completionAnswers, setCompletionAnswers] = useState({});
  const [completionChecked, setCompletionChecked] = useState(false);
  const [adverbAnswers, setAdverbAnswers] = useState({});
  const [adverbChecked, setAdverbChecked] = useState(false);
  const [writingDraft, setWritingDraft] = useState('');

  const slide = slides[activeSlide];
  const slideProgress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const completionScore = completionItems.filter((item, index) => normalize(completionAnswers[index] || '') === normalize(item.answer)).length;
  const adverbScore = adverbItems.filter((item, index) => normalize(adverbAnswers[index] || '') === normalize(item.answer)).length;
  const wordCount = writingDraft.trim() ? writingDraft.trim().split(/\s+/).length : 0;

  const goToSlide = (index) => {
    setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));
  };

  const renderSlide = () => {
    if (slide.id === 'formula') {
      return (
        <div className="pc-slide-content">
          <div className="pp-title-card">
            <span>PRESENT PERFECT FORMULA</span>
            <p>Use <b>have / has</b> plus the <b>past participle</b> when the past action connects to now.</p>
          </div>
          <div className="pp-formula-table">
            {formulaRows.map((row) => (
              <article key={row.type}>
                <strong>{row.type}</strong>
                <span>{row.structure}</span>
                <em>{row.example}</em>
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
            <p>The arrows compare Present Perfect functions with one Past Simple contrast.</p>
          </div>
          <PresentPerfectMatchingBoard mode="automatic" examples={guidedExamples} markerId="pp-guided-arrow" />
        </div>
      );
    }

    if (slide.id === 'match') {
      return (
        <div className="pc-slide-content">
          <div className="pc-lead">
            <span>YOUR TURN</span>
            <p>Connect each sentence to only one function. Watch the time marker carefully.</p>
          </div>
          <PresentPerfectMatchingBoard mode="interactive" examples={practiceExamples} markerId="pp-practice-arrow" />
        </div>
      );
    }

    if (slide.id === 'syntax') {
      return (
        <div className="pc-slide-content">
          <div className="pp-syntax-template">
            <span>HAVE / HAS</span>
            <i className="fe fe-plus" />
            <span>SUBJECT</span>
            <i className="fe fe-plus" />
            <span>PAST PARTICIPLE</span>
            <i className="fe fe-help-circle" />
          </div>
          <div className="pp-question-list">
            {questionExamples.map((item, index) => (
              <article key={item.base} style={{ '--item-delay': `${index * 0.1}s` }}>
                <span>{index + 1}</span>
                <div>
                  <strong>{item.base}</strong>
                  <p><b>Question:</b> {item.yesNo}</p>
                  <p><b>Alternative:</b> {item.wh}</p>
                </div>
              </article>
            ))}
          </div>
          <aside className="pp-question-note">
            <strong>WH questions and yes/no questions</strong>
            <span>Use <b>Have/Has</b> for Present Perfect questions. Use <b>Did</b> when the time is specific and finished.</span>
          </aside>
        </div>
      );
    }

    if (slide.id === 'complete') {
      return (
        <div className="pc-slide-content">
          <div className="pc-gap-intro">
            <span>COMPLETE THE SENTENCES</span>
            <p>Write a suitable Present Perfect sentence and identify the result or function.</p>
          </div>
          <div className="pp-completion-grid">
            {completionItems.map((item, index) => {
              const currentAnswer = completionAnswers[index] || '';
              const isCorrect = normalize(currentAnswer) === normalize(item.answer);
              return (
                <article key={item.prompt} className={completionChecked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
                  <label>{item.prompt}</label>
                  <Form.Control
                    value={currentAnswer}
                    placeholder="Type the full sentence"
                    onChange={(event) => {
                      setCompletionAnswers((current) => ({ ...current, [index]: event.target.value }));
                      setCompletionChecked(false);
                    }}
                  />
                  <small>{completionChecked ? `${item.answer}. Function: ${item.functionLabel}.` : item.functionLabel}</small>
                </article>
              );
            })}
          </div>
          <div className="pc-exercise-actions">
            <Button variant="primary" onClick={() => setCompletionChecked(true)}>Check</Button>
            {completionChecked ? <div className={`pp-result ${completionScore === completionItems.length ? 'is-perfect' : ''}`}><strong>{completionScore}/{completionItems.length} correct.</strong></div> : null}
          </div>
        </div>
      );
    }

    if (slide.id === 'ever') {
      return (
        <div className="pc-slide-content">
          <div className="pp-contrast-panel">
            <div>
              <span>NON-SPECIFIC</span>
              <h3>Have you ever ridden a bicycle?</h3>
              <p>Yes, I have. / No, I have not. / No, I have never.</p>
              <strong>Ride - rode - ridden</strong>
            </div>
            <div>
              <span>SPECIFIC</span>
              <h3>When did you ride a bicycle?</h3>
              <p>I rode a bicycle last summer.</p>
              <strong>Past Simple is required with a finished time.</strong>
            </div>
          </div>
          <div className="pp-rule-strip">
            <b>Present Perfect</b> for non-specific experience.
            <i className="fe fe-arrow-right" />
            <b>Past Simple</b> for a specific finished time.
          </div>
        </div>
      );
    }

    if (slide.id === 'adverbs') {
      return (
        <div className="pc-slide-content">
          <div className="pc-gap-intro">
            <span>YET / ALREADY / JUST</span>
            <p>Complete each sentence with the correct adverb of completion.</p>
          </div>
          <div className="pp-adverb-layout">
            <div className="pp-adverb-bank">
              <strong>Options</strong>
              <span>yet</span>
              <span>already</span>
              <span>just</span>
            </div>
            <div className="pp-adverb-list">
              {adverbItems.map((item, index) => {
                const currentAnswer = adverbAnswers[index] || '';
                const isCorrect = normalize(currentAnswer) === normalize(item.answer);
                return (
                  <article key={item.prompt} className={adverbChecked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
                    <label>{item.prompt}</label>
                    <Form.Control
                      value={currentAnswer}
                      placeholder="yet / already / just"
                      onChange={(event) => {
                        setAdverbAnswers((current) => ({ ...current, [index]: event.target.value }));
                        setAdverbChecked(false);
                      }}
                    />
                    {adverbChecked ? <small>{item.explanation}</small> : null}
                  </article>
                );
              })}
            </div>
          </div>
          <div className="pc-exercise-actions">
            <Button variant="primary" onClick={() => setAdverbChecked(true)}>Check</Button>
            {adverbChecked ? <div className={`pp-result ${adverbScore === adverbItems.length ? 'is-perfect' : ''}`}><strong>{adverbScore}/{adverbItems.length} correct.</strong></div> : null}
          </div>
        </div>
      );
    }

    return (
      <div className="pc-slide-content">
        <div className="pc-writing-layout">
          <div>
            <div className="pc-writing-model pp-writing-model">
              <span>MODEL OPENING</span>
              <blockquote>
                My mother has just prepared breakfast for everybody at home. She has cooked for us since I was a child, and my family likes to travel.
              </blockquote>
            </div>
            <Form.Control
              as="textarea"
              rows={10}
              className="pc-writing-area"
              value={writingDraft}
              placeholder="Write your own paragraph here..."
              aria-label="Present Perfect composition"
              onChange={(event) => setWritingDraft(event.target.value)}
            />
            <div className="pc-word-count">{wordCount} words</div>
          </div>
          <aside className="pc-writing-guide pp-writing-guide">
            <span>YOUR COMPOSITION</span>
            <h3>Write 70-100 words using Present Perfect and Past Simple.</h3>
            <p>Include at least:</p>
            <ul>
              <li><i className="fe fe-check-circle" /> one recent finished action <small>(just)</small></li>
              <li><i className="fe fe-check-circle" /> one unfinished action <small>(yet)</small></li>
              <li><i className="fe fe-check-circle" /> one completed action <small>(already)</small></li>
              <li><i className="fe fe-check-circle" /> one past-to-present idea <small>(since / for)</small></li>
              <li><i className="fe fe-check-circle" /> one specific Past Simple time</li>
            </ul>
            <div className={wordCount >= 70 ? 'is-ready' : ''}>
              <strong>{wordCount}/70 minimum words</strong>
              <span>{wordCount >= 70 ? 'Your paragraph is ready to review.' : `${Math.max(0, 70 - wordCount)} more words to reach the minimum.`}</span>
            </div>
          </aside>
        </div>
      </div>
    );
  };

  return (
    <section className="pc-base-class pp-base-class">
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
            <span>PRESENT PERFECT - BASE CLASS</span>
            <h2>{slide.title}</h2>
          </div>
          <div className="pc-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>

        {renderSlide()}

        <footer className="pc-slide-footer">
          <Button variant="light" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}>
            <i className="fe fe-arrow-left me-2" /> Previous
          </Button>
          <div className="pc-slide-dots" aria-label="Present Perfect base class slides">
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

export default PresentPerfectBaseClass;
