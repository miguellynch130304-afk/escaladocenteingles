import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const functionOrder = ['interrupted', 'simultaneous', 'progress', 'background'];

const functionLabels = {
  interrupted: 'INTERRUPTED ACTIONS',
  simultaneous: 'SIMULTANEOUS ACTIONS',
  progress: 'AN IN-PROGRESS ACTION',
  background: 'A BACKGROUND EVENT'
};

const guidedExamples = [
  { id: 'interrupted', sentence: 'I was sleeping when the alarm went off.' },
  { id: 'simultaneous', sentence: 'While I was cooking, my sister was washing the dishes.' },
  { id: 'progress', sentence: 'At 10:00 p.m. last night, we were watching a movie.' },
  { id: 'background', sentence: 'The wind was blowing and the rain was hitting the window.' }
];

const practiceExamples = [
  { id: 'interrupted', sentence: 'They were eating dinner when the doorbell rang.' },
  { id: 'simultaneous', sentence: 'While he was studying, his mom was reading a book.' },
  { id: 'progress', sentence: 'At 3:00 p.m. yesterday, she was playing tennis.' },
  { id: 'background', sentence: 'The birds were chirping and the sun was rising.' }
];

const functionExplanations = [
  {
    id: 'interrupted',
    label: 'INTERRUPTED ACTIONS',
    description: 'An ongoing activity that is interrupted by a shorter, sudden event.',
    example: 'They were eating dinner when the doorbell rang.'
  },
  {
    id: 'simultaneous',
    label: 'SIMULTANEOUS ACTIONS',
    description: 'Two activities happening at the same time in the past.',
    example: 'While he was studying, his mom was reading a book.'
  },
  {
    id: 'progress',
    label: 'AN IN-PROGRESS ACTION',
    description: 'An action happening at a precise time in the past.',
    example: 'At 3:00 p.m. yesterday, she was playing tennis.'
  },
  {
    id: 'background',
    label: 'A BACKGROUND EVENT',
    description: 'Ongoing descriptions that set the scene for a story.',
    example: 'The birds were chirping and the sun was rising.'
  }
];

const readingPhrases = {
  staying: 'was staying',
  spending: 'was spending',
  cooking: 'was cooking',
  wearing: 'was wearing',
  sitting: 'was sitting',
  reading: 'was reading',
  playing: 'were playing',
  running: 'were running',
  chasing: 'was chasing',
  having: 'were all having'
};

const gapItems = [
  {
    prompt: 'Look! The birds _________ in the sky when the storm started. (fly)',
    answer: 'were flying'
  },
  {
    prompt: 'Listen! Sarah _________ her favorite song in the shower this morning. (sing)',
    answer: 'was singing'
  },
  {
    prompt: "I couldn't talk yesterday because I _________ my homework. (do)",
    answer: 'was doing'
  },
  {
    prompt: "Why _________ during the meeting? It wasn't funny! (you / laugh)",
    answer: 'were you laughing'
  },
  {
    prompt: 'The children _________ television at 9 p.m.; they were sleeping. (not watch)',
    answer: "weren't watching",
    alternatives: ['were not watching']
  },
  {
    prompt: 'John was in the kitchen. He _________ dinner for us. (make)',
    answer: 'was making'
  }
];

const slides = [
  { id: 'guided', label: 'Watch', title: 'Past Continuous Functions' },
  { id: 'match', label: 'Connect', title: 'Match Each Function' },
  { id: 'summary', label: 'Review', title: 'Functions in Context' },
  { id: 'explanations', label: 'Understand', title: 'Explaining Functions' },
  { id: 'grammar', label: 'Form', title: 'Grammar Chart: Past Continuous' },
  { id: 'syntax', label: 'Ask', title: 'Syntax, Order, and WH Questions' },
  { id: 'reading', label: 'Read', title: 'The Miller Family' },
  { id: 'complete', label: 'Complete', title: 'Fill in the Blanks' }
];

const normalize = (value) => value.trim().toLowerCase().replace(/\s+/g, ' ');

const buildPath = (start, end) => {
  const distance = Math.max(70, (end.x - start.x) * 0.48);
  return `M ${start.x} ${start.y} C ${start.x + distance} ${start.y}, ${end.x - distance} ${end.y}, ${end.x} ${end.y}`;
};

const PastContinuousMatchingBoard = ({ mode = 'automatic', examples, markerId }) => {
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
      <div className={`ps-arrow-board past-continuous-arrow-board is-${mode}`} ref={boardRef}>
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
                  ? 'Excellent. Every sentence has the right Past Continuous function.'
                  : 'Review the red arrows and reconnect those examples.'}
              </span>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="ps-auto-caption">
          <span className="ps-live-dot" />
          Watch each sentence connect automatically to its Past Continuous function.
        </div>
      )}
    </div>
  );
};

