import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const functionOrder = ['obligation', 'noNecessity', 'necessity', 'prohibition', 'permission', 'advice'];

const functionLabels = {
  obligation: 'OBLIGATION',
  noNecessity: 'NO OBLIGATION / NO NECESSITY',
  necessity: 'NECESSITY',
  prohibition: 'PROHIBITION',
  permission: 'PERMISSION / NO PERMISSION',
  advice: 'RECOMMENDATION / ADVICE'
};

const guidedExamples = [
  { id: 'obligation', sentence: 'Tom has a broken leg. He must go to the doctor immediately.' },
  { id: 'noNecessity', sentence: "Tomorrow is a public holiday. We don't have to wake up early." },
  { id: 'necessity', sentence: 'My phone battery is at 1%. I have to find a charger right now.' },
  { id: 'prohibition', sentence: 'You must not smoke here.' },
  { id: 'permission', sentence: 'Leo is 18 years old now. He is allowed to get his driving license.' },
  { id: 'advice', sentence: 'Anna has a terrible headache. She ought to rest in a quiet room.' }
];

const practiceExamples = [
  { id: 'obligation', sentence: 'She must take her medicine.' },
  { id: 'noNecessity', sentence: "He doesn't have to work because he is a millionaire." },
  { id: 'necessity', sentence: 'Sarah needs to study hard this weekend.' },
  { id: 'prohibition', sentence: "Visitors mustn't touch the artwork." },
  { id: 'permission', sentence: 'Students can use the computer lab.' },
  { id: 'advice', sentence: 'You should not eat too much fast food.' }
];

const overviewCards = [
  {
    label: 'OBLIGATION',
    forms: 'must / have to / need to',
    example: 'She must go to hospital.'
  },
  {
    label: 'NO NECESSITY',
    forms: "do not have to / don't need to",
    example: "He doesn't have to work."
  },
  {
    label: 'PROHIBITION',
    forms: "must not / mustn't",
    example: 'You must not drink alcohol.'
  },
  {
    label: 'PERMISSION',
    forms: 'can / be allowed to / be permitted to',
    example: 'You are allowed to eat normally.'
  },
  {
    label: 'NO PERMISSION',
    forms: "cannot / can't / are not allowed to",
    example: "Passengers can't use their mobile phones."
  },
  {
    label: 'RECOMMENDATION',
    forms: 'should / ought to',
    example: 'You should drink plenty of water.'
  }
];

