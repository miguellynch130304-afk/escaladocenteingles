import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const functionOrder = ['story', 'schedule', 'truth', 'state', 'habit'];

const functionLabels = {
  habit: 'HABITS / ROUTINES',
  state: 'PERMANENT STATES',
  truth: 'GENERAL TRUTHS',
  schedule: 'SCHEDULED EVENTS',
  story: 'STORYTELLING'
};

const automaticExamples = [
  { id: 'habit', sentence: 'She normally studies at 1 p.m.' },
  { id: 'state', sentence: 'The president lives in Lima.' },
  { id: 'truth', sentence: 'Peru produces pisco.' },
  { id: 'schedule', sentence: 'We take the exam at 3 p.m.' },
  { id: 'story', sentence: 'He shoots, and the fans go crazy!' }
];

const practiceExamples = [
  { id: 'habit', sentence: 'I usually eat lunch at 1 p.m.' },
  { id: 'state', sentence: 'Victor lives in Lima.' },
  { id: 'truth', sentence: 'Bees make honey.' },
  { id: 'schedule', sentence: 'My flight leaves at 4 p.m.' },
  { id: 'story', sentence: 'Messi scores a goal!' }
];

const functionExplanations = [
  {
    id: 'habit',
    label: 'HABITS',
    description: 'Regular routines or repetitive actions. Frequency words show how often the action happens.',
    example: 'She usually studies after lunch.'
  },
  {
    id: 'state',
    label: 'PERMANENT STATES',
    description: 'Long-term situations that are stable and do not change quickly.',
    example: 'Victor lives in Lima.'
  },
  {
    id: 'truth',
    label: 'GENERAL TRUTHS',
    description: 'Scientific facts, laws of nature, and universal truths.',
    example: 'Bees make honey.'
  },
  {
    id: 'schedule',
    label: 'SCHEDULED EVENTS',
    description: 'Future events based on official timetables, itineraries, or public schedules.',
    example: 'The flight leaves at 4 p.m.'
  },
  {
    id: 'story',
    label: 'STORYTELLING',
    description: 'Live commentary and dynamic narratives that make an action feel immediate.',
    example: 'Messi scores a goal!'
  }
];

const readingChoices = {
  habit: 'wakes up early and drinks black coffee',
  state: 'lives in London',
  continuous: 'is playing in the final',
  truth: 'Water boils at 100 degrees Celsius',
  temporary: 'is checking her itinerary',
  schedule: 'her train leaves at 11:30 a.m.',
  story: 'The midfielder passes the ball, Smith scores, and the stadium goes wild!'
};

const correctReadingChoices = ['habit', 'state', 'truth', 'schedule', 'story'];

const slides = [
  { id: 'guided-match', label: 'Watch', title: 'Present Simple Functions' },
  { id: 'student-match', label: 'Connect', title: 'Recognizing Present Simple Functions' },
  { id: 'explanations', label: 'Understand', title: 'Function Explanations' },
  { id: 'syntax', label: 'Build', title: 'Syntax, Order, and Questions' },
  { id: 'reading', label: 'Read', title: 'The Match Day Rush' },
  { id: 'breakdown', label: 'Check', title: 'Grammatical Breakdown' },
  { id: 'writing', label: 'Write', title: 'Writing Task' }
];

const buildPath = (start, end) => {
  const distance = Math.max(70, (end.x - start.x) * 0.48);
  return `M ${start.x} ${start.y} C ${start.x + distance} ${start.y}, ${end.x - distance} ${end.y}, ${end.x} ${end.y}`;
};

