import { useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const modifierGroups = [
  { label: 'Small difference', words: ['a bit', 'slightly', 'a little'] },
  { label: 'Large difference', words: ['much', 'a lot', 'by far'] }
];

const profiles = [
  { name: 'García', rank: 'Tallest', tone: 'blue' },
  { name: 'Vizcarra', rank: 'Tall', tone: 'green' },
  { name: 'PPK', rank: 'Medium height', tone: 'yellow' },
  { name: 'Ollanta', rank: 'Shorter', tone: 'orange' },
  { name: 'Castillo', rank: 'Shortest', tone: 'violet' }
];

const ruleGroups = [
  {
    id: 'short',
    title: 'One-syllable adjectives',
    comparative: 'adjective + -er + than',
    superlative: 'the + adjective + -est',
    examples: ['tall → taller → the tallest', 'short → shorter → the shortest', 'fast → faster → the fastest', 'big → bigger → the biggest']
  },
  {
    id: 'y',
    title: 'Adjectives ending in -y',
    comparative: 'change y to i + -er + than',
    superlative: 'change y to i + -est',
    examples: ['funny → funnier → the funniest', 'happy → happier → the happiest', 'dirty → dirtier → the dirtiest', 'friendly → friendlier → the friendliest']
  },
  {
    id: 'long',
    title: 'Long adjectives',
    comparative: 'more / less + adjective + than',
    superlative: 'the most / least + adjective',
    examples: ['honest → more honest → the most honest', 'organized → less organized → the least organized', 'responsible → more responsible → the most responsible']
  }
];

const exerciseItems = [
  { prompt: 'García is ________ than Castillo. (tall)', options: ['taller', 'more tall', 'tallest'], answer: 'taller' },
  { prompt: 'Castillo is ________ shorter than García.', options: ['much', 'more', 'most'], answer: 'much' },
  { prompt: 'PPK is ________ than Ollanta. (funny)', options: ['funnier', 'more funny', 'funniest'], answer: 'funnier' },
  { prompt: 'PPK is a bit ________ than Ollanta. (funny)', options: ['funnier', 'funniest', 'more funnier'], answer: 'funnier' },
  { prompt: 'Sagasti is ________ than Toledo. (honest)', options: ['more honest', 'honester', 'most honest'], answer: 'more honest' },
  { prompt: 'Ollanta is a little ________ than Merino. (honest)', options: ['less honest', 'honester', 'least honest'], answer: 'less honest' },
  { prompt: 'García is ________ person in the group. (tall)', options: ['the tallest', 'the most tall', 'taller'], answer: 'the tallest' },
  { prompt: 'This is ________ explanation in the lesson. (simple)', options: ['the simplest', 'the most simple than', 'simpler'], answer: 'the simplest' },
  { prompt: 'That was ________ presentation today. (organized)', options: ['the most organized', 'the organizedest', 'more organized'], answer: 'the most organized' },
  { prompt: 'She is by far ________ candidate. (responsible)', options: ['the most responsible', 'more responsible', 'the responsiblest'], answer: 'the most responsible' }
];

const slides = [
  { id: 'map', label: 'Map', title: 'Comparatives, Superlatives and Intensifiers' },
  { id: 'short', label: '1 Syllable', title: 'One-Syllable Adjectives' },
  { id: 'y', label: 'Ending -y', title: 'Adjectives Ending in -y' },
  { id: 'long', label: 'Long', title: 'Long Adjectives' },
  { id: 'superlatives', label: 'Superlatives', title: 'Superlatives and Degree' },
  { id: 'practice', label: 'Practice', title: 'Comparative and Superlative Practice' }
];

const ComparativesSuperlativesBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const slide = slides[activeSlide];
  const slideProgress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const score = exerciseItems.filter((item, index) => answers[index] === item.answer).length;
  const goToSlide = (index) => setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));

  const renderRuleSlide = (rule) => (
    <div className="pc-slide-content">
      <div className="cs-rule-header">
        <span>{rule.title}</span>
        <div><strong>COMPARATIVE</strong>{rule.comparative}</div>
        <div><strong>SUPERLATIVE</strong>{rule.superlative}</div>
      </div>
      <div className="cs-rule-layout">
        <div className="cs-example-list">
          {rule.examples.map((example, index) => <article key={example}><span>{index + 1}</span><strong>{example}</strong></article>)}
        </div>
        <aside>
          {modifierGroups.map((group) => (
            <section key={group.label}>
              <small>{group.label}</small>
              {group.words.map((word) => <b key={word}>{word}</b>)}
            </section>
          ))}
        </aside>
      </div>
      {rule.id === 'short' ? (
        <div className="cs-profile-strip">
          {profiles.map((profile) => <article key={profile.name} className={`is-${profile.tone}`}><span>{profile.name.slice(0, 1)}</span><strong>{profile.name}</strong><small>{profile.rank}</small></article>)}
        </div>
      ) : null}
    </div>
  );

  const renderSlide = () => {
    if (slide.id === 'map') {
      return (
        <div className="pc-slide-content">
          <div className="cs-title-card">
            <h3>Recognize the adjective pattern first</h3>
            <p>The number of syllables and the final letter determine the comparative and superlative form.</p>
          </div>
          <div className="cs-map-grid">
            {ruleGroups.map((rule, index) => (
              <article key={rule.id} style={{ '--item-delay': `${index * 0.12}s` }}>
                <span>{index + 1}</span>
                <h4>{rule.title}</h4>
                <p>{rule.comparative}</p>
                <strong>{rule.examples[0]}</strong>
              </article>
            ))}
          </div>
          <div className="cs-modifier-bar">
            <span>MINIMIZERS</span><strong>a bit · slightly · a little</strong>
            <span>MAXIMIZERS</span><strong>much · a lot · by far</strong>
          </div>
        </div>
      );
    }

    const rule = ruleGroups.find((item) => item.id === slide.id);
    if (rule) return renderRuleSlide(rule);

    if (slide.id === 'superlatives') {
      return (
        <div className="pc-slide-content">
          <div className="cs-superlative-grid">
            <article><span>ONE SYLLABLE</span><h3>the + adjective-est</h3><p>García is <strong>the tallest</strong> person in the group.</p></article>
            <article><span>ENDING IN -Y</span><h3>the + adjective-iest</h3><p>That was <strong>the funniest</strong> story.</p></article>
            <article><span>LONG ADJECTIVE</span><h3>the most / least + adjective</h3><p>Sagasti is <strong>the most honest</strong> candidate.</p></article>
            <article><span>STRONG DEGREE</span><h3>by far + superlative</h3><p>She is <strong>by far the most responsible</strong> candidate.</p></article>
          </div>
          <div className="cs-warning"><strong>Do not combine two comparative markers:</strong> say “funnier”, not “more funnier”.</div>
        </div>
      );
    }

    return (
      <div className="pc-slide-content">
        <div className="cs-instruction">Choose the correct comparative, superlative, maximizer, or minimizer.</div>
        <div className="cs-exercise-list">
          {exerciseItems.map((item, index) => {
            const isCorrect = answers[index] === item.answer;
            return (
              <article key={item.prompt} className={checked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
                <span>{index + 1}</span>
                <label>{item.prompt}</label>
                <Form.Select
                  value={answers[index] || ''}
                  aria-label={`Comparison answer ${index + 1}`}
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
          {checked ? <div className={`cs-result ${score === exerciseItems.length ? 'is-perfect' : ''}`}><strong>{score}/{exerciseItems.length} correct</strong></div> : null}
        </div>
      </div>
    );
  };

  return (
    <section className="pc-base-class cs-base-class">
      <div className="pc-class-toolbar">
        <Button variant="link" className="pc-class-exit" onClick={onBack}><i className="fe fe-arrow-left" /> Back to modules</Button>
        <div className="pc-class-progress">
          <div><span>BASE CLASS</span><small>Slide {activeSlide + 1} of {slides.length}</small></div>
          <ProgressBar now={slideProgress} />
        </div>
      </div>

      <div className="pc-slide-shell" key={slide.id}>
        <header className="pc-slide-header">
          <div><span>COMPARATIVES & SUPERLATIVES · BASE CLASS</span><h2>{slide.title}</h2></div>
          <div className="pc-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>
        {renderSlide()}
        <footer className="pc-slide-footer">
          <Button variant="light" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}><i className="fe fe-arrow-left me-2" /> Previous</Button>
          <div className="pc-slide-dots" aria-label="Comparatives and superlatives base class slides">
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

export default ComparativesSuperlativesBaseClass;