const sectionItems = [
  {
    section: 'Section 1: Obligation & No Necessity',
    id: 'obligation',
    items: [
      {
        situation: 'Tom has a broken leg.',
        prompt: "He ________ go to the doctor immediately. [must / doesn't have to]",
        answer: 'must',
        functionLabel: 'Obligation'
      },
      {
        situation: 'Tomorrow is a public holiday.',
        prompt: "We ________ wake up early for school. [need to / don't have to]",
        answer: "don't have to",
        functionLabel: 'No necessity'
      },
      {
        situation: 'My phone battery is at 1%.',
        prompt: "I ________ find a charger right now. [have to / don't need to]",
        answer: 'have to',
        functionLabel: 'Necessity'
      },
      {
        situation: 'The museum entry is completely free.',
        prompt: "You ________ buy a ticket. [must / don't need to]",
        answer: "don't need to",
        functionLabel: 'No necessity'
      },
      {
        situation: 'Sarah wants to pass her final exam.',
        prompt: "She ________ study hard this weekend. [needs to / doesn't have to]",
        answer: 'needs to',
        functionLabel: 'Necessity'
      }
    ]
  },
  {
    section: 'Section 2: Prohibition',
    id: 'prohibition',
    items: [
      {
        situation: "The gas station sign says 'No Smoking'.",
        prompt: "You ________ smoke here. [must not / don't have to]",
        answer: 'must not',
        alternatives: ["mustn't"],
        functionLabel: 'Prohibition'
      },
      {
        situation: 'The museum has priceless, fragile statues.',
        prompt: "Visitors ________ touch the artwork. [mustn't / are allowed to]",
        answer: "mustn't",
        alternatives: ['must not'],
        functionLabel: 'Prohibition'
      },
      {
        situation: 'This is a strictly confidential meeting.',
        prompt: 'You ________ tell anyone about this. [must not / ought to]',
        answer: 'must not',
        alternatives: ["mustn't"],
        functionLabel: 'Prohibition'
      },
      {
        situation: 'The pool is closed for cleaning.',
        prompt: "We ________ swim in it today. [mustn't / don't need to]",
        answer: "mustn't",
        alternatives: ['must not'],
        functionLabel: 'Prohibition'
      },
      {
        situation: 'Driving rules require a green light to go.',
        prompt: "Drivers ________ cross on a red light. [must not / shouldn't]",
        answer: 'must not',
        alternatives: ["mustn't"],
        functionLabel: 'Prohibition'
      }
    ]
  },
  {
    section: 'Section 3: Permission & No Permission',
    id: 'permission',
    items: [
      {
        situation: 'Leo is 18 years old now.',
        prompt: 'He ________ get his driving license. [is allowed to / cannot]',
        answer: 'is allowed to',
        functionLabel: 'Permission'
      },
      {
        situation: "The sign says 'No Pets Allowed'.",
        prompt: 'Dogs ________ enter this supermarket. [are permitted to / cannot]',
        answer: 'cannot',
        alternatives: ["can't"],
        functionLabel: 'No permission'
      },
      {
        situation: 'The library has free public computers.',
        prompt: 'Students ________ use them for research. [can / are not allowed to]',
        answer: 'can',
        functionLabel: 'Permission'
      },
      {
        situation: 'The plane is taking off right now.',
        prompt: "Passengers ________ use their mobile phones. [can't / are permitted to]",
        answer: "can't",
        alternatives: ['cannot'],
        functionLabel: 'No permission'
      },
      {
        situation: 'The concert allows taking photos without flash.',
        prompt: 'You ________ take pictures here. [are permitted to / cannot]',
        answer: 'are permitted to',
        functionLabel: 'Permission'
      }
    ]
  },
  {
    section: 'Section 4: Recommendations (Advice)',
    id: 'advice',
    items: [
      {
        situation: 'Anna has a terrible headache.',
        prompt: 'She ________ rest in a quiet room. [ought to / ought not to]',
        answer: 'ought to',
        functionLabel: 'Positive advice'
      },
      {
        situation: 'You want to stay healthy and energetic.',
        prompt: 'You ________ eat too much fast food. [should / should not]',
        answer: 'should not',
        alternatives: ["shouldn't"],
        functionLabel: 'Negative advice'
      },
      {
        situation: 'It is raining heavily outside.',
        prompt: "You ________ take an umbrella with you. [should / shouldn't]",
        answer: 'should',
        functionLabel: 'Positive advice'
      },
      {
        situation: 'He wants to make a good impression at the interview.',
        prompt: 'He ________ arrive late. [ought to / ought not to]',
        answer: 'ought not to',
        functionLabel: 'Negative advice'
      },
      {
        situation: 'The movie is highly rated and very exciting.',
        prompt: 'You ________ definitely watch it. [should / must not]',
        answer: 'should',
        functionLabel: 'Positive advice'
      }
    ]
  }
];

const readingParagraphs = [
  'Living a healthy and productive life is all about balancing rules, freedom, and smart choices. Whether you are a student or a professional, managing a typical workday requires navigating various expectations.',
  "First, there are strict rules you have to follow to keep your job or stay in school. For instance, employees must arrive on time for morning meetings, and students need to submit their assignments before the deadline. These are serious obligations. However, you don't have to work every single hour of the day. Everyone needs a break, and you don't need to feel guilty about stepping away from your desk to rest.",
  "Second, maintaining a professional environment means understanding what is forbidden. You must not use your personal phone during a critical presentation, and you mustn't share confidential company data with outsiders. These strict prohibitions prevent chaos and protect privacy.",
  'Fortunately, most modern workplaces also grant freedom. Employees can choose their own working attire on casual Fridays, and they are allowed to work from home on certain days. In these spaces, you are permitted to manage your own schedule, as long as your tasks are completed.',
  'Finally, making wise daily choices often comes down to good advice. To avoid burning out, you should take short walks to stretch your legs. You ought to drink plenty of water throughout the day, and you should not skip lunch just to finish a minor task.',
  'By balancing what you must do with what you can do, you can build a successful and stress-free routine.'
];

