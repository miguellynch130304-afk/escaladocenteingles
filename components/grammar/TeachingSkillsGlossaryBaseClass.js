import { useState } from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

const glossaryGroups = [
  {
    id: 'a-c',
    label: 'A–C',
    title: 'Glossary: A–C',
    terms: [
      {
        term: 'Coherence',
        definition: 'The logical connection and organization of ideas within a paragraph or text that makes it easy to follow and understand.',
        spanish: 'Coherencia: conexión lógica y organización de ideas que facilita la comprensión de un párrafo o texto.',
        area: 'Writing'
      },
      {
        term: 'Concept Checking Questions',
        acronym: 'CCQs',
        definition: 'Targeted questions used to check whether learners understand new language without simply asking “Do you understand?”',
        spanish: 'Preguntas de verificación de conceptos: preguntas guiadas para comprobar la comprensión de una estructura o elemento léxico.',
        area: 'Assessment'
      },
      {
        term: 'Contrastive Stress',
        definition: 'A pronunciation technique in which particular words or syllables receive stronger emphasis to highlight a contrast or change meaning.',
        spanish: 'Acento de contraste: énfasis especial en palabras o sílabas para resaltar una diferencia o modificar el sentido.',
        area: 'Pronunciation'
      }
    ]
  },
  {
    id: 'd-i',
    label: 'D–I',
    title: 'Glossary: D–I',
    terms: [
      {
        term: 'Drafting',
        definition: 'A process-writing stage in which learners put their ideas into a rough version before focusing on accuracy and correction.',
        spanish: 'Redacción de borrador: etapa en la que se plasman ideas en una versión inicial antes de corregir errores.',
        area: 'Writing'
      },
      {
        term: 'Extensive Task',
        definition: 'A longer and broader learning or reading assignment, often completed outside class to promote independent learning.',
        spanish: 'Tarea extensiva: actividad amplia, frecuentemente realizada fuera del aula, que fomenta el aprendizaje autónomo.',
        area: 'Independent learning'
      },
      {
        term: 'Fillers',
        definition: 'Short words or sounds such as “well”, “I mean”, or “um” that help speakers pause, hesitate, or maintain their turn.',
        spanish: 'Muletillas: palabras o sonidos breves que permiten pausar, dudar o mantener el turno al hablar.',
        area: 'Speaking'
      },
      {
        term: 'Inclusive Approach',
        definition: 'An educational approach that ensures equal opportunities, supportive conditions, and full participation for every learner.',
        spanish: 'Enfoque inclusivo: metodología que busca igualdad de oportunidades y participación plena para todo el alumnado.',
        area: 'Inclusion'
      },
      {
        term: 'Inductive Approach',
        definition: 'A method in which learners analyze examples and discover the underlying language rule instead of receiving it first.',
        spanish: 'Enfoque inductivo: método en el que el estudiante analiza ejemplos y descubre la regla por sí mismo.',
        area: 'Methodology'
      }
    ]
  },
  {
    id: 'l-p',
    label: 'L–P',
    title: 'Glossary: L–P',
    terms: [
      {
        term: 'Language Functions',
        definition: 'The communicative purposes of phrases or expressions, such as apologizing, requesting clarification, or adding an argument.',
        spanish: 'Funciones del lenguaje: propósitos comunicativos como disculparse, pedir aclaraciones o añadir argumentos.',
        area: 'Communication'
      },
      {
        term: 'Minimal Pairs',
        definition: 'Pairs of words that differ by one sound or phoneme, such as “ship” and “sheep”, used for pronunciation and listening practice.',
        spanish: 'Pares mínimos: palabras que se diferencian por un solo sonido y se usan para practicar pronunciación y discriminación auditiva.',
        area: 'Pronunciation'
      },
      {
        term: 'Paraphrasing',
        definition: 'Restating another person’s ideas in different words while preserving the original meaning.',
        spanish: 'Parafraseo: reformulación de una idea con palabras diferentes sin cambiar su significado.',
        area: 'Language skill'
      }
    ]
  },
  {
    id: 'r-u',
    label: 'R–U',
    title: 'Glossary: R–U',
    terms: [
      {
        term: 'Reflective Feedback',
        definition: 'Guiding comments or questions that help learners think critically and correct their own errors.',
        spanish: 'Retroalimentación reflexiva: comentarios o preguntas guía que ayudan al estudiante a analizar y corregir sus errores.',
        area: 'Feedback'
      },
      {
        term: 'Scanning',
        definition: 'A fast reading technique used to locate specific details such as names, dates, or places without reading every word.',
        spanish: 'Escaneo: lectura rápida para localizar información específica sin leer todo el texto.',
        area: 'Reading'
      },
      {
        term: 'Task-Based Learning',
        acronym: 'TBL',
        definition: 'A methodology centered on meaningful real-world tasks in which language is used to achieve a concrete outcome.',
        spanish: 'Aprendizaje basado en tareas: metodología centrada en tareas significativas que usan el idioma para lograr un resultado.',
        area: 'Methodology'
      },
      {
        term: 'Top-Down Processing',
        definition: 'A reading or listening approach in which learners use prior knowledge, context, and expectations to understand general meaning.',
        spanish: 'Procesamiento de arriba hacia abajo: uso del conocimiento previo y del contexto para comprender el significado general.',
        area: 'Receptive skills'
      },
      {
        term: 'Universal Design for Learning',
        acronym: 'UDL',
        definition: 'A framework that offers multiple means of engagement, representation, and expression to accommodate learner diversity.',
        spanish: 'Diseño Universal para el Aprendizaje: marco que ofrece diversas formas de participación, representación y expresión.',
        area: 'Inclusion'
      }
    ]
  }
];

