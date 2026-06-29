import { useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const readingText = [
  'Liam was tired of his office job, so last month he decided to change his career. He wanted to find something more creative. He enjoyed working with his hands, so he considered becoming a furniture maker.',
  'His friends suggested taking a weekend woodwork class first. Liam agreed to try it. On his first day, the instructor taught him how to use the tools safely. Liam learnt to cut wood precisely, but he failed to make a perfect chair on his first attempt.',
  "He didn't mind because he expected to make mistakes at the beginning. Now, Liam practices making small wooden boxes every evening. He hopes to open his own online shop next year. He misses having more free time, but he refuses to give up on his dream. He manages to balance his office job and his new hobby because he loves creating beautiful things."
];

const infinitiveExamples = [
  'decided to change',
  'wanted to find',
  'agreed to try',
  'learnt to cut',
  'failed to make',
  'expected to make',
  'hopes to open',
  'refuses to give up',
  'manages to balance'
];

const gerundExamples = [
  'enjoyed working',
  'considered becoming',
  'suggested taking',
  'practices making',
  'misses having',
  'loves creating'
];

const gerundUseCards = [
  {
    sentence: 'I enjoy drinking coffee.',
    wrong: 'I enjoy to drink coffee.',
    rule: 'Verb + gerund'
  },
  {
    sentence: 'I am interested in visiting Canada.',
    wrong: 'I am interested in visit Canada.',
    rule: 'Preposition + gerund'
  },
  {
    sentence: 'Fishing is nice.',
    wrong: 'Fish is nice.',
    rule: '-ing activity as subject'
  }
];

const infinitiveUseCards = [
  {
    sentence: 'My mother wants me to eat all my food.',
    rule: 'Infinitive after object'
  },
  {
    sentence: 'I took the time to study hard.',
    rule: 'Noun + infinitive'
  },
  {
    sentence: 'He is dumb to believe Dina.',
    rule: 'Adjective + infinitive'
  },
  {
    sentence: 'You are too naive to believe in her.',
    rule: 'Too / so + adjective + infinitive'
  }
];

const gerundItems = [
  {
    prompt: 'I really enjoy ________ dinner for my family on Sundays. (cook)',
    answer: 'cooking'
  },
  {
    prompt: 'She misses ________ near the beach now that she moved to the city. (live)',
    answer: 'living'
  },
  {
    prompt: 'You should practice ________ English every day to improve. (speak)',
    answer: 'speaking'
  },
  {
    prompt: 'My brother suggested ________ pizza for dinner tonight. (order)',
    answer: 'ordering'
  },
  {
    prompt: 'They are considering ________ a new house next year. (buy)',
    answer: 'buying'
  },
  {
    prompt: 'Do you mind ________ the window? It is warm in here. (open)',
    answer: 'opening'
  },
  {
    prompt: 'He finished ________ his book late last night. (read)',
    answer: 'reading'
  },
  {
    prompt: 'We should avoid ________ during the rush hour traffic. (drive)',
    answer: 'driving'
  },
  {
    prompt: 'She keeps ________ where she put her house keys. (forget)',
    answer: 'forgetting'
  },
  {
    prompt: 'He loves ________ landscapes with watercolors. (paint)',
    answer: 'painting'
  }
];

const infinitiveItems = [
  {
    prompt: 'We decided ________ to Italy for our summer vacation. (go)',
    answer: 'to go'
  },
  {
    prompt: 'I want ________ how to play the guitar this year. (learn)',
    answer: 'to learn'
  },
  {
    prompt: 'They hope ________ us next month if they have time. (visit)',
    answer: 'to visit'
  },
  {
    prompt: 'The driver agreed ________ at the next gas station. (stop)',
    answer: 'to stop'
  },
  {
    prompt: 'He failed ________ his driving test on the first try. (pass)',
    answer: 'to pass'
  },
  {
    prompt: 'I expect ________ at the airport around 3:00 PM. (arrive)',
    answer: 'to arrive'
  },
  {
    prompt: 'She refused ________ overtime on the weekend. (work)',
    answer: 'to work'
  },
  {
    prompt: 'We managed ________ the hotel without using a map. (find)',
    answer: 'to find'
  },
  {
    prompt: 'He promised ________ me as soon as he landed. (call)',
    answer: 'to call'
  },
  {
    prompt: 'Learn ________ "no" when you are too busy. (say)',
    answer: 'to say'
  }
];

const slides = [
  { id: 'reading', label: 'Read', title: 'Choosing a New Path' },
  { id: 'breakdown', label: 'Breakdown', title: 'Grammar Breakdown from the Text' },
  { id: 'gerunds-use', label: 'Gerunds', title: 'Gerunds Use' },
  { id: 'infinitives-use', label: 'Infinitives', title: 'Infinitives Use' },
  { id: 'gerunds-exercise', label: 'V + Gerund', title: 'Verbs + Gerunds' },
  { id: 'infinitives-exercise', label: 'V + Inf', title: 'Verbs + Infinitives' },
  { id: 'composition', label: 'Write', title: 'Composition' }
];

const normalize = (value) => value.trim().toLowerCase().replace(/[.?!]/g, '').replace(/\s+/g, ' ');

const ExerciseList = ({ items, answers, setAnswers, checked, setChecked }) => {
  const score = items.filter((item, index) => normalize(answers[index] || '') === normalize(item.answer)).length;

  return (
    <>
      <div className="gi-exercise-list">
        {items.map((item, index) => {
          const currentAnswer = answers[index] || '';
          const isCorrect = normalize(currentAnswer) === normalize(item.answer);
          return (
            <article key={item.prompt} className={checked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
              <label>{index + 1}. {item.prompt}</label>
              <Form.Control
                value={currentAnswer}
                placeholder="Type the correct form"
                onChange={(event) => {
                  setAnswers((current) => ({ ...current, [index]: event.target.value }));
                  setChecked(false);
                }}
              />
              {checked ? <small>{item.answer}</small> : null}
            </article>
          );
        })}
      </div>
      <div className="pc-exercise-actions">
        <Button variant="primary" onClick={() => setChecked(true)}>Check</Button>
        {checked ? <div className={`gi-result ${score === items.length ? 'is-perfect' : ''}`}><strong>{score}/{items.length} correct.</strong></div> : null}
      </div>
    </>
  );
};

const GerundsInfinitivesBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [gerundAnswers, setGerundAnswers] = useState({});
  const [infinitiveAnswers, setInfinitiveAnswers] = useState({});
  const [gerundsChecked, setGerundsChecked] = useState(false);
  const [infinitivesChecked, setInfinitivesChecked] = useState(false);
  const [writingDraft, setWritingDraft] = useState('');

  const slide = slides[activeSlide];
  const slideProgress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const wordCount = writingDraft.trim() ? writingDraft.trim().split(/\s+/).length : 0;

  const goToSlide = (index) => {
    setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));
  };

  const renderSlide = () => {
    if (slide.id === 'reading') {
      return (
        <div className="pc-slide-content">
          <article className="gi-reading-paper">
            <h3>Choosing a New Path</h3>
            {readingText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>
        </div>
      );
    }

    if (slide.id === 'breakdown') {
      return (
        <div className="pc-slide-content">
          <div className="gi-breakdown-board">
            <div>
              <h3>Verbs + Infinitive <small>(to + verb)</small></h3>
              <ul>
                {infinitiveExamples.map((example) => <li key={example}>{example}</li>)}
              </ul>
            </div>
            <aside>
              <strong>We use infinitives after verbs that express future plans, intentions, decisions, or promises.</strong>
            </aside>
            <div>
              <h3>Verbs + Gerund <small>(-ing)</small></h3>
              <ul>
                {gerundExamples.map((example) => <li key={example}>{example}</li>)}
              </ul>
            </div>
            <aside>
              <strong>We use gerunds after verbs that express likes/dislikes, completed actions, or ongoing habits.</strong>
            </aside>
          </div>
        </div>
      );
    }

    if (slide.id === 'gerunds-use') {
      return (
        <div className="pc-slide-content">
          <div className="gi-use-board">
            {gerundUseCards.map((item, index) => (
              <article key={item.sentence} style={{ '--item-delay': `${index * 0.12}s` }}>
                <span>{index + 1}</span>
                <div>
                  <p className="is-wrong">{item.wrong}</p>
                  <strong>{item.sentence}</strong>
                </div>
                <em>{item.rule}</em>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'infinitives-use') {
      return (
        <div className="pc-slide-content">
          <div className="gi-use-board gi-infinitive-board">
            {infinitiveUseCards.map((item, index) => (
              <article key={item.sentence} style={{ '--item-delay': `${index * 0.12}s` }}>
                <span>{index + 1}</span>
                <strong>{item.sentence}</strong>
                <em>{item.rule}</em>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'gerunds-exercise') {
      return (
        <div className="pc-slide-content">
          <div className="gi-section-title">Verbs + Gerunds</div>
          <ExerciseList
            items={gerundItems}
            answers={gerundAnswers}
            setAnswers={setGerundAnswers}
            checked={gerundsChecked}
            setChecked={setGerundsChecked}
          />
        </div>
      );
    }

    if (slide.id === 'infinitives-exercise') {
      return (
        <div className="pc-slide-content">
          <div className="gi-section-title">Verbs + Infinitives</div>
          <ExerciseList
            items={infinitiveItems}
            answers={infinitiveAnswers}
            setAnswers={setInfinitiveAnswers}
            checked={infinitivesChecked}
            setChecked={setInfinitivesChecked}
          />
        </div>
      );
    }

    return (
      <div className="pc-slide-content">
        <div className="pc-writing-layout">
          <div>
            <div className="pc-writing-model gi-writing-model">
              <span>MODEL OPENING</span>
              <blockquote>
                Next year, I hope to graduate from my current course with good grades. I have decided to look for a job in a dynamic and creative company. Therefore, I enjoy learning new skills.
              </blockquote>
            </div>
            <Form.Control
              as="textarea"
              rows={10}
              className="pc-writing-area"
              value={writingDraft}
              placeholder="Write your own four-paragraph composition here..."
              aria-label="Gerunds and infinitives composition"
              onChange={(event) => setWritingDraft(event.target.value)}
            />
            <div className="pc-word-count">{wordCount} words</div>
          </div>
          <aside className="pc-writing-guide gi-writing-guide">
            <span>YOUR COMPOSITION</span>
            <h3>Write 4 short paragraphs about your future life as a student and worker.</h3>
            <p>Include at least:</p>
            <ul>
              <li><i className="fe fe-check-circle" /> three infinitives <small>(hope to, want to, decide to)</small></li>
              <li><i className="fe fe-check-circle" /> three gerunds <small>(enjoy learning, avoid wasting)</small></li>
              <li><i className="fe fe-check-circle" /> one reason for your future plan</li>
              <li><i className="fe fe-check-circle" /> one final conclusion</li>
            </ul>
            <div className={wordCount >= 80 ? 'is-ready' : ''}>
              <strong>{wordCount}/80 minimum words</strong>
              <span>{wordCount >= 80 ? 'Your composition is ready to review.' : `${Math.max(0, 80 - wordCount)} more words to reach the minimum.`}</span>
            </div>
          </aside>
        </div>
      </div>
    );
  };

  return (
    <section className="pc-base-class gi-base-class">
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
            <span>VERBS + GERUNDS / INFINITIVES - BASE CLASS</span>
            <h2>{slide.title}</h2>
          </div>
          <div className="pc-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>

        {renderSlide()}

        <footer className="pc-slide-footer">
          <Button variant="light" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}>
            <i className="fe fe-arrow-left me-2" /> Previous
          </Button>
          <div className="pc-slide-dots" aria-label="Verbs plus gerunds and infinitives base class slides">
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

export default GerundsInfinitivesBaseClass;
