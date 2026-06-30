import { useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const howItems = [
  { prompt: '_____ ministers are there in the government?', answer: 'How many', function: 'Countable quantity' },
  { prompt: '_____ money do you have?', answer: 'How much', function: 'Uncountable quantity' },
  { prompt: '_____ can you walk?', answer: 'How far', function: 'Distance' },
  { prompt: '_____ is he?', answer: 'How tall', function: 'Height' },
  { prompt: '_____ can you drive?', answer: 'How fast', function: 'Speed' },
  { prompt: '_____ is he?', answer: 'How old', function: 'Age' }
];

const howOptions = ['How many', 'How much', 'How far', 'How tall', 'How fast', 'How old'];

const howCategories = [
  {
    title: 'Quantity & Amount',
    forms: 'How many / How much',
    description: 'How many asks about plural countable nouns. How much asks about uncountable nouns or a total price.',
    examples: ['How many apples are in the basket?', 'How much sugar do you need?', 'How much money does this cost?']
  },
  {
    title: 'Distance & Proximity',
    forms: 'How far / How near',
    description: 'How far asks about overall distance. How near emphasizes close proximity.',
    examples: ['How far is the airport from here?', 'How near is the closest gas station?']
  },
  {
    title: 'Height & Speed',
    forms: 'How tall / How short · How fast / How slow',
    description: 'These adjective forms measure vertical height, movement speed, or performance.',
    examples: ['How tall is your brother?', 'How short is the grass?', 'How fast does this car go?', 'How slow is your laptop today?']
  },
  {
    title: 'Age & Time',
    forms: 'How old / How young',
    description: 'How old is the standard age question. How young is used less often, usually to emphasize youth.',
    examples: ['How old is he?', 'How old is that castle?', 'How young is he to be a doctor?']
  }
];

const countQuantifiers = [
  { quantity: 'A very large quantity', sentence: 'I have a lot of / several dollars.' },
  { quantity: 'A regular positive quantity', sentence: 'I have some dollars.' },
  { quantity: 'A regular negative quantity', sentence: 'I do not have many dollars.' },
  { quantity: 'A small quantity', sentence: 'I have a few dollars.' },
  { quantity: 'Zero quantity', sentence: 'I do not have any dollars.' }
];

const nonCountQuantifiers = [
  { quantity: 'A very large quantity', sentence: 'I have a lot of money.' },
  { quantity: 'A regular positive quantity', sentence: 'I have some money.' },
  { quantity: 'A regular negative quantity', sentence: 'I do not have much money.' },
  { quantity: 'A small quantity', sentence: 'I have a little money.' },
  { quantity: 'Zero quantity', sentence: 'I do not have any money.' }
];

const quantifierExercises = [
  { prompt: 'How _____ books do you have?', options: ['many', 'much'], answer: 'many' },
  { prompt: 'I have _____ useful books for this course.', options: ['some', 'much'], answer: 'some' },
  { prompt: 'There are only _____ chairs left.', options: ['a few', 'a little'], answer: 'a few' },
  { prompt: 'We do not have _____ notebooks.', options: ['any', 'a little'], answer: 'any' },
  { prompt: 'How _____ time do we have?', options: ['many', 'much'], answer: 'much' },
  { prompt: 'I need _____ information before I decide.', options: ['some', 'many'], answer: 'some' },
  { prompt: 'There is only _____ water in the bottle.', options: ['a few', 'a little'], answer: 'a little' },
  { prompt: 'She does not have _____ money with her.', options: ['any', 'a few'], answer: 'any' }
];

const slides = [
  { id: 'hows-map', label: 'The Hows', title: 'The Hows' },
  { id: 'hows-guide', label: 'Meaning', title: 'What Does Each “How” Ask?' },
  { id: 'hows-practice', label: 'Practice', title: 'Complete the Hows' },
  { id: 'quantifier-map', label: 'Quantifiers', title: 'Quantifiers: Count and Non-Count' },
  { id: 'count-guide', label: 'Count', title: 'Quantifiers with Count Nouns' },
  { id: 'count-practice', label: 'Try Count', title: 'Count Noun Practice' },
  { id: 'noncount-guide', label: 'Non-Count', title: 'Quantifiers with Non-Count Nouns' },
  { id: 'noncount-practice', label: 'Try Non-Count', title: 'Non-Count Noun Practice' },
  { id: 'mixed-review', label: 'Review', title: 'Mixed Review' }
];

const SelectExercise = ({ items, answers, setAnswers, checked, setChecked }) => {
  const score = items.filter((item, index) => answers[index] === item.answer).length;

  return (
    <>
      <div className="hq-exercise-grid">
        {items.map((item, index) => {
          const isCorrect = answers[index] === item.answer;
          return (
            <article key={item.prompt} className={checked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
              <span>{index + 1}</span>
              <label>{item.prompt}</label>
              <Form.Select
                value={answers[index] || ''}
                aria-label={`Answer for question ${index + 1}`}
                onChange={(event) => {
                  setAnswers((current) => ({ ...current, [index]: event.target.value }));
                  setChecked(false);
                }}
              >
                <option value="">Choose an answer</option>
                {item.options.map((option) => <option key={option} value={option}>{option}</option>)}
              </Form.Select>
              {checked ? <small>{isCorrect ? 'Correct' : `Answer: ${item.answer}`}</small> : null}
            </article>
          );
        })}
      </div>
      <div className="pc-exercise-actions">
        <Button variant="primary" onClick={() => setChecked(true)}>Check answers</Button>
        {checked ? <div className={`hq-score ${score === items.length ? 'is-perfect' : ''}`}><strong>{score}/{items.length} correct</strong></div> : null}
      </div>
    </>
  );
};

const HowsQuantifiersBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [howAnswers, setHowAnswers] = useState({});
  const [howsChecked, setHowsChecked] = useState(false);
  const [countAnswers, setCountAnswers] = useState({});
  const [countChecked, setCountChecked] = useState(false);
  const [nonCountAnswers, setNonCountAnswers] = useState({});
  const [nonCountChecked, setNonCountChecked] = useState(false);

  const slide = slides[activeSlide];
  const slideProgress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const countItems = quantifierExercises.slice(0, 4);
  const nonCountItems = quantifierExercises.slice(4);

  const goToSlide = (index) => setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));

  const renderHowExercise = () => {
    const score = howItems.filter((item, index) => howAnswers[index] === item.answer).length;
    return (
      <>
        <div className="hq-how-exercise">
          {howItems.map((item, index) => {
            const isCorrect = howAnswers[index] === item.answer;
            return (
              <article key={item.prompt} className={howsChecked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
                <span>{index + 1}</span>
                <Form.Select
                  value={howAnswers[index] || ''}
                  aria-label={`How form for question ${index + 1}`}
                  onChange={(event) => {
                    setHowAnswers((current) => ({ ...current, [index]: event.target.value }));
                    setHowsChecked(false);
                  }}
                >
                  <option value="">How ...?</option>
                  {howOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </Form.Select>
                <strong>{item.prompt.replace('_____', '')}</strong>
                <em>{howsChecked ? item.function : 'Choose the right form'}</em>
              </article>
            );
          })}
        </div>
        <div className="pc-exercise-actions">
          <Button variant="primary" onClick={() => setHowsChecked(true)}>Check the Hows</Button>
          {howsChecked ? <div className={`hq-score ${score === howItems.length ? 'is-perfect' : ''}`}><strong>{score}/{howItems.length} correct</strong></div> : null}
        </div>
      </>
    );
  };

  const renderQuantifierGuide = (type) => {
    const isCount = type === 'count';
    const rows = isCount ? countQuantifiers : nonCountQuantifiers;
    return (
      <div className="hq-quantifier-board">
        <div className="hq-quantifier-question">
          How <mark>{isCount ? 'many' : 'much'}</mark> {isCount ? 'dollars' : 'money'} do you have?
        </div>
        <div className="hq-quantifier-layout">
          <div>
            {rows.map((row) => (
              <article key={row.quantity}>
                <span>{row.quantity}</span>
                <strong>{row.sentence}</strong>
              </article>
            ))}
          </div>
          <aside>
            {(isCount ? ['many', 'a lot of / several', 'a few', 'any', 'some'] : ['much', 'a lot of', 'a little', 'any', 'some']).map((word) => <strong key={word}>{word}</strong>)}
          </aside>
        </div>
      </div>
    );
  };

  const renderSlide = () => {
    if (slide.id === 'hows-map') {
      return (
        <div className="pc-slide-content">
          <div className="hq-formula"><strong>HOW + ADVERB</strong><strong>HOW + ADJECTIVE</strong></div>
          {renderHowExercise()}
        </div>
      );
    }

    if (slide.id === 'hows-guide') {
      return (
        <div className="pc-slide-content">
          <div className="hq-category-grid">
            {howCategories.map((category, index) => (
              <article key={category.title} style={{ '--item-delay': `${index * 0.1}s` }}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{category.title}</h3>
                <strong>{category.forms}</strong>
                <p>{category.description}</p>
                <ul>{category.examples.map((example) => <li key={example}>{example}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'hows-practice') {
      return <div className="pc-slide-content"><div className="hq-instruction">Complete each question with the right adverb or adjective.</div>{renderHowExercise()}</div>;
    }

    if (slide.id === 'quantifier-map') {
      return (
        <div className="pc-slide-content">
          <div className="hq-quantifier-intro">
            <span>QUANTIFIERS</span>
            <h3>Words and phrases that express quantity</h3>
            <div>
              <article><strong>COUNT NOUNS</strong><p>Things we can count one by one.</p><em>one dollar · two dollars · many books</em></article>
              <article><strong>NON-COUNT NOUNS</strong><p>Materials, liquids, ideas, and amounts we do not count individually.</p><em>money · water · time · information</em></article>
            </div>
          </div>
        </div>
      );
    }

    if (slide.id === 'count-guide') return <div className="pc-slide-content">{renderQuantifierGuide('count')}</div>;
    if (slide.id === 'noncount-guide') return <div className="pc-slide-content">{renderQuantifierGuide('noncount')}</div>;

    if (slide.id === 'count-practice') {
      return <div className="pc-slide-content"><div className="hq-instruction">Choose the correct quantifier for each count noun.</div><SelectExercise items={countItems} answers={countAnswers} setAnswers={setCountAnswers} checked={countChecked} setChecked={setCountChecked} /></div>;
    }

    if (slide.id === 'noncount-practice') {
      return <div className="pc-slide-content"><div className="hq-instruction">Choose the correct quantifier for each non-count noun.</div><SelectExercise items={nonCountItems} answers={nonCountAnswers} setAnswers={setNonCountAnswers} checked={nonCountChecked} setChecked={setNonCountChecked} /></div>;
    }

    return (
      <div className="pc-slide-content">
        <div className="hq-review-grid">
          <article><span>01</span><h3>Ask about quantity</h3><p><strong>How many</strong> + plural count noun</p><p><strong>How much</strong> + non-count noun</p></article>
          <article><span>02</span><h3>Ask about measurements</h3><p><strong>How far, how near, how tall, how short, how fast, how slow, how old</strong></p></article>
          <article><span>03</span><h3>Count nouns</h3><p><strong>many, a lot of, several, a few, some, any</strong></p></article>
          <article><span>04</span><h3>Non-count nouns</h3><p><strong>much, a lot of, a little, some, any</strong></p></article>
        </div>
      </div>
    );
  };

  return (
    <section className="pc-base-class hq-base-class">
      <div className="pc-class-toolbar">
        <Button variant="link" className="pc-class-exit" onClick={onBack}><i className="fe fe-arrow-left" /> Back to modules</Button>
        <div className="pc-class-progress">
          <div><span>BASE CLASS</span><small>Slide {activeSlide + 1} of {slides.length}</small></div>
          <ProgressBar now={slideProgress} />
        </div>
      </div>

      <div className="pc-slide-shell" key={slide.id}>
        <header className="pc-slide-header">
          <div><span>THE HOWS AND QUANTIFIERS · BASE CLASS</span><h2>{slide.title}</h2></div>
          <div className="pc-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>
        {renderSlide()}
        <footer className="pc-slide-footer">
          <Button variant="light" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}><i className="fe fe-arrow-left me-2" /> Previous</Button>
          <div className="pc-slide-dots" aria-label="The hows and quantifiers base class slides">
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

export default HowsQuantifiersBaseClass;
