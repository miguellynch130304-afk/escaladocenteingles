import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const functionOrder = ['specific', 'sequence', 'habit', 'historical'];

const functionLabels = {
  specific: 'SPECIFIC TIME IN THE PAST',
  sequence: 'STORYTELLING / SEQUENCE',
  habit: 'PAST HABITS / ROUTINES',
  historical: 'HISTORICAL FACTS'
};

const guidedExamples = [
  { id: 'specific', sentence: 'I visited Paris last year.' },
  { id: 'sequence', sentence: 'He woke up and had breakfast.' },
  { id: 'habit', sentence: 'We played tennis as kids.' },
  { id: 'historical', sentence: 'The Beatles split up in 1970.' }
];

const practiceExamples = [
  { id: 'specific', sentence: 'She took the exam last Friday.' },
  { id: 'sequence', sentence: 'He walked all morning and then had lunch.' },
  { id: 'habit', sentence: 'She watched TV every day as a child.' },
  { id: 'historical', sentence: 'Columbus arrived in 1492.' }
];

const functionExplanations = [
  {
    id: 'specific',
    label: 'SPECIFIC TIME IN THE PAST',
    description: 'A finished action anchored to a precise past moment by expressions such as yesterday, last year, or two months ago.',
    example: 'She graduated two months ago.'
  },
  {
    id: 'sequence',
    label: 'STORYTELLING / SEQUENCE',
    description: 'Two or more completed actions presented in chronological order to narrate what happened.',
    example: 'She packed, paid, and left.'
  },
  {
    id: 'habit',
    label: 'PAST HABITS / ROUTINES',
    description: 'Repeated behavior or a prolonged lifestyle situation that was true before but is no longer true today.',
    example: 'They lived in Rome for years.'
  },
  {
    id: 'historical',
    label: 'HISTORICAL FACTS',
    description: 'An objective, recognized event completed in a known historical period or year.',
    example: 'Columbus arrived in 1492.'
  }
];

const readingChoices = {
  decided: 'Last year, Lucas decided to change his life completely.',
  sequenceOne: 'He resigned from his job, packed his bags, and bought a one-way ticket to Peru.',
  arrived: 'He arrived in Lima on a rainy Tuesday morning.',
  wasFlying: 'While he was flying over the Andes, he watched the clouds.',
  habit: 'When he was a teenager, he dreamed about exploring the world and spent hours reading adventure books every night.',
  historical: 'In 1911, Hiram Bingham documented Machu Picchu for the world.',
  hasVisited: 'Lucas has visited many countries since then.',
  reached: 'Three days ago, he finally reached the top of the mountain.',
  sequenceTwo: 'He sat down, looked at the ruins, and smiled.'
};

const correctReadingChoices = [
  'decided',
  'sequenceOne',
  'arrived',
  'habit',
  'historical',
  'reached',
  'sequenceTwo'
];

const slides = [
  { id: 'guided', label: 'Watch', title: 'Past Simple Functions' },
  { id: 'match', label: 'Connect', title: 'Recognizing Past Simple Functions' },
  { id: 'explanations', label: 'Understand', title: 'Function Explanations' },
  { id: 'syntax', label: 'Build', title: 'Syntax, Order, and Questions' },
  { id: 'reading', label: 'Read', title: 'The Unforgettable Journey' },
  { id: 'breakdown', label: 'Check', title: 'Breakdown of Functions Used' },
  { id: 'writing', label: 'Write', title: 'Writing Exercise' }
];

const buildPath = (start, end) => {
  const distance = Math.max(70, (end.x - start.x) * 0.48);
  return `M ${start.x} ${start.y} C ${start.x + distance} ${start.y}, ${end.x - distance} ${end.y}, ${end.x} ${end.y}`;
};

