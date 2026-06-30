import { useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const readingParagraphs = [
  <>
    Last year, Elena decided to climb Mt. Kilimanjaro. <mark>Before that trip, she <strong>had never hiked</strong> a mountain in her life.</mark> She was nervous, but she <em>has practiced</em> every day for the last six months to prepare. By the time she reaches the summit next week, she <b>will have walked</b> over 50 miles in high altitude.
  </>,
  <>
    She is proud because she <em>has already raised</em> $5,000 for charity through this climb. By the end of this year, she <b>will have completed</b> three major peaks on three different continents.
  </>
];

const tenseSummary = [
  {
    tense: 'Present Perfect',
    structure: 'have / has + past participle',
    example: 'I have lived here for five years.',
    timeline: 'Past to present'
  },
  {
    tense: 'Past Perfect',
    structure: 'had + past participle',
    example: 'The bus had left when I arrived.',
    timeline: 'Past before past'
  },
  {
    tense: 'Future Perfect',
    structure: 'will have + past participle',
    example: 'By 9 p.m., I will have eaten.',
    timeline: 'Completed before a future deadline'
  }
];

const functionCards = [
  {
    tense: 'Present Perfect',
    structure: 'have / has + past participle',
    description: 'Connects a past action to the present when the exact finished time is unknown or unimportant.',
    points: [
      'Non-specific past experience: I have visited Paris.',
      'A state from the past to the present: I have lived here for five years.',
      'A recently completed action: Something has just finished.',
      'A present result: I have lost my keys.'
    ]
  },
  {
    tense: 'Past Perfect',
    structure: 'had + past participle',
    description: 'Shows that one past action was completed before another past action.',
    points: [
      'Past of the past: The bus had left when I arrived.',
      'Cause and effect: She was tired because she had stayed up all night.'
    ]
  },
  {
    tense: 'Future Perfect',
    structure: 'will have + past participle',
    description: 'Looks back from a future point to an action completed before that deadline.',
    points: [
      'By 9 p.m., I will have eaten.',
      'By next year, they will have built the house.'
    ]
  }
];

const gapItems = [
  {
    prompt: "I can't go to the cinema because I ________ that movie. (already / see)",
    answer: 'have already seen',
    functionLabel: 'Completion'
  },
  {
    prompt: "I can't go to the cinema because I ________ that movie. (just / see)",
    answer: 'have just seen',
    functionLabel: 'Recent completion'
  },
  {
    prompt: "I can't go to the cinema because I ________ that movie. (still / not see)",
    answer: "still haven't seen",
    functionLabel: 'No completion'
  },
  {
    prompt: 'I can go to the cinema because I ________ that movie. (not see / yet)',
    answer: "haven't seen yet",
    functionLabel: 'No completion'
  },
  {
    prompt: 'When I got home, I realized I ________ my keys at the office. (forget)',
    answer: 'had forgotten',
    functionLabel: 'Past before past'
  },
  {
    prompt: 'By the end of this course, we ________ all the English tenses. (learn)',
    answer: 'will have learned',
    functionLabel: 'Future completion'
  },
  {
    prompt: "She was hungry because she ________ anything since breakfast. (not eat)",
    answer: "hadn't eaten",
    functionLabel: 'Earlier past cause'
  },
  {
    prompt: 'How long ________ your best friend? (you / know)',
    answer: 'have you known',
    functionLabel: 'Past to present'
  }
];

const contrastExamples = [
  {
    source: 'I started this book yesterday. I am still reading it.',
    answer: 'I have started reading it.',
    tense: 'Present Perfect',
    functionLabel: 'Past action connected to the present'
  },
  {
    source: 'The movie started at 7:00. We arrived at 7:15.',
    answer: 'The movie had already started when we arrived.',
    tense: 'Past Perfect',
    functionLabel: 'Earlier event in the past'
  },
  {
    source: 'The project deadline is Friday. I will finish it on Thursday.',
    answer: 'By Friday, I will have finished the project.',
    tense: 'Future Perfect',
    functionLabel: 'Completed before a future deadline'
  }
];

const slides = [
  { id: 'reading', label: 'Read', title: 'The World Traveler' },
  { id: 'summary', label: 'Form', title: 'Grammar Summary' },
  { id: 'functions', label: 'Functions', title: 'Perfect Tense Functions' },
  { id: 'practice', label: 'Complete', title: 'Fill in the Blanks' },
  { id: 'contrast', label: 'Compare', title: 'Sentences Using Different Perfect Tenses' }
];

const normalize = (value) => value.trim().toLowerCase().replace(/[.?!]/g, '').replace(/\s+/g, ' ');

const PerfectTensesBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const slide = slides[activeSlide];
  const slideProgress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const score = gapItems.filter((item, index) => normalize(answers[index] || '') === normalize(item.answer)).length;
  const goToSlide = (index) => setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));

  const renderSlide = () => {
    if (slide.id === 'reading') {
      return (
        <div className="pc-slide-content">
          <article className="pt-reading">
            <h3>“The World Traveler”</h3>
            {readingParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <div className="pt-reading-key">
              <span><i /> Past Perfect</span>
              <span><i /> Present Perfect</span>
              <span><i /> Future Perfect</span>
            </div>
          </article>
        </div>
      );
    }

    if (slide.id === 'summary') {
      return (
        <div className="pc-slide-content">
          <div className="pt-summary">
            {tenseSummary.map((item, index) => (
              <article key={item.tense} style={{ '--item-delay': `${index * 0.12}s` }}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.tense}</h3>
                <strong>{item.structure}</strong>
                <p>{item.example}</p>
                <em>{item.timeline}</em>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'functions') {
      return (
        <div className="pc-slide-content">
          <div className="pt-functions">
            {functionCards.map((item) => (
              <article key={item.tense}>
                <div><h3>{item.tense}</h3><strong>{item.structure}</strong></div>
                <p>{item.description}</p>
                <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'practice') {
      return (
        <div className="pc-slide-content">
          <div className="pt-instruction">Complete each sentence with the Present, Past, or Future Perfect.</div>
          <div className="pt-gap-list">
            {gapItems.map((item, index) => {
              const isCorrect = normalize(answers[index] || '') === normalize(item.answer);
              return (
                <article key={item.prompt} className={checked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
                  <span>{index + 1}</span>
                  <label>{item.prompt}</label>
                  <Form.Control
                    value={answers[index] || ''}
                    placeholder="Type the complete verb phrase"
                    onChange={(event) => {
                      setAnswers((current) => ({ ...current, [index]: event.target.value }));
                      setChecked(false);
                    }}
                  />
                  {checked ? <small><strong>{item.answer}</strong> · {item.functionLabel}</small> : null}
                </article>
              );
            })}
          </div>
          <div className="pc-exercise-actions">
            <Button variant="primary" onClick={() => setChecked(true)}>Check answers</Button>
            {checked ? <div className={`pt-result ${score === gapItems.length ? 'is-perfect' : ''}`}><strong>{score}/{gapItems.length} correct</strong></div> : null}
          </div>
        </div>
      );
    }

    return (
      <div className="pc-slide-content">
        <div className="pt-contrast">
          {contrastExamples.map((item, index) => (
            <article key={item.source}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><small>Starting information</small><p>{item.source}</p></div>
              <i className="fe fe-arrow-right" />
              <div><small>{item.tense}</small><strong>{item.answer}</strong><em>{item.functionLabel}</em></div>
            </article>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="pc-base-class pt-base-class">
      <div className="pc-class-toolbar">
        <Button variant="link" className="pc-class-exit" onClick={onBack}><i className="fe fe-arrow-left" /> Back to modules</Button>
        <div className="pc-class-progress">
          <div><span>BASE CLASS</span><small>Slide {activeSlide + 1} of {slides.length}</small></div>
          <ProgressBar now={slideProgress} />
        </div>
      </div>

      <div className="pc-slide-shell" key={slide.id}>
        <header className="pc-slide-header">
          <div><span>PERFECT TENSES · BASE CLASS</span><h2>{slide.title}</h2></div>
          <div className="pc-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>
        {renderSlide()}
        <footer className="pc-slide-footer">
          <Button variant="light" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}><i className="fe fe-arrow-left me-2" /> Previous</Button>
          <div className="pc-slide-dots" aria-label="Perfect tenses base class slides">
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

export default PerfectTensesBaseClass;
