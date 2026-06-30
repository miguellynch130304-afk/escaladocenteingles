import { useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const formulaRows = [
  { tense: 'Present Simple', structure: 'am / is / are + past participle', example: 'Pisco is produced in Peru.' },
  { tense: 'Past Simple', structure: 'was / were + past participle', example: 'The television was invented by Baird.' },
  { tense: 'Future', structure: 'will be + past participle', example: 'The car will be repaired tomorrow.' },
  { tense: 'Present Continuous', structure: 'am / is / are being + past participle', example: 'Coffee is being grown in Brazil.' },
  { tense: 'Past Continuous', structure: 'was / were being + past participle', example: 'The stew was being cooked by Omar.' },
  { tense: 'Present Perfect', structure: 'have / has been + past participle', example: 'A law has been written.' },
  { tense: 'Modals', structure: 'modal + be + past participle', example: 'The exam can be taken by the students.' }
];

const guidedTransformations = [
  { active: 'Pepe cooks ceviche.', passive: 'Ceviche is cooked by Pepe.', verb: 'cook · cooked · cooked' },
  { active: 'Peru produced pisco.', passive: 'Pisco was produced in Peru.', verb: 'produce · produced · produced' },
  { active: 'Juan is eating seco.', passive: 'Seco is being eaten by Juan.', verb: 'eat · ate · eaten' },
  { active: 'Omar was cooking ceviche.', passive: 'Ceviche was being cooked by Omar.', verb: 'cook · cooked · cooked' },
  { active: 'The minister has written a law.', passive: 'A law has been written by the minister.', verb: 'write · wrote · written' },
  { active: 'The minister can speak to the press.', passive: 'The press can be spoken to by the minister.', verb: 'speak · spoke · spoken' }
];

const transformationExercises = [
  { prompt: 'Luis Enrique is training the national team.', answer: 'The national team is being trained by Luis Enrique' },
  { prompt: 'Peru produces pisco.', answer: 'Pisco is produced in Peru' },
  { prompt: 'Marita drank wine.', answer: 'Wine was drunk by Marita' },
  { prompt: 'Omar is cooking stew.', answer: 'Stew is being cooked by Omar' },
  { prompt: 'The president has spoken to the nation.', answer: 'The nation has been spoken to by the president' },
  { prompt: 'The minister was speaking to the press.', answer: 'The press was being spoken to by the minister' },
  { prompt: 'The students can take the exam.', answer: 'The exam can be taken by the students' }
];

const passiveFormExercises = [
  { prompt: 'TV / invent / Baird', answer: 'TV was invented by Baird', tense: 'Past Simple passive' },
  { prompt: 'Pyramids / build / Egyptians', answer: 'Pyramids were built by Egyptians', tense: 'Past Simple passive' },
  { prompt: 'milk / produce / cows', answer: 'Milk is produced by cows', tense: 'Present Simple passive' },
  { prompt: 'coffee / grow / in Brazil', answer: 'Coffee is being grown in Brazil', tense: 'Present Continuous passive' },
  { prompt: 'chopsticks / use / in China', answer: 'Chopsticks are used in China', tense: 'Present Simple passive' },
  { prompt: 'plants / water / every day', answer: 'Plants are watered every day', tense: 'Present Simple passive' },
  { prompt: 'the thief / arrest / policeman / yesterday', answer: 'The thief was arrested by the policeman yesterday', tense: 'Past Simple passive' },
  { prompt: 'the injured man / take to a hospital / now', answer: 'The injured man is being taken to a hospital now', tense: 'Present Continuous passive' },
  { prompt: 'the car / repair / tomorrow', answer: 'The car will be repaired tomorrow', tense: 'Future passive' },
  { prompt: 'the letter / send / last week', answer: 'The letter was sent last week', tense: 'Past Simple passive' }
];

const slides = [
  { id: 'formula', label: 'Form', title: 'Passive Voice Formulas' },
  { id: 'functions', label: 'Functions', title: 'Functions of the Passive Voice' },
  { id: 'guided', label: 'Watch', title: 'From Active to Passive' },
  { id: 'transform', label: 'Transform', title: 'Tense Recognition and Passive Form' },
  { id: 'practice', label: 'Practice', title: 'Passive Form Practice' },
  { id: 'composition', label: 'Write', title: 'Composition: Active and Passive Voice' }
];

const normalize = (value) => value.trim().toLowerCase().replace(/[.?!]/g, '').replace(/\s+/g, ' ');

const ExerciseList = ({ items, answers, setAnswers, checked, setChecked, showTense = false }) => {
  const score = items.filter((item, index) => normalize(answers[index] || '') === normalize(item.answer)).length;

  return (
    <>
      <div className="pv-exercise-list">
        {items.map((item, index) => {
          const isCorrect = normalize(answers[index] || '') === normalize(item.answer);
          return (
            <article key={item.prompt} className={checked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
              <span>{index + 1}</span>
              <div>
                <label>{item.prompt}</label>
                {showTense ? <em>{item.tense}</em> : null}
              </div>
              <Form.Control
                value={answers[index] || ''}
                placeholder="Write the complete passive sentence"
                onChange={(event) => {
                  setAnswers((current) => ({ ...current, [index]: event.target.value }));
                  setChecked(false);
                }}
              />
              {checked ? <small>{isCorrect ? 'Correct' : item.answer}</small> : null}
            </article>
          );
        })}
      </div>
      <div className="pc-exercise-actions">
        <Button variant="primary" onClick={() => setChecked(true)}>Check answers</Button>
        {checked ? <div className={`pv-result ${score === items.length ? 'is-perfect' : ''}`}><strong>{score}/{items.length} correct</strong></div> : null}
      </div>
    </>
  );
};

const PassiveVoiceBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [transformAnswers, setTransformAnswers] = useState({});
  const [transformChecked, setTransformChecked] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState({});
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [writingDraft, setWritingDraft] = useState('');

  const slide = slides[activeSlide];
  const slideProgress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const wordCount = writingDraft.trim() ? writingDraft.trim().split(/\s+/).length : 0;
  const goToSlide = (index) => setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));

  const renderSlide = () => {
    if (slide.id === 'formula') {
      return (
        <div className="pc-slide-content">
          <div className="pv-core-formula"><strong>BE</strong><span>+</span><strong>PAST PARTICIPLE</strong></div>
          <div className="pv-formula-table">
            {formulaRows.map((row, index) => (
              <article key={row.tense} style={{ '--item-delay': `${index * 0.07}s` }}>
                <span>{row.tense}</span>
                <strong>{row.structure}</strong>
                <em>{row.example}</em>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'functions') {
      return (
        <div className="pc-slide-content">
          <div className="pv-function-grid">
            <article>
              <span>01</span>
              <h3>The actor is obvious or unimportant</h3>
              <p>It is unnecessary to state who performed the action.</p>
              <blockquote>“The criminal was arrested.”</blockquote>
              <small>It is obvious that the police arrested the criminal.</small>
            </article>
            <article>
              <span>02</span>
              <h3>Focus on the action or result</h3>
              <p>The event or object is more important than the person who caused it.</p>
              <blockquote>“The cure was discovered.”</blockquote>
              <small>The discovery matters more than the specific scientists.</small>
            </article>
          </div>
          <div className="pv-agent-note"><strong>Use “by + agent” only when the person or thing responsible is important.</strong></div>
        </div>
      );
    }

    if (slide.id === 'guided') {
      return (
        <div className="pc-slide-content">
          <div className="pv-guided-list">
            {guidedTransformations.map((item, index) => (
              <article key={item.active}>
                <span>{index + 1}</span>
                <div><small>ACTIVE</small><p>{item.active}</p></div>
                <i className="fe fe-arrow-right" />
                <div><small>PASSIVE</small><strong>{item.passive}</strong></div>
                <em>{item.verb}</em>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (slide.id === 'transform') {
      return (
        <div className="pc-slide-content">
          <div className="pv-instruction">Recognize the tense, keep the same tense of <strong>be</strong>, and use the past participle.</div>
          <ExerciseList
            items={transformationExercises}
            answers={transformAnswers}
            setAnswers={setTransformAnswers}
            checked={transformChecked}
            setChecked={setTransformChecked}
          />
        </div>
      );
    }

    if (slide.id === 'practice') {
      return (
        <div className="pc-slide-content">
          <div className="pv-instruction">Build each sentence in the passive voice using the tense shown.</div>
          <ExerciseList
            items={passiveFormExercises}
            answers={practiceAnswers}
            setAnswers={setPracticeAnswers}
            checked={practiceChecked}
            setChecked={setPracticeChecked}
            showTense
          />
        </div>
      );
    }

    return (
      <div className="pc-slide-content">
        <div className="pc-writing-layout">
          <div>
            <div className="pc-writing-model pv-writing-model">
              <span>MODEL</span>
              <blockquote>
                The manager spoke to us in the meeting. The situation was explained to us, and new regulations were approved by the board of directors.
              </blockquote>
            </div>
            <Form.Control
              as="textarea"
              rows={10}
              className="pc-writing-area"
              value={writingDraft}
              placeholder="Write your own paragraph here..."
              aria-label="Active and passive voice composition"
              onChange={(event) => setWritingDraft(event.target.value)}
            />
            <div className="pc-word-count">{wordCount} words</div>
          </div>
          <aside className="pc-writing-guide pv-writing-guide">
            <span>YOUR COMPOSITION</span>
            <h3>Write 70–100 words about a meeting, process, or important event.</h3>
            <p>Include at least:</p>
            <ul>
              <li><i className="fe fe-check-circle" /> two active sentences</li>
              <li><i className="fe fe-check-circle" /> three passive sentences</li>
              <li><i className="fe fe-check-circle" /> two different passive tenses</li>
              <li><i className="fe fe-check-circle" /> one “by + agent” phrase</li>
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
    <section className="pc-base-class pv-base-class">
      <div className="pc-class-toolbar">
        <Button variant="link" className="pc-class-exit" onClick={onBack}><i className="fe fe-arrow-left" /> Back to modules</Button>
        <div className="pc-class-progress">
          <div><span>BASE CLASS</span><small>Slide {activeSlide + 1} of {slides.length}</small></div>
          <ProgressBar now={slideProgress} />
        </div>
      </div>

      <div className="pc-slide-shell" key={slide.id}>
        <header className="pc-slide-header">
          <div><span>PASSIVE VOICE · BASE CLASS</span><h2>{slide.title}</h2></div>
          <div className="pc-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>
        {renderSlide()}
        <footer className="pc-slide-footer">
          <Button variant="light" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}><i className="fe fe-arrow-left me-2" /> Previous</Button>
          <div className="pc-slide-dots" aria-label="Passive voice base class slides">
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

export default PassiveVoiceBaseClass;