const readingBreakdown = [
  {
    label: 'Obligation & Necessity / No Necessity',
    examples: [
      'have to (...rules you have to follow...)',
      'must (...employees must arrive on time...)',
      'need to (...students need to submit...)',
      "don't have to (...you don't have to work every single hour...)",
      "don't need to (...you don't need to feel guilty...)"
    ]
  },
  {
    label: 'Prohibition',
    examples: [
      'must not (...You must not use your personal phone...)',
      "mustn't (...and you mustn't share confidential company data...)"
    ]
  },
  {
    label: 'Permission & No Permission',
    examples: [
      'can (...Employees can choose their own working attire...)',
      'are allowed to (...they are allowed to work from home...)',
      'are permitted to (...you are permitted to manage...)'
    ]
  },
  {
    label: 'Recommendations & Advice',
    examples: [
      'should (...you should take short walks...)',
      'ought to (...You ought to drink plenty of water...)',
      'should not (...you should not skip lunch...)'
    ]
  }
];

const canCannotContexts = [
  {
    place: 'In the Church',
    question: 'What can you do in the church?',
    examples: [
      {
        sentence: 'You cannot smoke in the church.',
        functionLabel: 'PROHIBITION',
        tone: 'danger'
      },
      {
        sentence: 'You can send messages.',
        functionLabel: 'PERMISSION',
        tone: 'warning'
      },
      {
        sentence: 'You cannot talk on the phone.',
        functionLabel: 'NO PERMISSION',
        tone: 'cyan'
      },
      {
        sentence: 'You cannot sleep during mass.',
        functionLabel: 'IMPOSSIBILITY',
        tone: 'pink'
      },
      {
        sentence: 'You can watch TikTok.',
        functionLabel: 'POSSIBILITY',
        tone: 'blue'
      },
      {
        sentence: 'You can work on your tablet.',
        functionLabel: 'POSSIBILITY',
        tone: 'green'
      }
    ]
  },
  {
    place: 'In a Plane',
    question: 'Check the function',
    examples: [
      {
        sentence: 'You cannot smoke.',
        functionLabel: 'PROHIBITION',
        tone: 'danger'
      },
      {
        sentence: 'You can watch movies.',
        functionLabel: 'ABILITY',
        tone: 'blue'
      },
      {
        sentence: 'You can talk on the phone.',
        functionLabel: 'NO PERMISSION',
        tone: 'cyan'
      },
      {
        sentence: 'You cannot sleep all trip.',
        functionLabel: 'IMPOSSIBILITY',
        tone: 'pink'
      },
      {
        sentence: 'You can watch the clouds.',
        functionLabel: 'POSSIBILITY',
        tone: 'green'
      },
      {
        sentence: 'You can work on your tablet.',
        functionLabel: 'POSSIBILITY',
        tone: 'green'
      }
    ]
  }
];

const pastModalCards = [
  {
    form: 'could have + past participle',
    meaning: 'A past possibility or available option that did not happen.',
    example: 'Al could have scored one more goal.'
  },
  {
    form: "couldn't have + past participle",
    meaning: 'Something was impossible in the past, even if someone wanted to do it.',
    example: "He couldn't have passed because he did not study."
  },
  {
    form: 'should have + past participle',
    meaning: 'A good past action or decision was not completed: regret or criticism.',
    example: 'I should have studied harder.'
  },
  {
    form: "shouldn't have + past participle",
    meaning: 'A past action was a bad idea, but it happened anyway.',
    example: "I shouldn't have eaten so much cake."
  },
  {
    form: 'would have + past participle',
    meaning: 'An unreal or unfulfilled past result, intention, or consequence.',
    example: 'I would have bought the shoes if they had been cheaper.'
  },
  {
    form: "wouldn't have + past participle",
    meaning: 'An unreal negative past result or a past action someone would have avoided.',
    example: "I wouldn't have gone if I had known the food was bad."
  }
];