const quizItems = [
  { prompt: 'A teacher asks targeted questions instead of “Do you understand?”', options: ['CCQs', 'Fillers', 'Minimal Pairs'], answer: 'CCQs' },
  { prompt: 'A learner quickly looks for a date in a long article.', options: ['Scanning', 'Drafting', 'Paraphrasing'], answer: 'Scanning' },
  { prompt: 'Students study examples and discover the grammar rule themselves.', options: ['Inductive Approach', 'Inclusive Approach', 'Reflective Feedback'], answer: 'Inductive Approach' },
  { prompt: 'A listening activity begins by activating prior knowledge about the topic.', options: ['Top-Down Processing', 'Contrastive Stress', 'Extensive Task'], answer: 'Top-Down Processing' },
  { prompt: 'A lesson offers different ways to engage, access information, and demonstrate learning.', options: ['UDL', 'TBL', 'Coherence'], answer: 'UDL' },
  { prompt: 'The teacher uses guiding questions so learners can correct their own work.', options: ['Reflective Feedback', 'Language Functions', 'Fillers'], answer: 'Reflective Feedback' }
];

const slides = [
  ...glossaryGroups.map((group) => ({ id: group.id, label: group.label, title: group.title })),
  { id: 'practice', label: 'Apply', title: 'Apply the Teaching Glossary' }
];

const TeachingSkillsGlossaryBaseClass = ({ onComplete, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showSpanish, setShowSpanish] = useState(false);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const slide = slides[activeSlide];
  const slideProgress = Math.round(((activeSlide + 1) / slides.length) * 100);
  const score = quizItems.filter((item, index) => answers[index] === item.answer).length;
  const goToSlide = (index) => setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1));

  const renderSlide = () => {
    const group = glossaryGroups.find((item) => item.id === slide.id);

    if (group) {
      return (
        <div className="pc-slide-content">
          <div className="tsg-controls">
            <div><strong>Teaching terminology</strong><span>Connect each term to classroom practice.</span></div>
            <Form.Check
              type="switch"
              id={`spanish-${group.id}`}
              label="Show Spanish support"
              checked={showSpanish}
              onChange={(event) => setShowSpanish(event.target.checked)}
            />
          </div>
          <div className="tsg-grid">
            {group.terms.map((item, index) => (
              <article key={item.term} style={{ '--item-delay': `${index * 0.08}s` }}>
                <div><span>{item.area}</span>{item.acronym ? <em>{item.acronym}</em> : null}</div>
                <h3>{item.term}</h3>
                <p>{item.definition}</p>
                {showSpanish ? <small>{item.spanish}</small> : null}
              </article>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="pc-slide-content">
        <div className="tsg-instruction">Choose the teaching term that best matches each classroom situation.</div>
        <div className="tsg-quiz">
          {quizItems.map((item, index) => {
            const isCorrect = answers[index] === item.answer;
            return (
              <article key={item.prompt} className={checked ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}>
                <span>{index + 1}</span>
                <label>{item.prompt}</label>
                <Form.Select
                  value={answers[index] || ''}
                  aria-label={`Glossary answer ${index + 1}`}
                  onChange={(event) => {
                    setAnswers((current) => ({ ...current, [index]: event.target.value }));
                    setChecked(false);
                  }}
                >
                  <option value="">Choose a term</option>
                  {item.options.map((option) => <option key={option} value={option}>{option}</option>)}
                </Form.Select>
                {checked ? <small>{isCorrect ? 'Correct' : `Answer: ${item.answer}`}</small> : null}
              </article>
            );
          })}
        </div>
        <div className="pc-exercise-actions">
          <Button variant="primary" onClick={() => setChecked(true)}>Check answers</Button>
          {checked ? <div className={`tsg-result ${score === quizItems.length ? 'is-perfect' : ''}`}><strong>{score}/{quizItems.length} correct</strong></div> : null}
        </div>
      </div>
    );
  };

  return (
    <section className="pc-base-class tsg-base-class">
      <div className="pc-class-toolbar">
        <Button variant="link" className="pc-class-exit" onClick={onBack}><i className="fe fe-arrow-left" /> Back to modules</Button>
        <div className="pc-class-progress">
          <div><span>TEACHING GLOSSARY</span><small>Section {activeSlide + 1} of {slides.length}</small></div>
          <ProgressBar now={slideProgress} />
        </div>
      </div>

      <div className="pc-slide-shell" key={slide.id}>
        <header className="pc-slide-header">
          <div><span>TEACHING SKILLS · BASE CLASS</span><h2>{slide.title}</h2></div>
          <div className="pc-slide-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </header>
        {renderSlide()}
        <footer className="pc-slide-footer">
          <Button variant="light" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}><i className="fe fe-arrow-left me-2" /> Previous</Button>
          <div className="pc-slide-dots" aria-label="Teaching skills glossary sections">
            {slides.map((item, index) => (
              <button type="button" key={item.id} className={index === activeSlide ? 'is-active' : ''} onClick={() => goToSlide(index)} aria-label={`Open section ${index + 1}: ${item.label}`}>
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

export default TeachingSkillsGlossaryBaseClass;
