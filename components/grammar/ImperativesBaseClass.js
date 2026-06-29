import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const functionOrder = ['instructions', 'commands', 'prescriptions', 'directives', 'recipes', 'negative'];

const functionLabels = {
  instructions: 'INSTRUCTIONS / DIRECTIONS',
  commands: 'COMMANDS / ORDERS',
  prescriptions: 'PRESCRIPTIONS / RECOMMENDATIONS',
  directives: 'DIRECTIVES',
  recipes: 'RECIPES / PROCEDURES',
  negative: 'NEGATIVE IMPERATIVES'
};

const guidedExamples = [
  { id: 'instructions', sentence: 'First, put the pan on the burner.' },
  { id: 'commands', sentence: 'Do not kill. Love your others. Do not steal.' },
  { id: 'prescriptions', sentence: 'Take your medicine. Drink a lot of warm water.' },
  { id: 'directives', sentence: 'Go straight. Then, exit on Javier Prado.' },
  { id: 'recipes', sentence: 'Wash all ingredients. Dice the onions and tomatoes.' },
  { id: 'negative', sentence: "Do not have cold refreshments." }
];

const practiceExamples = [
  { id: 'instructions', sentence: 'Turn on the heat and pour oil in the pan.' },
  { id: 'commands', sentence: 'Do not copy the answer key.' },
  { id: 'prescriptions', sentence: 'Drink warm water and rest at home.' },
  { id: 'directives', sentence: 'First, go straight; then, turn left.' },
  { id: 'recipes', sentence: 'Cut the chicken pieces and boil the rice.' },
  { id: 'negative', sentence: "Don't open the door during the test." }
];

const formCards = [
  {
    label: 'POSITIVE IMPERATIVE',
    rule: 'Base verb + complement',
    example: 'Put the pan on the burner.',
    note: 'The subject you is understood.'
  },
  {
    label: 'NEGATIVE IMPERATIVE',
    rule: "Do not / Don't + base verb",
    example: "Don't miss this opportunity.",
    note: 'Use it for warnings, prohibitions, advice, or persuasion.'
  },
  {
    label: 'SEQUENCE MARKERS',
    rule: 'First, second, next, after that, finally',
    example: 'First, wash the ingredients. Then, dice the onions.',
    note: 'They organize instructions and recipes.'
  },
  {
    label: 'IMPLICIT SUBJECT',
    rule: 'You is invisible',
    example: 'Turn on the heat. = You turn on the heat.',
    note: 'Imperatives usually omit the subject.'
  }
];

const scrambledSteps = [
  'Put the pan on the burner.',
  'Turn on the heat.',
  'Pour oil in the pan.',
  'Crack the eggs.',
  'Whip the eggs.',
  'Pour the eggs in the pan.',
  'Mix the eggs.',
  'Plate the scrambled eggs.'
];

const commandExamples = [
  {
    sentence: 'Do not kill.',
    type: 'negative imperative'
  },
  {
    sentence: 'Love your others.',
    type: 'positive imperative'
  },
  {
    sentence: 'Do not steal.',
    type: 'negative imperative'
  }
];

const prescriptionExamples = [
  {
    sentence: 'Take your medicine.',
    note: 'Medical recommendation'
  },
  {
    sentence: 'Drink a lot of warm water.',
    note: 'Health advice'
  },
  {
    sentence: 'Do not have cold refreshments or drinks.',
    note: 'Negative prescription'
  }
];

const directiveSteps = [
  'Go straight express way.',
  'Exit on Javier Prado.',
  'Exit on Derby Ave.'
];

const recipeSteps = [
  {
    prompt: 'First, ________ all ingredients.',
    answer: 'wash',
    ingredient: 'all ingredients'
  },
  {
    prompt: 'Then, ________ the onions and tomatoes.',
    answer: 'dice',
    ingredient: 'onions and tomatoes'
  },
  {
    prompt: 'Next, ________ the rice.',
    answer: 'cook',
    alternatives: ['boil'],
    ingredient: 'rice'
  },
  {
    prompt: 'After, ________ the chicken pieces.',
    answer: 'cut',
    ingredient: 'chicken pieces'
  },
  {
    prompt: 'After that, ________ the dressing.',
    answer: 'do',
    alternatives: ['prepare'],
    ingredient: 'dressing'
  },
  {
    prompt: 'Next, ________ the potatoes.',
    answer: 'steam',
    alternatives: ['boil'],
    ingredient: 'potatoes'
  },
  {
    prompt: 'Then, ________ all ingredients.',
    answer: 'mix',
    ingredient: 'all ingredients'
  },
  {
    prompt: 'Finally, ________ and eat.',
    answer: 'serve',
    ingredient: 'stew'
  }
];