const pastModalExercise = [
  {
    prompt: "I didn't know you were in the hospital! I ________ visited you if I had known.",
    options: ['should have', 'would have', 'could have'],
    answer: 'would have',
    explanation: 'An imaginary past result caused by the condition “if I had known”.'
  },
  {
    prompt: "The roads were frozen and slippery. You ________ driven so fast; you almost caused an accident.",
    options: ["shouldn't have", "wouldn't have", "couldn't have"],
    answer: "shouldn't have",
    explanation: 'Criticism of a bad past choice. Driving fast was a bad idea.'
  },
  {
    prompt: 'I had enough money for the expensive shoes, so I ________ bought them, but I decided to save instead.',
    options: ['could have', 'should have', 'would have'],
    answer: 'could have',
    explanation: 'A past possibility or available option that was not taken.'
  },
  {
    prompt: 'If you had checked the weather forecast, you ________ brought an umbrella.',
    options: ['could have', 'should have', 'would have'],
    answer: 'would have',
    explanation: 'The imagined result of an unreal past condition.'
  },
  {
    prompt: 'My stomach hurts. I ________ eaten that extra slice of greasy pizza last night.',
    options: ["shouldn't have", "wouldn't have", "couldn't have"],
    answer: "shouldn't have",
    explanation: 'A clear regret about a bad past decision.'
  },
  {
    prompt: "We ________ won the football match if our star player hadn't been injured.",
    options: ['could have', 'should have', 'would have'],
    answer: 'would have',
    explanation: 'An imaginary past result blocked by another event.'
  },
  {
    prompt: 'I am sorry I yelled at you yesterday. I ________ reacted so angrily.',
    options: ["shouldn't have", "couldn't have", "wouldn't have"],
    answer: "shouldn't have",
    explanation: 'An apology and regret about a bad past action.'
  },
  {
    prompt: 'Why did you walk home alone? I ________ called a taxi, but I did not think about it.',
    options: ['should have', 'would have', 'could have'],
    answer: 'could have',
    explanation: 'A missed opportunity or available option.'
  },
  {
    prompt: 'If I had known the movie was three hours long, I ________ gone to the cinema.',
    options: ["shouldn't have", "wouldn't have", "couldn't have"],
    answer: "wouldn't have",
    explanation: 'An imagined negative past result: the speaker would have avoided going.'
  },
  {
    prompt: 'You ________ texted me to say you were late! I waited outside for an hour.',
    options: ['could have', 'should have', 'would have'],
    answer: 'should have',
    explanation: 'Strong criticism because someone failed to do the considerate thing.'
  }
];

const slides = [
  { id: 'overview', label: 'Map', title: 'Modals' },
  { id: 'can-cannot', label: 'Can', title: 'Can / Cannot in Context' },
  { id: 'guided', label: 'Watch', title: 'Recognizing Modal Functions' },
  { id: 'match', label: 'Connect', title: 'Build the Connections' },
  { id: 'obligation', label: 'Obligation', title: 'Obligation and No Obligation' },
  { id: 'prohibition', label: 'Prohibition', title: 'Prohibition' },
  { id: 'permission', label: 'Permission', title: 'Permission and No Permission' },
  { id: 'advice', label: 'Advice', title: 'Recommendations' },
  { id: 'reading', label: 'Read', title: 'Finding Balance in a Modern Workday' },
  { id: 'identify', label: 'Identify', title: 'Identify the Modals from the Reading' },
  { id: 'writing', label: 'Write', title: 'Writing Task' },
  { id: 'past-overview', label: 'Past', title: 'Past Modals' },
  { id: 'past-could', label: 'Could', title: 'Could Have / Couldn’t Have' },
  { id: 'past-should', label: 'Should', title: 'Should Have / Shouldn’t Have' },
  { id: 'past-would', label: 'Would', title: 'Would Have / Wouldn’t Have' },
  { id: 'past-practice', label: 'Past Quiz', title: 'Past Modals Exercise' }
];