const PastMatchingBoard = ({ mode = 'automatic', examples, markerId }) => {
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

  return (
    <div>
      <div className={`ps-arrow-board past-arrow-board is-${mode}`} ref={boardRef}>
        <svg className="ps-arrow-layer" aria-hidden="true">
          <defs>
            <marker
              id={markerId}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L8,4 L0,8 z" />
            </marker>
          </defs>
          {connectionEntries.map(([sourceId, targetId], index) => (
            <path
              key={`${sourceId}-${targetId}`}
              d={buildPath(points.sources[sourceId], points.targets[targetId])}
              pathLength="1"
              markerEnd={`url(#${markerId})`}
              className={[
                'ps-connection-line',
                mode === 'automatic' ? 'is-automatic' : '',
                checked && sourceId === targetId ? 'is-correct' : '',
                checked && sourceId !== targetId ? 'is-wrong' : ''
              ].filter(Boolean).join(' ')}
              style={{ '--connection-delay': `${0.4 + index * 0.4}s` }}
            />
          ))}
        </svg>

        <div className="ps-match-column ps-sentence-column">
          <span className="ps-column-label">EXAMPLES</span>
          {examples.map((item, index) => {
            const assignedTarget = connections[item.id];
            return (
              <button
                type="button"
                key={item.id}
                className={[
                  'ps-match-item ps-sentence-item',
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
                aria-label={`${item.sentence}${assignedTarget ? ` Connected to ${functionLabels[assignedTarget]}.` : ''}`}
                style={{ '--item-delay': `${index * 0.12}s` }}
              >
                <span className="ps-example-number">{index + 1}</span>
                <span className="ps-example-copy">
                  <span>{item.sentence}</span>
                  {assignedTarget ? (
                    <small className="ps-linked-function">
                      <i className="fe fe-link-2" /> {functionLabels[assignedTarget]}
                    </small>
                  ) : null}
                </span>
                <span
                  className="ps-connection-dot is-source"
                  ref={(element) => {
                    sourceRefs.current[item.id] = element;
                  }}
                />
              </button>
            );
          })}
        </div>

        <div className="ps-function-panel">
          <span className="ps-column-label">FUNCTIONS</span>
          {functionOrder.map((id, index) => (
            <button
              type="button"
              key={id}
              className={[
                'ps-match-item ps-function-item',
                selectedSource ? 'is-available' : '',
                Object.values(connections).includes(id) ? 'is-used' : ''
              ].filter(Boolean).join(' ')}
              onClick={() => connectTarget(id)}
              disabled={mode === 'automatic'}
              style={{ '--item-delay': `${0.25 + index * 0.12}s` }}
            >
              <span
                className="ps-connection-dot is-target"
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
        <div className="ps-match-controls">
          <div className="ps-match-instruction">
            <i className="fe fe-mouse-pointer" />
            <div>
              <strong>{completedCount}/{examples.length} connections made</strong>
              <span>
                {selectedSource
                  ? 'Now choose its function. Each function can only be used once.'
                  : 'Choose an example first, then its function.'}
              </span>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Button
              variant="light"
              onClick={() => {
                setConnections({});
                setSelectedSource('');
                setChecked(false);
              }}
            >
              Reset arrows
            </Button>
            <Button
              variant="primary"
              disabled={completedCount !== examples.length}
              onClick={() => setChecked(true)}
            >
              Check connections
            </Button>
          </div>
          {checked ? (
            <div className={`ps-match-result ${correctCount === examples.length ? 'is-perfect' : ''}`}>
              <strong>{correctCount}/{examples.length} correct.</strong>
              <span>
                {correctCount === examples.length
                  ? 'Excellent. Every sentence has the right past function.'
                  : 'Review the red arrows and reconnect those examples.'}
              </span>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="ps-auto-caption">
          <span className="ps-live-dot" />
          Watch each sentence connect automatically to its Past Simple function.
        </div>
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
        'ps-reading-choice past-reading-choice',
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

const PastSimpleBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedReading, setSelectedReading] = useState([]);
  const [readingChecked, setReadingChecked] = useState(false);
  const [writingDraft, setWritingDraft] = useState('');

  const slide = slides[activeSlide];
  const slideProgress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const selectedCorrect = selectedReading.filter((id) => correctReadingChoices.includes(id)).length;
  const selectedWrong = selectedReading.filter((id) => !correctReadingChoices.includes(id)).length;
  const wordCount = writingDraft.trim() ? writingDraft.trim().split(/\s+/).length : 0;

  const goToSlide = (index) => {
    setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));
  };

  const toggleReadingChoice = (id) => {
    setSelectedReading((current) => (
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    ));
    setReadingChecked(false);
  };

  const renderSlide = () => {
    if (slide.id === 'guided') {
      return (
        <div className="ps-slide-content">
          <div className="ps-slide-lead">
            <span>WATCH THE PATTERN</span>
            <p>The arrows show four common reasons for using the Past Simple.</p>
          </div>
          <PastMatchingBoard mode="automatic" examples={guidedExamples} markerId="past-auto-arrow" />
        </div>
      );
    }

    if (slide.id === 'match') {
      return (
        <div className="ps-slide-content">
          <div className="ps-slide-lead">
            <span>YOUR TURN</span>
            <p>Build all four connections. A function cannot be assigned to two sentences.</p>
          </div>
          <PastMatchingBoard mode="interactive" examples={practiceExamples} markerId="past-practice-arrow" />
        </div>
      );
    }

    if (slide.id === 'explanations') {
      return (
        <div className="ps-slide-content">
          <div className="ps-explanation-grid past-explanation-grid">
            {functionExplanations.map((item, index) => (
              <article
                className={`ps-explanation-card is-${item.id}`}
                key={item.id}
                style={{ '--item-delay': `${index * 0.12}s` }}
              >
                <span className="ps-explanation-index">0{index + 1}</span>
                <h3>{item.label}</h3>
                <p>{item.description}</p>
                <blockquote>{item.example}</blockquote>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'syntax') {
      return (
        <div className="ps-slide-content">
          <div className="ps-syntax-sentence" aria-label="Past Simple sentence structure">
            {[
              ['subject', 'Balcazar'],
              ['verb', 'governed'],
              ['where', 'at the palace'],
              ['when', 'yesterday'],
              ['why', 'to develop the economy'],
              ['who', 'with his ministers']
            ].map(([role, text], index) => (
              <span
                className={`ps-syntax-token is-${role}`}
                key={role}
                style={{ '--item-delay': `${index * 0.12}s` }}
              >
                <small>{role === 'who' ? 'who - with' : role}</small>
                {text}
              </span>
            ))}
          </div>

          <div className="ps-syntax-template">
            <span>WH WORD</span>
            <i className="fe fe-plus" />
            <strong>DID</strong>
            <i className="fe fe-plus" />
            <span>SUBJECT</span>
            <i className="fe fe-plus" />
            <span>BASE VERB</span>
            <i className="fe fe-help-circle" />
          </div>

          <div className="ps-question-layout">
            <div className="ps-question-list">
              {[
                ['WHERE', 'Where did he govern?'],
                ['WHEN', 'When did he govern?'],
                ['WHY', 'Why did he govern?'],
                ['WHO - WITH', 'Who did he govern with?'],
                ['WHAT', 'What did he do?']
              ].map(([label, question], index) => (
                <div className="ps-question-row" key={label} style={{ '--item-delay': `${0.3 + index * 0.1}s` }}>
                  <span>{label}</span>
                  <p>{question}</p>
                </div>
              ))}
            </div>
            <aside className="ps-auxiliary-card past-auxiliary-card">
              <span>PAST AUXILIARY</span>
              <strong>DID</strong>
              <p>After <b>did</b>, the main verb returns to its base form: <b>did govern</b>, not did governed.</p>
              <div>
                <small>SUBJECT QUESTION</small>
                <b>Who governed?</b>
                <em>No auxiliary is needed when who is the subject.</em>
              </div>
              <div>
                <small>SHORT ANSWER</small>
                <b>Did Balcazar govern? Yes, he did.</b>
              </div>
            </aside>
          </div>
        </div>
      );
    }

    if (slide.id === 'reading') {
      return (
        <div className="ps-slide-content">
          <div className="ps-reading-instruction">
            <i className="fe fe-search" />
            <div>
              <strong>Find exactly seven Past Simple sentences.</strong>
              <span>Two sentences use other tenses. Select only the finished past actions.</span>
            </div>
          </div>
          <div className="ps-reading-steps" aria-label="Exercise instructions">
            <span><b>1</b> Read the whole journey</span>
            <span><b>2</b> Select exactly 7 sentences</span>
            <span><b>3</b> Check your choices</span>
          </div>
          <article className="ps-reading-paper past-reading-paper">
            <p>
              <ReadingChoice id="decided" selected={selectedReading.includes('decided')} checked={readingChecked} onToggle={toggleReadingChoice} />
              {' '}<ReadingChoice id="sequenceOne" selected={selectedReading.includes('sequenceOne')} checked={readingChecked} onToggle={toggleReadingChoice} />
              {' '}<ReadingChoice id="arrived" selected={selectedReading.includes('arrived')} checked={readingChecked} onToggle={toggleReadingChoice} />
            </p>
            <p>
              <ReadingChoice id="wasFlying" selected={selectedReading.includes('wasFlying')} checked={readingChecked} onToggle={toggleReadingChoice} />
              {' '}<ReadingChoice id="habit" selected={selectedReading.includes('habit')} checked={readingChecked} onToggle={toggleReadingChoice} />
            </p>
            <p>
              <ReadingChoice id="historical" selected={selectedReading.includes('historical')} checked={readingChecked} onToggle={toggleReadingChoice} />
              {' '}<ReadingChoice id="hasVisited" selected={selectedReading.includes('hasVisited')} checked={readingChecked} onToggle={toggleReadingChoice} />
              {' '}<ReadingChoice id="reached" selected={selectedReading.includes('reached')} checked={readingChecked} onToggle={toggleReadingChoice} />
              {' '}<ReadingChoice id="sequenceTwo" selected={selectedReading.includes('sequenceTwo')} checked={readingChecked} onToggle={toggleReadingChoice} />
            </p>
          </article>
          <div className="ps-reading-actions">
            <span>
              <strong>{selectedReading.length}/7</strong> target sentences selected
              {selectedReading.length > 7 ? ' - remove extra choices' : ''}
            </span>
            <Button
              variant="primary"
              disabled={selectedReading.length !== 7}
              onClick={() => setReadingChecked(true)}
            >
              Check my choices
            </Button>
          </div>
          {readingChecked ? (
            <div className={`ps-reading-result ${selectedCorrect === 7 ? 'is-perfect' : ''}`}>
              <strong>{selectedCorrect}/7 correct Past Simple sentences.</strong>
              <span>
                {selectedCorrect === 7
                  ? 'Excellent. Continue to see how the functions work in the story.'
                  : `${selectedWrong} selected sentence${selectedWrong === 1 ? ' uses' : 's use'} another tense.`}
              </span>
            </div>
          ) : null}
        </div>
      );
    }

    if (slide.id === 'breakdown') {
      return (
        <div className="ps-slide-content">
          <div className="past-breakdown-sections">
            {[
              {
                label: 'Specific Time in the Past',
                note: 'Finished events anchored by last year, Tuesday morning, and three days ago.',
                examples: [
                  'Lucas decided to change his life completely last year.',
                  'He arrived in Lima on a rainy Tuesday morning.',
                  'Three days ago, he finally reached the top of the mountain.'
                ]
              },
              {
                label: 'Storytelling / Sequence',
                note: 'Completed actions move the narrative forward in chronological order.',
                examples: [
                  'He resigned from his job, packed his bags, and bought a one-way ticket.',
                  'He sat down, looked at the ruins, and smiled.'
                ]
              },
              {
                label: 'Past Habits / Routines',
                note: 'These repeated experiences belonged to Lucas as a teenager.',
                examples: [
                  'He dreamed about exploring the world.',
                  'He spent hours reading adventure books every night.'
                ]
              },
              {
                label: 'Historical Facts',
                note: 'The date identifies a documented event in history.',
                examples: ['In 1911, Hiram Bingham documented Machu Picchu for the world.']
              }
            ].map((section, index) => (
              <article key={section.label} style={{ '--item-delay': `${index * 0.12}s` }}>
                <span>{index + 1}</span>
                <div>
                  <h3>{section.label}</h3>
                  {section.examples.map((example) => <p key={example}>{example}</p>)}
                  <small>{section.note}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="ps-slide-content">
        <div className="ps-writing-layout">
          <div>
            <div className="ps-writing-model past-writing-model">
              <span>STORY STARTER</span>
              <blockquote>
                “The clock struck midnight. Suddenly, my phone rang and I woke up with a jump. I looked at the screen and saw an unknown number...”
              </blockquote>
            </div>
            <Form.Control
              as="textarea"
              rows={10}
              className="ps-writing-area"
              value={writingDraft}
              placeholder="Continue the story in the Past Simple..."
              aria-label="Past Simple writing exercise"
              onChange={(event) => setWritingDraft(event.target.value)}
            />
            <div className="ps-writing-counter">{wordCount} words</div>
          </div>
          <aside className="ps-writing-guide past-writing-guide">
            <span>YOUR CHALLENGE</span>
            <h3>Continue the story in 80-120 words.</h3>
            <p>Create a clear sequence of finished past events. Include:</p>
            <ul>
              <li><i className="fe fe-check-circle" /> a specific past time <small>(last night, two hours ago)</small></li>
              <li><i className="fe fe-check-circle" /> at least four Past Simple verbs</li>
              <li><i className="fe fe-check-circle" /> one sequence connector <small>(then, suddenly, after that)</small></li>
              <li><i className="fe fe-check-circle" /> one irregular verb <small>(saw, went, took, found)</small></li>
              <li><i className="fe fe-check-circle" /> a clear ending</li>
            </ul>
            <div className={wordCount >= 80 ? 'is-ready' : ''}>
              <strong>{wordCount}/80 minimum words</strong>
              <span>
                {wordCount >= 80
                  ? 'Your story is ready to review.'
                  : `${Math.max(0, 80 - wordCount)} more words to reach the minimum.`}
              </span>
            </div>
          </aside>
        </div>
      </div>
    );
  };

  return (
    <section className="ps-base-class past-simple-class">
      <div className="ps-class-toolbar">
        <Button variant="link" className="ps-class-exit" onClick={onBack}>
          <i className="fe fe-arrow-left" /> Back to modules
        </Button>
        <div className="ps-class-progress">
          <div>
            <span>BASE CLASS</span>
            <small>Slide {activeSlide + 1} of {slides.length}</small>
          </div>
          <ProgressBar now={slideProgress} />
        </div>
      </div>

      <div className="ps-slide-shell" key={slide.id}>
        <header className="ps-slide-header">
          <div>
            <span>PAST SIMPLE - BASE CLASS</span>
            <h2>{slide.title}</h2>
          </div>
          <div className="ps-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>

        {renderSlide()}

        <footer className="ps-slide-footer">
          <Button
            variant="light"
            onClick={() => goToSlide(activeSlide - 1)}
            disabled={activeSlide === 0}
          >
            <i className="fe fe-arrow-left me-2" /> Previous
          </Button>
          <div className="ps-slide-dots" aria-label="Past Simple base class slides">
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

export default PastSimpleBaseClass;