const ReadingPhrase = ({ id, selected, checked, onToggle }) => (
  <button
    type="button"
    className={[
      'pc-reading-choice',
      selected ? 'is-selected' : '',
      checked && selected ? 'is-correct' : '',
      checked && !selected ? 'is-missed' : ''
    ].filter(Boolean).join(' ')}
    aria-pressed={selected}
    onClick={() => onToggle(id)}
  >
    {readingPhrases[id]}
  </button>
);

const PastContinuousBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedReading, setSelectedReading] = useState([]);
  const [readingChecked, setReadingChecked] = useState(false);
  const [gapAnswers, setGapAnswers] = useState({});
  const [gapChecked, setGapChecked] = useState(false);

  const slide = slides[activeSlide];
  const progress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const completedGaps = Object.values(gapAnswers).filter((value) => value.trim()).length;
  const gapScore = gapItems.filter((item, index) => {
    const accepted = [item.answer, ...(item.alternatives || [])].map(normalize);
    return accepted.includes(normalize(gapAnswers[index] || ''));
  }).length;

  const goToSlide = (index) => {
    setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));
  };

  const toggleReading = (id) => {
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
            <p>The arrows reveal four common Past Continuous functions.</p>
          </div>
          <PastContinuousMatchingBoard
            mode="automatic"
            examples={guidedExamples}
            markerId="past-continuous-auto-arrow"
          />
        </div>
      );
    }

    if (slide.id === 'match') {
      return (
        <div className="ps-slide-content">
          <div className="ps-slide-lead">
            <span>YOUR TURN</span>
            <p>Build all four connections. Each function can only be used once.</p>
          </div>
          <PastContinuousMatchingBoard
            mode="interactive"
            examples={practiceExamples}
            markerId="past-continuous-practice-arrow"
          />
        </div>
      );
    }

    if (slide.id === 'summary') {
      return (
        <div className="ps-slide-content">
          <div className="ps-breakdown-list">
            {practiceExamples.map((item, index) => (
              <article className="ps-breakdown-row" key={item.id} style={{ '--item-delay': `${index * 0.12}s` }}>
                <span className="ps-breakdown-check"><i className="fe fe-check" /></span>
                <div>
                  <h3>{functionLabels[item.id]}</h3>
                  <p>{item.sentence}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'explanations') {
      return (
        <div className="ps-slide-content">
          <div className="ps-explanation-grid past-continuous-explanation-grid">
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

    if (slide.id === 'grammar') {
      return (
        <div className="ps-slide-content">
          <div className="past-continuous-chart" role="table" aria-label="Past Continuous grammar chart">
            <div className="is-heading" role="row">
              <strong role="columnheader">FORM</strong>
              <strong role="columnheader">STRUCTURE</strong>
              <strong role="columnheader">EXAMPLE</strong>
            </div>
            {[
              ['Positive (+)', 'Subject + was/were + verb-ing', 'I was eating lunch.'],
              ['Negative (-)', 'Subject + was/were + not + verb-ing', "He wasn't listening."],
              ['Question (?)', 'Was/Were + subject + verb-ing?', 'Were they watching a movie?']
            ].map(([form, structure, example]) => (
              <div role="row" key={form}>
                <strong role="cell">{form}</strong>
                <span role="cell">{structure}</span>
                <em role="cell">{example}</em>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'syntax') {
      const tokens = [
        ['subject', 'The president'],
        ['auxiliary', 'was'],
        ['verb', 'governing'],
        ['place', 'at the palace'],
        ['people', 'with his ministers'],
        ['reason', 'to develop the economy'],
        ['time', 'at 8:00 p.m.']
      ];
      const questions = [
        ['WHERE', 'Where was he governing?', 'place'],
        ['WHEN', 'When was he governing?', 'time'],
        ['WHY', 'Why was he governing?', 'reason'],
        ['WHO - WITH', 'Who was he governing with?', 'people'],
        ['GENERAL QUESTION', 'What was he doing?', 'What + the verb do']
      ];

      return (
        <div className="ps-slide-content">
          <div className="pc-formula">
            <span>WH WORD</span><i className="fe fe-plus" />
            <strong>WAS / WERE</strong><i className="fe fe-plus" />
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
        <div className="ps-slide-content">
          <div className="pc-reading-instruction">
            <strong>Find all ten Past Continuous verb groups.</strong>
            <span>Select every action that was in progress during the Miller family&apos;s afternoon.</span>
          </div>
          <article className="pc-reading-paper past-continuous-reading">
            <h3>Sunday at Home</h3>
            <p>
              Yesterday was Sunday, and the Miller family <ReadingPhrase id="staying" selected={selectedReading.includes('staying')} checked={readingChecked} onToggle={toggleReading} /> at home.
              The weather was beautiful, so everyone <ReadingPhrase id="spending" selected={selectedReading.includes('spending')} checked={readingChecked} onToggle={toggleReading} /> time in the backyard.
            </p>
            <p>
              Mr. Miller <ReadingPhrase id="cooking" selected={selectedReading.includes('cooking')} checked={readingChecked} onToggle={toggleReading} /> sausages on the grill.
              He <ReadingPhrase id="wearing" selected={selectedReading.includes('wearing')} checked={readingChecked} onToggle={toggleReading} /> an apron and smiling.
              Mrs. Miller <ReadingPhrase id="sitting" selected={selectedReading.includes('sitting')} checked={readingChecked} onToggle={toggleReading} /> on a lawn chair.
              She <ReadingPhrase id="reading" selected={selectedReading.includes('reading')} checked={readingChecked} onToggle={toggleReading} /> a fascinating book and drinking lemonade.
            </p>
            <p>
              Their children, Toby and Lily, <ReadingPhrase id="playing" selected={selectedReading.includes('playing')} checked={readingChecked} onToggle={toggleReading} /> with a ball.
              They <ReadingPhrase id="running" selected={selectedReading.includes('running')} checked={readingChecked} onToggle={toggleReading} /> on the green grass.
              Their dog, Max, <ReadingPhrase id="chasing" selected={selectedReading.includes('chasing')} checked={readingChecked} onToggle={toggleReading} /> his tail.
              They <ReadingPhrase id="having" selected={selectedReading.includes('having')} checked={readingChecked} onToggle={toggleReading} /> a wonderful afternoon.
            </p>
          </article>
          <div className="pc-reading-actions">
            <span><strong>{selectedReading.length}/10</strong> verb groups selected</span>
            <Button
              variant="primary"
              disabled={selectedReading.length !== 10}
              onClick={() => setReadingChecked(true)}
            >
              Check selections
            </Button>
          </div>
          {readingChecked ? (
            <div className="pc-result is-perfect">
              <strong>10/10 correct.</strong>
              <span>Excellent. Every selected verb group uses was/were + verb-ing.</span>
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div className="ps-slide-content">
        <div className="pc-gap-intro">
          <strong>Complete each sentence in the Past Continuous.</strong>
          <span>Use was/were and the -ing form of the verb in parentheses.</span>
        </div>
        <div className="pc-gap-grid">
          {gapItems.map((item, index) => {
            const value = gapAnswers[index] || '';
            const accepted = [item.answer, ...(item.alternatives || [])].map(normalize);
            const isCorrect = accepted.includes(normalize(value));
            return (
              <label className={gapChecked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''} key={item.prompt}>
                <span>{index + 1}</span>
                <p>{item.prompt}</p>
                <Form.Control
                  value={value}
                  placeholder="Type the complete verb form"
                  onChange={(event) => {
                    setGapAnswers((current) => ({ ...current, [index]: event.target.value }));
                    setGapChecked(false);
                  }}
                />
                {gapChecked ? <small>{isCorrect ? 'Correct.' : `Answer: ${item.answer}`}</small> : null}
              </label>
            );
          })}
        </div>
        <div className="pc-exercise-actions">
          <span>{completedGaps}/{gapItems.length} completed</span>
          <Button
            variant="primary"
            disabled={completedGaps !== gapItems.length}
            onClick={() => setGapChecked(true)}
          >
            Check all answers
          </Button>
        </div>
        {gapChecked ? (
          <div className={`pc-result ${gapScore === gapItems.length ? 'is-perfect' : ''}`}>
            <strong>{gapScore}/{gapItems.length} correct.</strong>
            <span>{gapScore === gapItems.length ? 'Excellent work.' : 'Review the answers highlighted in red.'}</span>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <section className="pc-base-class past-continuous-base">
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
            <span>PAST CONTINUOUS - BASE CLASS</span>
            <h2>{slide.title}</h2>
          </div>
          <div className="pc-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>

        {renderSlide()}

        <footer className="pc-slide-footer">
          <Button
            variant="light"
            disabled={activeSlide === 0}
            onClick={() => goToSlide(activeSlide - 1)}
          >
            <i className="fe fe-arrow-left me-2" /> Previous
          </Button>
          <div className="pc-slide-dots" aria-label="Past Continuous base class slides">
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

export default PastContinuousBaseClass;