const ArrowMatchingBoard = ({ mode = 'automatic', examples, markerId }) => {
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

    setConnections((current) => ({ ...current, [selectedSource]: targetId }));
    setSelectedSource('');
    setChecked(false);
  };

  const resetConnections = () => {
    setConnections({});
    setSelectedSource('');
    setChecked(false);
  };

  return (
    <div>
      <div
        className={`ps-arrow-board is-${mode}`}
        ref={boardRef}
      >
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
          {connectionEntries.map(([sourceId, targetId], index) => {
            const isCorrect = sourceId === targetId;
            return (
              <path
                key={`${sourceId}-${targetId}`}
                d={buildPath(points.sources[sourceId], points.targets[targetId])}
                pathLength="1"
                markerEnd={`url(#${markerId})`}
                className={[
                  'ps-connection-line',
                  mode === 'automatic' ? 'is-automatic' : '',
                  checked && isCorrect ? 'is-correct' : '',
                  checked && !isCorrect ? 'is-wrong' : ''
                ].filter(Boolean).join(' ')}
                style={{ '--connection-delay': `${0.45 + index * 0.42}s` }}
              />
            );
          })}
        </svg>

        <div className="ps-match-column ps-sentence-column">
          <span className="ps-column-label">EXAMPLES</span>
          {examples.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={[
                'ps-match-item ps-sentence-item',
                selectedSource === item.id ? 'is-selected' : '',
                connections[item.id] ? 'is-connected' : ''
              ].filter(Boolean).join(' ')}
              onClick={() => {
                if (mode === 'interactive') {
                  setSelectedSource(item.id);
                  setChecked(false);
                }
              }}
              disabled={mode === 'automatic'}
              style={{ '--item-delay': `${index * 0.12}s` }}
            >
              <span className="ps-example-number">{index + 1}</span>
              <span>{item.sentence}</span>
              <span
                className="ps-connection-dot is-source"
                ref={(element) => {
                  sourceRefs.current[item.id] = element;
                }}
              />
            </button>
          ))}
        </div>

        <div className="ps-function-panel">
          <span className="ps-column-label">FUNCTIONS</span>
          {functionOrder.map((id, index) => (
            <button
              type="button"
              key={id}
              className={[
                'ps-match-item ps-function-item',
                selectedSource ? 'is-available' : ''
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
            <span>
              {selectedSource
                ? 'Now select the matching function on the right.'
                : 'Select a sentence point, then select its function.'}
            </span>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Button variant="light" onClick={resetConnections}>Reset arrows</Button>
            <Button
              variant="primary"
              onClick={() => setChecked(true)}
              disabled={completedCount !== examples.length}
            >
              Check connections
            </Button>
          </div>
          {checked ? (
            <div className={`ps-match-result ${correctCount === examples.length ? 'is-perfect' : ''}`}>
              <strong>{correctCount}/{examples.length} correct.</strong>
              <span>
                {correctCount === examples.length
                  ? 'Excellent. Every example is connected to its communicative function.'
                  : 'Review the red arrows and try those connections again.'}
              </span>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="ps-auto-caption">
          <span className="ps-live-dot" />
          Watch each example connect automatically to its communicative function.
        </div>
      )}
    </div>
  );
};

const InlineReadingChoice = ({ id, selected, checked, onToggle }) => {
  const isCorrect = correctReadingChoices.includes(id);
  return (
    <button
      type="button"
      className={[
        'ps-reading-choice',
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

const PresentSimpleBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedReading, setSelectedReading] = useState([]);
  const [readingChecked, setReadingChecked] = useState(false);
  const [writingDraft, setWritingDraft] = useState('');

  const slide = slides[activeSlide];
  const slideProgress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const selectedCorrect = selectedReading.filter((id) => correctReadingChoices.includes(id)).length;
  const selectedWrong = selectedReading.filter((id) => !correctReadingChoices.includes(id)).length;
  const readingScore = Math.max(0, selectedCorrect - selectedWrong);
  const wordCount = writingDraft.trim() ? writingDraft.trim().split(/\s+/).length : 0;

  const toggleReadingChoice = (id) => {
    setSelectedReading((current) => (
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    ));
    setReadingChecked(false);
  };

  const goToSlide = (index) => {
    setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));
  };

  const slideContent = useMemo(() => {
    if (slide.id === 'guided-match') {
      return (
        <div className="ps-slide-content">
          <div className="ps-slide-lead">
            <span>WATCH THE PATTERN</span>
            <p>The arrows reveal why each sentence uses the Present Simple.</p>
          </div>
          <ArrowMatchingBoard
            mode="automatic"
            examples={automaticExamples}
            markerId="ps-auto-arrow"
          />
        </div>
      );
    }

    if (slide.id === 'student-match') {
      return (
        <div className="ps-slide-content">
          <div className="ps-slide-lead">
            <span>YOUR TURN</span>
            <p>Build the five connections yourself. Click one point on the left and one on the right.</p>
          </div>
          <ArrowMatchingBoard
            mode="interactive"
            examples={practiceExamples}
            markerId="ps-student-arrow"
          />
        </div>
      );
    }

    if (slide.id === 'explanations') {
      return (
        <div className="ps-slide-content">
          <div className="ps-explanation-grid">
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
          <div className="ps-syntax-sentence" aria-label="Sentence structure example">
            {[
              ['subject', 'Balcazar'],
              ['verb', 'governs'],
              ['where', 'at the palace'],
              ['when', 'every day'],
              ['why', 'to develop the economy'],
              ['who', 'with his ministers']
            ].map(([role, text], index) => (
              <span
                className={`ps-syntax-token is-${role}`}
                key={role}
                style={{ '--item-delay': `${index * 0.12}s` }}
              >
                <small>{role === 'who' ? 'who · with' : role}</small>
                {text}
              </span>
            ))}
          </div>

          <div className="ps-syntax-template">
            <span>WH WORD</span>
            <i className="fe fe-plus" />
            <strong>DO / DOES</strong>
            <i className="fe fe-plus" />
            <span>SUBJECT</span>
            <i className="fe fe-plus" />
            <span>BASE VERB</span>
            <i className="fe fe-help-circle" />
          </div>

          <div className="ps-question-layout">
            <div className="ps-question-list">
              {[
                ['WHERE', 'Where does he govern?'],
                ['WHEN', 'When does he govern?'],
                ['WHY', 'Why does he govern?'],
                ['WHO · WITH', 'Who does he govern with?'],
                ['WHAT', 'What does he do?']
              ].map(([label, question], index) => (
                <div className="ps-question-row" key={label} style={{ '--item-delay': `${0.35 + index * 0.1}s` }}>
                  <span>{label}</span>
                  <p>{question}</p>
                </div>
              ))}
            </div>
            <aside className="ps-auxiliary-card">
              <span>AUXILIARY</span>
              <strong>DO</strong>
              <strong>DOES</strong>
              <p>Use <b>does</b> with he, she, and it. The main verb returns to its base form.</p>
              <div>
                <small>SUBJECT QUESTION</small>
                <b>Who governs?</b>
                <em>No auxiliary is needed when who is the subject.</em>
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
              <strong>Find five key Present Simple examples.</strong>
              <span>Click the verb groups that represent the five functions from this lesson.</span>
            </div>
          </div>
          <article className="ps-reading-paper">
            <p>
              Every Saturday, Elena <InlineReadingChoice id="habit" selected={selectedReading.includes('habit')} checked={readingChecked} onToggle={toggleReadingChoice} />.
              This routine keeps her energized for the busy day ahead. She <InlineReadingChoice id="state" selected={selectedReading.includes('state')} checked={readingChecked} onToggle={toggleReadingChoice} /> because she loves football.
            </p>
            <p>
              Today her favorite team <InlineReadingChoice id="continuous" selected={selectedReading.includes('continuous')} checked={readingChecked} onToggle={toggleReadingChoice} />.
              <InlineReadingChoice id="truth" selected={selectedReading.includes('truth')} checked={readingChecked} onToggle={toggleReadingChoice} />, but Elena feels even hotter with excitement.
              She <InlineReadingChoice id="temporary" selected={selectedReading.includes('temporary')} checked={readingChecked} onToggle={toggleReadingChoice} /> because <InlineReadingChoice id="schedule" selected={selectedReading.includes('schedule')} checked={readingChecked} onToggle={toggleReadingChoice} />.
            </p>
            <p>
              At the stadium, the commentator shouts: “<InlineReadingChoice id="story" selected={selectedReading.includes('story')} checked={readingChecked} onToggle={toggleReadingChoice} />”
            </p>
          </article>
          <div className="ps-reading-actions">
            <span>{selectedReading.length} phrase{selectedReading.length === 1 ? '' : 's'} selected</span>
            <Button
              variant="primary"
              disabled={!selectedReading.length}
              onClick={() => setReadingChecked(true)}
            >
              Check my choices
            </Button>
          </div>
          {readingChecked ? (
            <div className={`ps-reading-result ${readingScore === 5 ? 'is-perfect' : ''}`}>
              <strong>{readingScore}/5 key examples identified.</strong>
              <span>
                {readingScore === 5
                  ? 'Excellent reading. Continue to the answer key.'
                  : 'Green phrases are correct. Yellow phrases are key examples you still need to select.'}
              </span>
            </div>
          ) : null}
        </div>
      );
    }

    if (slide.id === 'breakdown') {
      return (
        <div className="ps-slide-content">
          <div className="ps-breakdown-list">
            {[
              ['Habit', 'Elena wakes up early and drinks black coffee.', 'Daily routine'],
              ['Permanent State', 'She lives in London.', 'Long-term situation'],
              ['General Truth', 'Water boils at 100 degrees Celsius.', 'Scientific fact'],
              ['Scheduled Event', 'Her train leaves at 11:30 a.m.', 'Official timetable'],
              ['Storytelling / Commentary', 'Smith scores, and the stadium goes wild!', 'Live action narrative']
            ].map(([label, example, note], index) => (
              <div className="ps-breakdown-row" key={label} style={{ '--item-delay': `${index * 0.12}s` }}>
                <span className="ps-breakdown-check"><i className="fe fe-check" /></span>
                <div>
                  <h3>{label}</h3>
                  <p>“{example}”</p>
                </div>
                <small>{note}</small>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="ps-slide-content">
        <div className="ps-writing-layout">
          <div>
            <div className="ps-writing-model">
              <span>MODEL OPENING</span>
              <blockquote>
                “I live in a quiet town near the mountains, and every morning I wake up at 6:00 a.m. to watch the sunrise.”
              </blockquote>
            </div>
            <Form.Control
              as="textarea"
              rows={9}
              className="ps-writing-area"
              value={writingDraft}
              placeholder="Write your own paragraph here..."
              aria-label="Present Simple writing task"
              onChange={(event) => setWritingDraft(event.target.value)}
            />
            <div className="ps-writing-counter">{wordCount} words</div>
          </div>
          <aside className="ps-writing-guide">
            <span>YOUR CHALLENGE</span>
            <h3>Write 70–100 words about your routine and your world.</h3>
            <p>Include:</p>
            <ul>
              <li><i className="fe fe-check-circle" /> one habit or routine</li>
              <li><i className="fe fe-check-circle" /> one permanent state</li>
              <li><i className="fe fe-check-circle" /> one general truth</li>
              <li><i className="fe fe-check-circle" /> one scheduled event</li>
              <li><i className="fe fe-check-circle" /> a frequency expression</li>
            </ul>
            <div className={wordCount >= 70 ? 'is-ready' : ''}>
              {wordCount >= 70 ? 'Your paragraph is ready to review.' : `${Math.max(0, 70 - wordCount)} more words to reach the target.`}
            </div>
          </aside>
        </div>
      </div>
    );
  }, [
    slide.id,
    selectedReading,
    readingChecked,
    readingScore,
    writingDraft,
    wordCount
  ]);

  return (
    <section className="ps-base-class">
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
            <span>PRESENT SIMPLE · BASE CLASS</span>
            <h2>{slide.title}</h2>
          </div>
          <div className="ps-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>

        {slideContent}

        <footer className="ps-slide-footer">
          <Button
            variant="light"
            onClick={() => goToSlide(activeSlide - 1)}
            disabled={activeSlide === 0}
          >
            <i className="fe fe-arrow-left me-2" /> Previous
          </Button>
          <div className="ps-slide-dots" aria-label="Base class slides">
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

export default PresentSimpleBaseClass;