const normalize = (value) => value.trim().toLowerCase().replace(/[.?!]/g, '').replace(/\s+/g, ' ');

const buildPath = (start, end) => {
  const distance = Math.max(70, (end.x - start.x) * 0.46);
  return `M ${start.x} ${start.y} C ${start.x + distance} ${start.y}, ${end.x - distance} ${end.y}, ${end.x} ${end.y}`;
};

const ModalMatchingBoard = ({ mode = 'automatic', examples, markerId }) => {
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
      <div className={`md-arrow-board is-${mode}`} ref={boardRef}>
        <svg className="md-arrow-layer" aria-hidden="true">
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
                  'md-connection-line',
                  mode === 'automatic' ? 'is-automatic' : '',
                  checked && isCorrect ? 'is-correct' : '',
                  checked && !isCorrect ? 'is-wrong' : ''
                ].filter(Boolean).join(' ')}
                style={{ '--connection-delay': `${0.3 + index * 0.24}s` }}
              />
            );
          })}
        </svg>

        <div className="md-match-column">
          <span className="md-column-label">EXAMPLES</span>
          {examples.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={[
                'md-match-item md-sentence-item',
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
              <span className="md-example-number">{index + 1}</span>
              <span>{item.sentence}</span>
              <span
                className="md-connection-dot is-source"
                ref={(element) => {
                  sourceRefs.current[item.id] = element;
                }}
              />
            </button>
          ))}
        </div>

        <div className="md-function-panel">
          <span className="md-column-label">FUNCTIONS</span>
          {functionOrder.map((id, index) => {
            const isUsed = Object.values(connections).includes(id);
            return (
              <button
                type="button"
                key={id}
                className={[
                  'md-match-item md-function-item',
                  mode === 'interactive' && selectedSource ? 'is-available' : '',
                  isUsed ? 'is-used' : ''
                ].filter(Boolean).join(' ')}
                style={{ '--item-delay': `${0.12 + index * 0.08}s` }}
                disabled={mode !== 'interactive'}
                onClick={() => connectTarget(id)}
              >
                <span
                  className="md-connection-dot is-target"
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
        <div className="md-match-controls">
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
            <div className={`md-result ${correctCount === examples.length ? 'is-perfect' : ''}`}>
              <strong>{correctCount}/6 correct.</strong>
              <span>{correctCount === examples.length ? 'Excellent. You identified every modal function.' : 'Review whether the sentence expresses rule, freedom, prohibition, or advice.'}</span>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="md-auto-caption">Modals show rules, necessity, permission, prohibition, and advice.</div>
      )}
    </div>
  );
};

const ModalsBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checkedSections, setCheckedSections] = useState({});
  const [writingDraft, setWritingDraft] = useState('');
  const [pastAnswers, setPastAnswers] = useState({});
  const [pastChecked, setPastChecked] = useState(false);

  const slide = slides[activeSlide];
  const slideProgress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const wordCount = writingDraft.trim() ? writingDraft.trim().split(/\s+/).length : 0;
  const pastScore = pastModalExercise.filter((item, index) => pastAnswers[index] === item.answer).length;

  const getSectionScore = (sectionId) => {
    const section = sectionItems.find((item) => item.id === sectionId);
    if (!section) {
      return 0;
    }

    return section.items.filter((item, index) => {
      const value = normalize(answers[`${sectionId}-${index}`] || '');
      return value === normalize(item.answer) || (item.alternatives || []).some((alt) => value === normalize(alt));
    }).length;
  };

  const goToSlide = (index) => {
    setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));
  };

  const renderExerciseSection = (sectionId) => {
    const section = sectionItems.find((item) => item.id === sectionId);
    const score = getSectionScore(sectionId);
    const checked = checkedSections[sectionId];

    return (
      <div className="md-exercise-block">
        <div className="md-section-title">{section.section}</div>
        {section.items.map((item, index) => {
          const key = `${sectionId}-${index}`;
          const currentAnswer = answers[key] || '';
          const value = normalize(currentAnswer);
          const isCorrect = value === normalize(item.answer) || (item.alternatives || []).some((alt) => value === normalize(alt));
          return (
            <article key={item.prompt} className={checked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
              <strong>Situation: &quot;{item.situation}&quot;</strong>
              <label>{item.prompt}</label>
              <Form.Control
                value={currentAnswer}
                placeholder="Type the correct modal expression"
                onChange={(event) => {
                  setAnswers((current) => ({ ...current, [key]: event.target.value }));
                  setCheckedSections((current) => ({ ...current, [sectionId]: false }));
                }}
              />
              {checked ? <small>{item.answer} ({item.functionLabel})</small> : null}
            </article>
          );
        })}
        <div className="pc-exercise-actions">
          <Button variant="primary" onClick={() => setCheckedSections((current) => ({ ...current, [sectionId]: true }))}>
            Check section
          </Button>
          {checked ? <div className={`md-result ${score === section.items.length ? 'is-perfect' : ''}`}><strong>{score}/{section.items.length} correct.</strong></div> : null}
        </div>
      </div>
    );
  };

  const renderPastModalPair = (positiveIndex, negativeIndex) => (
    <div className="md-past-pair">
      {[pastModalCards[positiveIndex], pastModalCards[negativeIndex]].map((item, index) => (
        <article key={item.form} className={index === 0 ? 'is-positive' : 'is-negative'}>
          <span>{index === 0 ? 'PAST POSSIBILITY / RESULT' : 'NEGATIVE PAST MEANING'}</span>
          <h3>{item.form}</h3>
          <p>{item.meaning}</p>
          <blockquote>{item.example}</blockquote>
        </article>
      ))}
    </div>
  );

  const renderSlide = () => {
    if (slide.id === 'overview') {
      return (
        <div className="pc-slide-content">
          <div className="md-title-card">
            <span>MODALS</span>
            <p>Obligation and no obligation. Necessity and no necessity. Permission and no permission. Prohibition. Recommendation, advice, and suggestion.</p>
          </div>
          <div className="md-overview-grid">
            {overviewCards.map((card, index) => (
              <article key={card.label} style={{ '--item-delay': `${index * 0.1}s` }}>
                <span>{card.label}</span>
                <h3>{card.forms}</h3>
                <blockquote>{card.example}</blockquote>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'can-cannot') {
      return (
        <div className="pc-slide-content">
          <div className="md-can-resource">
            <a href="https://www.youtube.com/watch?v=RPDHqfX4PZQ" target="_blank" rel="noreferrer">
              Video resource: Can / Cannot in context
            </a>
          </div>
          <div className="md-can-layout">
            {canCannotContexts.map((context) => (
              <section key={context.place} className="md-can-context">
                <header>
                  <div>
                    <span>{context.place}</span>
                    <h3>{context.question}</h3>
                  </div>
                  <aside>
                    <strong>MODAL VERBS</strong>
                    <b>Can</b>
                    <b>Cannot = Can&apos;t</b>
                  </aside>
                </header>
                <div className="md-can-body">
                  <ol>
                    {context.examples.map((item) => (
                      <li key={item.sentence}>
                        <span>{item.sentence}</span>
                        <em className={`is-${item.tone}`}>{item.functionLabel}</em>
                      </li>
                    ))}
                  </ol>
                  <aside>
                    <strong>FUNCTIONS</strong>
                    <span>Ability / Inability</span>
                    <span>Prohibition</span>
                    <span>Permission / No permission</span>
                    <span>Possibility / Impossibility</span>
                  </aside>
                </div>
              </section>
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
            <p>The arrows connect real situations to modal functions.</p>
          </div>
          <ModalMatchingBoard mode="automatic" examples={guidedExamples} markerId="md-guided-arrow" />
        </div>
      );
    }

    if (slide.id === 'match') {
      return (
        <div className="pc-slide-content">
          <div className="pc-lead">
            <span>YOUR TURN</span>
            <p>Connect each sentence to the correct modal function.</p>
          </div>
          <ModalMatchingBoard mode="interactive" examples={practiceExamples} markerId="md-practice-arrow" />
        </div>
      );
    }

    if (slide.id === 'obligation') {
      return (
        <div className="pc-slide-content">
          <div className="md-rule-panel">
            <h3>Obligation and no obligation / Necessity and no necessity</h3>
            <ul>
              <li><b>Have to / need to / has to / needs to</b> = obligation or necessity.</li>
              <li><b>Must</b> = serious obligation or necessity.</li>
              <li><b>Do not have to / do not need to</b> = no obligation.</li>
            </ul>
          </div>
          {renderExerciseSection('obligation')}
        </div>
      );
    }

    if (slide.id === 'prohibition') {
      return (
        <div className="pc-slide-content">
          <div className="md-rule-panel is-prohibition">
            <h3>Prohibition</h3>
            <ul>
              <li><b>Must not</b> or <b>mustn&apos;t</b> means something is forbidden.</li>
              <li>Do not confuse <b>mustn&apos;t</b> with <b>don&apos;t have to</b>.</li>
            </ul>
          </div>
          {renderExerciseSection('prohibition')}
        </div>
      );
    }

    if (slide.id === 'permission') {
      return (
        <div className="pc-slide-content">
          <div className="md-rule-panel is-permission">
            <h3>Permission and no permission</h3>
            <ul>
              <li><b>Can</b>, <b>am/is/are allowed to</b>, and <b>am/is/are permitted to</b> express permission.</li>
              <li><b>Cannot</b>, <b>can&apos;t</b>, and <b>are not allowed to</b> express no permission.</li>
            </ul>
          </div>
          {renderExerciseSection('permission')}
        </div>
      );
    }

    if (slide.id === 'advice') {
      return (
        <div className="pc-slide-content">
          <div className="md-rule-panel is-advice">
            <h3>Recommendations / Advice</h3>
            <ul>
              <li><b>Should</b> = <b>ought to</b> for positive advice.</li>
              <li><b>Should not</b> = <b>ought not to</b> for negative advice.</li>
            </ul>
          </div>
          {renderExerciseSection('advice')}
        </div>
      );
    }

    if (slide.id === 'reading') {
      return (
        <div className="pc-slide-content">
          <article className="md-reading-paper">
            <h3>Finding Balance in a Modern Workday</h3>
            {readingParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>
        </div>
      );
    }

    if (slide.id === 'identify') {
      return (
        <div className="pc-slide-content">
          <div className="md-breakdown-list">
            {readingBreakdown.map((section, index) => (
              <article key={section.label} style={{ '--item-delay': `${index * 0.1}s` }}>
                <span>{index + 1}. {section.label}</span>
                <ul>
                  {section.examples.map((example) => <li key={example}>{example}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'past-overview') {
      return (
        <div className="pc-slide-content">
          <div className="md-past-title">
            <span>COULD HAVE · SHOULD HAVE · WOULD HAVE</span>
            <h3>modal + have + past participle</h3>
            <p>Past modals describe missed possibilities, regrets, criticism, and unreal past results.</p>
          </div>
          <div className="md-past-overview-grid">
            {pastModalCards.map((item, index) => (
              <article key={item.form} style={{ '--item-delay': `${index * 0.08}s` }}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h4>{item.form}</h4>
                <p>{item.meaning}</p>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'past-could') {
      return (
        <div className="pc-slide-content">
          <div className="md-past-formula"><strong>COULD / COULDN’T</strong><span>+</span><strong>HAVE</strong><span>+</span><strong>PAST PARTICIPLE</strong></div>
          {renderPastModalPair(0, 1)}
        </div>
      );
    }

    if (slide.id === 'past-should') {
      return (
        <div className="pc-slide-content">
          <div className="md-past-formula"><strong>SHOULD / SHOULDN’T</strong><span>+</span><strong>HAVE</strong><span>+</span><strong>PAST PARTICIPLE</strong></div>
          {renderPastModalPair(2, 3)}
        </div>
      );
    }

    if (slide.id === 'past-would') {
      return (
        <div className="pc-slide-content">
          <div className="md-past-formula"><strong>WOULD / WOULDN’T</strong><span>+</span><strong>HAVE</strong><span>+</span><strong>PAST PARTICIPLE</strong></div>
          {renderPastModalPair(4, 5)}
        </div>
      );
    }

    if (slide.id === 'past-practice') {
      return (
        <div className="pc-slide-content">
          <div className="md-past-instruction">Choose the past modal that best completes each situation.</div>
          <div className="md-past-quiz">
            {pastModalExercise.map((item, index) => {
              const isCorrect = pastAnswers[index] === item.answer;
              return (
                <article key={item.prompt} className={pastChecked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
                  <span>{index + 1}</span>
                  <div>
                    <label>{item.prompt}</label>
                    <div className="md-past-options">
                      {item.options.map((option) => (
                        <Form.Check
                          type="radio"
                          key={option}
                          id={`past-modal-${index}-${option}`}
                          name={`past-modal-${index}`}
                          label={option}
                          checked={pastAnswers[index] === option}
                          onChange={() => {
                            setPastAnswers((current) => ({ ...current, [index]: option }));
                            setPastChecked(false);
                          }}
                        />
                      ))}
                    </div>
                    {pastChecked ? (
                      <small><strong>{isCorrect ? 'Correct.' : `Answer: ${item.answer}.`}</strong> {item.explanation}</small>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="pc-exercise-actions">
            <Button variant="primary" onClick={() => setPastChecked(true)}>Check answers</Button>
            {pastChecked ? <div className={`md-result ${pastScore === pastModalExercise.length ? 'is-perfect' : ''}`}><strong>{pastScore}/{pastModalExercise.length} correct.</strong></div> : null}
          </div>
        </div>
      );
    }

    return (
      <div className="pc-slide-content">
        <div className="pc-writing-layout">
          <div>
            <div className="pc-writing-model md-writing-model">
              <span>MODEL OPENING</span>
              <blockquote>
                Students must arrive on time, but they do not have to study all night. They can ask questions, and they should review the answer key carefully.
              </blockquote>
            </div>
            <Form.Control
              as="textarea"
              rows={10}
              className="pc-writing-area"
              value={writingDraft}
              placeholder="Write your own paragraph with modals..."
              aria-label="Modals writing task"
              onChange={(event) => setWritingDraft(event.target.value)}
            />
            <div className="pc-word-count">{wordCount} words</div>
          </div>
          <aside className="pc-writing-guide md-writing-guide">
            <span>YOUR TASK</span>
            <h3>Write 70-100 words about rules, freedom, and advice.</h3>
            <p>Include at least:</p>
            <ul>
              <li><i className="fe fe-check-circle" /> one obligation <small>(must / have to)</small></li>
              <li><i className="fe fe-check-circle" /> one no-necessity idea <small>(don&apos;t have to)</small></li>
              <li><i className="fe fe-check-circle" /> one prohibition <small>(must not)</small></li>
              <li><i className="fe fe-check-circle" /> one permission <small>(can / allowed to)</small></li>
              <li><i className="fe fe-check-circle" /> one recommendation <small>(should / ought to)</small></li>
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
    <section className="pc-base-class md-base-class">
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
            <span>MODALS - BASE CLASS</span>
            <h2>{slide.title}</h2>
          </div>
          <div className="pc-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>

        {renderSlide()}

        <footer className="pc-slide-footer">
          <Button variant="light" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}>
            <i className="fe fe-arrow-left me-2" /> Previous
          </Button>
          <div className="pc-slide-dots" aria-label="Modals base class slides">
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

export default ModalsBaseClass;