const exerciseItems = [
  {
    prompt: '________ your medicine.',
    answer: 'take',
    explanation: 'Use the base verb to give a prescription.'
  },
  {
    prompt: '________ a lot of warm water.',
    answer: 'drink',
    explanation: 'Use the base verb to give advice.'
  },
  {
    prompt: 'Do not ________ cold drinks.',
    answer: 'have',
    explanation: 'Negative imperatives use do not + base verb.'
  },
  {
    prompt: 'First, ________ straight express way.',
    answer: 'go',
    explanation: 'Use go for directions.'
  },
  {
    prompt: 'Then, ________ on Javier Prado.',
    answer: 'exit',
    explanation: 'Use exit to give a route instruction.'
  },
  {
    prompt: 'Finally, ________ the scrambled eggs.',
    answer: 'plate',
    explanation: 'Use plate for the final cooking instruction.'
  }
];

const slides = [
  { id: 'forms', label: 'Form', title: 'Imperatives: Form and Use' },
  { id: 'guided', label: 'Watch', title: 'Recognizing Imperative Functions' },
  { id: 'match', label: 'Connect', title: 'Build the Connections' },
  { id: 'scrambled', label: 'Eggs', title: 'Preparing Scrambled Eggs' },
  { id: 'commands', label: 'Orders', title: 'Commands and Prescriptions' },
  { id: 'directives', label: 'Route', title: 'Directives' },
  { id: 'recipe', label: 'Recipe', title: 'Chicken Stew Recipe' },
  { id: 'writing', label: 'Write', title: 'Writing Task' },
  { id: 'exercises', label: 'Practice', title: 'Imperative Exercises' }
];

const normalize = (value) => value.trim().toLowerCase().replace(/[.?!]/g, '').replace(/\s+/g, ' ');

const buildPath = (start, end) => {
  const distance = Math.max(70, (end.x - start.x) * 0.46);
  return `M ${start.x} ${start.y} C ${start.x + distance} ${start.y}, ${end.x - distance} ${end.y}, ${end.x} ${end.y}`;
};

const ImperativeMatchingBoard = ({ mode = 'automatic', examples, markerId }) => {
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
      <div className={`im-arrow-board is-${mode}`} ref={boardRef}>
        <svg className="im-arrow-layer" aria-hidden="true">
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
                  'im-connection-line',
                  mode === 'automatic' ? 'is-automatic' : '',
                  checked && isCorrect ? 'is-correct' : '',
                  checked && !isCorrect ? 'is-wrong' : ''
                ].filter(Boolean).join(' ')}
                style={{ '--connection-delay': `${0.3 + index * 0.24}s` }}
              />
            );
          })}
        </svg>

        <div className="im-match-column">
          <span className="im-column-label">EXAMPLES</span>
          {examples.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={[
                'im-match-item im-sentence-item',
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
              <span className="im-example-number">{index + 1}</span>
              <span>{item.sentence}</span>
              <span
                className="im-connection-dot is-source"
                ref={(element) => {
                  sourceRefs.current[item.id] = element;
                }}
              />
            </button>
          ))}
        </div>

        <div className="im-function-panel">
          <span className="im-column-label">FUNCTIONS</span>
          {functionOrder.map((id, index) => {
            const isUsed = Object.values(connections).includes(id);
            return (
              <button
                type="button"
                key={id}
                className={[
                  'im-match-item im-function-item',
                  mode === 'interactive' && selectedSource ? 'is-available' : '',
                  isUsed ? 'is-used' : ''
                ].filter(Boolean).join(' ')}
                style={{ '--item-delay': `${0.12 + index * 0.08}s` }}
                disabled={mode !== 'interactive'}
                onClick={() => connectTarget(id)}
              >
                <span
                  className="im-connection-dot is-target"
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
        <div className="im-match-controls">
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
            <div className={`im-result ${correctCount === examples.length ? 'is-perfect' : ''}`}>
              <strong>{correctCount}/6 correct.</strong>
              <span>{correctCount === examples.length ? 'Excellent. You identified the imperative functions.' : 'Check if the sentence gives a command, route, recipe, advice, or prohibition.'}</span>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="im-auto-caption">Imperatives use the base verb. The subject <b>you</b> is usually invisible.</div>
      )}
    </div>
  );
};

const ImperativesBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [recipeAnswers, setRecipeAnswers] = useState({});
  const [recipeChecked, setRecipeChecked] = useState(false);
  const [exerciseAnswers, setExerciseAnswers] = useState({});
  const [exerciseChecked, setExerciseChecked] = useState(false);
  const [writingDraft, setWritingDraft] = useState('');

  const slide = slides[activeSlide];
  const slideProgress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const wordCount = writingDraft.trim() ? writingDraft.trim().split(/\s+/).length : 0;
  const recipeScore = recipeSteps.filter((item, index) => {
    const answer = normalize(recipeAnswers[index] || '');
    return answer === normalize(item.answer) || (item.alternatives || []).some((alt) => answer === normalize(alt));
  }).length;
  const exerciseScore = exerciseItems.filter((item, index) => normalize(exerciseAnswers[index] || '') === normalize(item.answer)).length;

  const goToSlide = (index) => {
    setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));
  };

  const renderSlide = () => {
    if (slide.id === 'forms') {
      return (
        <div className="pc-slide-content">
          <div className="im-title-card">
            <span>IMPERATIVES</span>
            <p>Use the base verb to give instructions, orders, prescriptions, routes, and recipes. The subject <b>you</b> is understood.</p>
          </div>
          <div className="im-form-grid">
            {formCards.map((card, index) => (
              <article key={card.label} style={{ '--item-delay': `${index * 0.1}s` }}>
                <span>{card.label}</span>
                <h3>{card.rule}</h3>
                <blockquote>{card.example}</blockquote>
                <p>{card.note}</p>
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
            <p>The arrows show common classroom and real-life functions of imperatives.</p>
          </div>
          <ImperativeMatchingBoard mode="automatic" examples={guidedExamples} markerId="im-guided-arrow" />
        </div>
      );
    }

    if (slide.id === 'match') {
      return (
        <div className="pc-slide-content">
          <div className="pc-lead">
            <span>YOUR TURN</span>
            <p>Connect each imperative sentence to only one function.</p>
          </div>
          <ImperativeMatchingBoard mode="interactive" examples={practiceExamples} markerId="im-practice-arrow" />
        </div>
      );
    }

    if (slide.id === 'scrambled') {
      return (
        <div className="pc-slide-content">
          <div className="im-process-board">
            <span>PREPARING SCRAMBLED EGGS</span>
            <h3>Instructions / Directions</h3>
            <div className="im-sequence-list">
              {scrambledSteps.map((step, index) => (
                <article key={step} style={{ '--item-delay': `${index * 0.07}s` }}>
                  <b>{['First', 'Second', 'Next', 'After', 'Following', 'Next', 'After that', 'Finally'][index]}</b>
                  <span>{step}</span>
                </article>
              ))}
            </div>
            <aside>
              <strong>VERBS</strong>
              <span>put on</span>
              <span>turn on</span>
              <span>pour</span>
              <span>crack</span>
              <span>whip</span>
              <span>mix</span>
              <span>serve</span>
            </aside>
          </div>
        </div>
      );
    }

    if (slide.id === 'commands') {
      return (
        <div className="pc-slide-content">
          <div className="im-two-panel">
            <section>
              <span>COMMANDMENTS</span>
              <h3>Superior orders / commandments</h3>
              {commandExamples.map((item, index) => (
                <article key={item.sentence}>
                  <b>{index + 1}</b>
                  <strong>{item.sentence}</strong>
                  <small>{item.type}</small>
                </article>
              ))}
            </section>
            <section>
              <span>PRESCRIPTIONS</span>
              <h3>Recommendations</h3>
              {prescriptionExamples.map((item, index) => (
                <article key={item.sentence}>
                  <b>{index + 1}</b>
                  <strong>{item.sentence}</strong>
                  <small>{item.note}</small>
                </article>
              ))}
            </section>
          </div>
        </div>
      );
    }

    if (slide.id === 'directives') {
      return (
        <div className="pc-slide-content">
          <div className="im-directives-card">
            <span>DIRECTIVES</span>
            <h3>How do you get to work from home?</h3>
            <div>
              {directiveSteps.map((step, index) => (
                <article key={step}>
                  <b>{['First', 'Then', 'After'][index]}</b>
                  <p>{step}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (slide.id === 'recipe') {
      return (
        <div className="pc-slide-content">
          <div className="pc-gap-intro">
            <span>CHICKEN STEW RECIPE</span>
            <p>Complete the recipe with imperative verbs.</p>
          </div>
          <div className="im-recipe-layout">
            <div className="im-recipe-list">
              {recipeSteps.map((item, index) => {
                const currentAnswer = recipeAnswers[index] || '';
                const answer = normalize(currentAnswer);
                const isCorrect = answer === normalize(item.answer) || (item.alternatives || []).some((alt) => answer === normalize(alt));
                return (
                  <article key={item.prompt} className={recipeChecked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
                    <label>{item.prompt}</label>
                    <Form.Control
                      value={currentAnswer}
                      placeholder="Type the imperative verb"
                      onChange={(event) => {
                        setRecipeAnswers((current) => ({ ...current, [index]: event.target.value }));
                        setRecipeChecked(false);
                      }}
                    />
                    {recipeChecked ? <small>{item.answer.toUpperCase()} {item.ingredient}.</small> : null}
                  </article>
                );
              })}
            </div>
            <aside className="im-recipe-bank">
              <div>
                <strong>VERBS</strong>
                {['cut', 'dice', 'wash-clean', 'cook-steam', 'mix', 'boil', 'fry', 'brown', 'condiment', 'serve', 'do'].map((item) => <span key={item}>{item}</span>)}
              </div>
              <div>
                <strong>INGREDIENTS</strong>
                {['chicken', 'potatoes', 'carrots', 'peppers', 'peas', 'onions', 'tomatoes', 'oil', 'rice', 'salt and pepper', 'garlic'].map((item) => <span key={item}>{item}</span>)}
              </div>
            </aside>
          </div>
          <div className="pc-exercise-actions">
            <Button variant="primary" onClick={() => setRecipeChecked(true)}>Check recipe</Button>
            {recipeChecked ? <div className={`im-result ${recipeScore === recipeSteps.length ? 'is-perfect' : ''}`}><strong>{recipeScore}/{recipeSteps.length} correct.</strong></div> : null}
          </div>
        </div>
      );
    }

    if (slide.id === 'writing') {
      return (
        <div className="pc-slide-content">
          <div className="pc-writing-layout">
            <div>
              <div className="pc-writing-model im-writing-model">
                <span>MODEL OPENING</span>
                <blockquote>
                  First, read the question carefully. Then, underline the key words. Do not choose an answer too quickly. Finally, check your grammar.
                </blockquote>
              </div>
              <Form.Control
                as="textarea"
                rows={10}
                className="pc-writing-area"
                value={writingDraft}
                placeholder="Write your own instructions here..."
                aria-label="Imperatives writing task"
                onChange={(event) => setWritingDraft(event.target.value)}
              />
              <div className="pc-word-count">{wordCount} words</div>
            </div>
            <aside className="pc-writing-guide im-writing-guide">
              <span>YOUR TASK</span>
              <h3>Write 8-10 instructions for a student or a recipe.</h3>
              <p>Include at least:</p>
              <ul>
                <li><i className="fe fe-check-circle" /> four positive imperatives</li>
                <li><i className="fe fe-check-circle" /> two negative imperatives</li>
                <li><i className="fe fe-check-circle" /> sequence markers</li>
                <li><i className="fe fe-check-circle" /> clear punctuation</li>
              </ul>
              <div className={wordCount >= 55 ? 'is-ready' : ''}>
                <strong>{wordCount}/55 minimum words</strong>
                <span>{wordCount >= 55 ? 'Your instructions are ready to review.' : `${Math.max(0, 55 - wordCount)} more words to reach the minimum.`}</span>
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
          <p>Use the correct imperative verb.</p>
        </div>
        <div className="im-exercise-grid">
          {exerciseItems.map((item, index) => {
            const currentAnswer = exerciseAnswers[index] || '';
            const isCorrect = normalize(currentAnswer) === normalize(item.answer);
            return (
              <article key={item.prompt} className={exerciseChecked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
                <label>{index + 1}. {item.prompt}</label>
                <Form.Control
                  value={currentAnswer}
                  placeholder="Type the imperative verb"
                  onChange={(event) => {
                    setExerciseAnswers((current) => ({ ...current, [index]: event.target.value }));
                    setExerciseChecked(false);
                  }}
                />
                {exerciseChecked ? <small>{item.answer.toUpperCase()}. {item.explanation}</small> : null}
              </article>
            );
          })}
        </div>
        <div className="pc-exercise-actions">
          <Button variant="primary" onClick={() => setExerciseChecked(true)}>Check</Button>
          {exerciseChecked ? <div className={`im-result ${exerciseScore === exerciseItems.length ? 'is-perfect' : ''}`}><strong>{exerciseScore}/{exerciseItems.length} correct.</strong></div> : null}
        </div>
      </div>
    );
  };

  return (
    <section className="pc-base-class im-base-class">
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
            <span>IMPERATIVES - BASE CLASS</span>
            <h2>{slide.title}</h2>
          </div>
          <div className="pc-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>

        {renderSlide()}

        <footer className="pc-slide-footer">
          <Button variant="light" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}>
            <i className="fe fe-arrow-left me-2" /> Previous
          </Button>
          <div className="pc-slide-dots" aria-label="Imperatives base class slides">
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

export default ImperativesBaseClass;
