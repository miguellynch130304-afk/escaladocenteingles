import { useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const conditionalTypes = [
  {
    id: 'zero',
    name: 'Zero Conditional',
    timeline: 'Present → Present',
    form: 'If + Present Simple, Present Simple',
    use: 'General truths, routines, and results that always or normally happen.',
    examples: [
      'If you eat too much sugar, you get sick.',
      'You get sick if you eat too much sugar.',
      'If you do not work, you do not eat.'
    ]
  },
  {
    id: 'first',
    name: 'First Conditional',
    timeline: 'Present → Future',
    form: 'If + Present Simple, will + base verb',
    use: 'A real or likely future situation and its probable result.',
    examples: [
      'If you study, you will succeed.',
      'You will succeed if you study.'
    ]
  },
  {
    id: 'second',
    name: 'Second Conditional',
    timeline: 'Past form → Would / Could + base verb',
    form: 'If + Past Simple, would / could + base verb',
    use: 'An unreal, imaginary, or unlikely present or future situation.',
    examples: [
      'If I had money, I would buy a house.',
      'I would buy a house if I had money.'
    ]
  },
  {
    id: 'third',
    name: 'Third Conditional',
    timeline: 'Past Perfect → Would / Could have + participle',
    form: 'If + Past Perfect, would / could have + past participle',
    use: 'An unreal past result, regret, or reflection about something that did not happen.',
    examples: [
      'If you had been responsible, you would have gotten a promotion.',
      'You would have gotten a promotion if you had been responsible.'
    ]
  }
];

const comparisonRows = [
  { type: 'Zero', sentence: 'If you are responsible, you get a promotion.', meaning: 'General information' },
  { type: 'First', sentence: 'If you are responsible, you will get a promotion.', meaning: 'Real future situation' },
  { type: 'Second', sentence: 'If you were responsible, you would get a promotion.', meaning: 'Unreal present situation' },
  { type: 'Third', sentence: 'If you had been responsible, you would have gotten a promotion.', meaning: 'Unreal past / reflection' }
];

const choiceItems = [
  {
    options: ['If I move to Boston, I live on Main Street.', "If I move to Boston, I'll live on Main Street."],
    answer: "If I move to Boston, I'll live on Main Street."
  },
  {
    options: ["If you call your mother, she'll be very happy.", "If you'll call your mother, she'll be very happy."],
    answer: "If you call your mother, she'll be very happy."
  },
  {
    options: ["If the mechanic fixes our car on time, we'll drive to Center Ville.", "If the mechanic will fix our car, we drive to Center Ville."],
    answer: "If the mechanic fixes our car on time, we'll drive to Center Ville."
  },
  {
    options: ["If it rains today, we won't go to the park.", "If it'll rain today, we won't go to the park."],
    answer: "If it rains today, we won't go to the park."
  },
  {
    options: ["If I'm not in a hurry tonight, I'll write to her.", "If I'm not in a hurry tonight, I write to her."],
    answer: "If I'm not in a hurry tonight, I'll write to her."
  },
  {
    options: ["If she isn't sick, she'll go to school.", "If she won't be sick, she goes to school."],
    answer: "If she isn't sick, she'll go to school."
  },
  {
    options: ["If they're tired tomorrow, they won't go to work.", "If they'll be tired tomorrow, they don't go to work."],
    answer: "If they're tired tomorrow, they won't go to work."
  },
  {
    options: ["If John doesn't buy a new car, he'll buy a motorcycle.", "If John won't buy a new car, he buys a motorcycle."],
    answer: "If John doesn't buy a new car, he'll buy a motorcycle."
  }
];

const openPrompts = [
  'If the weather is bad tomorrow, ...',
  'If we hitchhike to work, ...',
  "If I don't sleep well tonight, ...",
  "If you don't fix the broken window, ...",
  "If he doesn't cut his hair, ...",
  "If ..., they'll go to a restaurant tonight.",
  'If ..., his mother will be happy.',
  'If ..., his mother will be sad.',
  'If ..., her boss will fire her.',
  'If ..., their friends will be angry.'
];

const slides = [
  { id: 'zero', label: 'Zero', title: 'Zero Conditional' },
  { id: 'first', label: 'First', title: 'First Conditional' },
  { id: 'second', label: 'Second', title: 'Second Conditional' },
  { id: 'third', label: 'Third', title: 'Third Conditional' },
  { id: 'compare', label: 'Compare', title: 'Compare the Four Conditionals' },
  { id: 'choose', label: 'Choose', title: 'Choose the Correct Conditional Form' },
  { id: 'create', label: 'Create', title: 'Complete the Conditions' }
];

const ConditionalsBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [choiceAnswers, setChoiceAnswers] = useState({});
  const [choiceChecked, setChoiceChecked] = useState(false);
  const [openAnswers, setOpenAnswers] = useState({});

  const slide = slides[activeSlide];
  const slideProgress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const choiceScore = choiceItems.filter((item, index) => choiceAnswers[index] === item.answer).length;
  const draftedCount = openPrompts.filter((item, index) => (openAnswers[index] || '').trim()).length;
  const goToSlide = (index) => setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));

  const renderType = (type) => (
    <div className="pc-slide-content">
      <article className={`cn-type-card is-${type.id}`}>
        <header>
          <span>{type.name}</span>
          <h3>{type.timeline}</h3>
        </header>
        <div className="cn-type-body">
          <section><small>FORM</small><strong>{type.form}</strong></section>
          <section><small>USE</small><p>{type.use}</p></section>
          <section className="cn-examples">
            <small>EXAMPLES</small>
            {type.examples.map((example) => <blockquote key={example}>{example}</blockquote>)}
          </section>
        </div>
      </article>
      <div className="cn-order-note"><i className="fe fe-repeat" /><span>The if-clause can come first or second. Use a comma only when the if-clause comes first.</span></div>
    </div>
  );

  const renderSlide = () => {
    const type = conditionalTypes.find((item) => item.id === slide.id);
    if (type) return renderType(type);

    if (slide.id === 'compare') {
      return (
        <div className="pc-slide-content">
          <div className="cn-comparison">
            {comparisonRows.map((row, index) => (
              <article key={row.type} style={{ '--item-delay': `${index * 0.1}s` }}>
                <span>{index + 1}</span>
                <strong>{row.type} Conditional</strong>
                <p>{row.sentence}</p>
                <em>{row.meaning}</em>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'choose') {
      return (
        <div className="pc-slide-content">
          <div className="cn-instruction">Choose the grammatically correct First Conditional sentence.</div>
          <div className="cn-choice-list">
            {choiceItems.map((item, index) => {
              const isCorrect = choiceAnswers[index] === item.answer;
              return (
                <article key={item.answer} className={choiceChecked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
                  <span>{index + 1}</span>
                  <div>
                    {item.options.map((option) => (
                      <Form.Check
                        type="radio"
                        key={option}
                        id={`conditional-${index}-${option}`}
                        name={`conditional-${index}`}
                        label={option}
                        checked={choiceAnswers[index] === option}
                        onChange={() => {
                          setChoiceAnswers((current) => ({ ...current, [index]: option }));
                          setChoiceChecked(false);
                        }}
                      />
                    ))}
                    {choiceChecked ? <small>{isCorrect ? 'Correct' : `Answer: ${item.answer}`}</small> : null}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="pc-exercise-actions">
            <Button variant="primary" onClick={() => setChoiceChecked(true)}>Check answers</Button>
            {choiceChecked ? <div className={`cn-result ${choiceScore === choiceItems.length ? 'is-perfect' : ''}`}><strong>{choiceScore}/{choiceItems.length} correct</strong></div> : null}
          </div>
        </div>
      );
    }

    return (
      <div className="pc-slide-content">
        <div className="cn-instruction">Complete each First Conditional sentence with your own logical result or condition.</div>
        <div className="cn-open-list">
          {openPrompts.map((prompt, index) => (
            <article key={prompt}>
              <span>{index + 1}</span>
              <label>{prompt}</label>
              <Form.Control
                value={openAnswers[index] || ''}
                placeholder="Complete the idea"
                onChange={(event) => setOpenAnswers((current) => ({ ...current, [index]: event.target.value }))}
              />
            </article>
          ))}
        </div>
        <div className="cn-draft-progress"><strong>{draftedCount}/{openPrompts.length} completed</strong><ProgressBar now={(draftedCount / openPrompts.length) * 100} /></div>
      </div>
    );
  };

  return (
    <section className="pc-base-class cn-base-class">
      <div className="pc-class-toolbar">
        <Button variant="link" className="pc-class-exit" onClick={onBack}><i className="fe fe-arrow-left" /> Back to modules</Button>
        <div className="pc-class-progress">
          <div><span>BASE CLASS</span><small>Slide {activeSlide + 1} of {slides.length}</small></div>
          <ProgressBar now={slideProgress} />
        </div>
      </div>

      <div className="pc-slide-shell" key={slide.id}>
        <header className="pc-slide-header">
          <div><span>CONDITIONALS · BASE CLASS</span><h2>{slide.title}</h2></div>
          <div className="pc-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>
        {renderSlide()}
        <footer className="pc-slide-footer">
          <Button variant="light" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}><i className="fe fe-arrow-left me-2" /> Previous</Button>
          <div className="pc-slide-dots" aria-label="Conditionals base class slides">
            {slides.map((item, index) => (
              <button type="button" key={item.id} className={index === activeSlide ? 'is-active' : ''} onClick={() => goToSlide(index)} aria-label={`Open slide ${index + 1}: ${item.label}`}>
                <span>{index + 1}</span><small>{item.label}</small>
              </button>
            ))}
          </div>
          {activeSlide < slides.length - 1 ? (
            <Button variant="primary" onClick={() => goToSlide(activeSlide + 1)}>Next <i className="fe fe-arrow-right ms-2" /></Button>
          ) : (
            <Button variant="primary" onClick={onComplete}>Continue to Exam-Focused Lesson <i className="fe fe-arrow-right ms-2" /></Button>
          )}
        </footer>
      </div>
    </section>
  );
};

export default ConditionalsBaseClass;
