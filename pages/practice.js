import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Alert, Badge, Button, ButtonGroup, Card, Col, Container, Form, ProgressBar, Row } from 'react-bootstrap';
import QuestionCard from 'components/exam/QuestionCard';
import PastSimpleBaseClass from 'components/grammar/PastSimpleBaseClass';
import PastContinuousBaseClass from 'components/grammar/PastContinuousBaseClass';
import PresentSimpleBaseClass from 'components/grammar/PresentSimpleBaseClass';
import PresentContinuousBaseClass from 'components/grammar/PresentContinuousBaseClass';
import PresentPerfectBaseClass from 'components/grammar/PresentPerfectBaseClass';
import FutureFormsBaseClass from 'components/grammar/FutureFormsBaseClass';
import ImperativesBaseClass from 'components/grammar/ImperativesBaseClass';
import ModalsBaseClass from 'components/grammar/ModalsBaseClass';
import GerundsInfinitivesBaseClass from 'components/grammar/GerundsInfinitivesBaseClass';
import HowsQuantifiersBaseClass from 'components/grammar/HowsQuantifiersBaseClass';
import PerfectTensesBaseClass from 'components/grammar/PerfectTensesBaseClass';
import PassiveVoiceBaseClass from 'components/grammar/PassiveVoiceBaseClass';
import TeachingSkillsGlossaryBaseClass from 'components/grammar/TeachingSkillsGlossaryBaseClass';
import ConditionalsBaseClass from 'components/grammar/ConditionalsBaseClass';
import useExamProgress from 'hooks/useExamProgress';
import { examQuestions } from 'data/examQuestions';
import { grammarModules } from 'data/grammarModules';

const normalizeAnswer = (value) => value.trim().toLowerCase();

const defaultLessonSteps = [
  {
    id: 'examples',
    title: 'Exam-related sentences',
    shortTitle: 'Sentences',
    description: 'Examples from the integrated exam bank and the function of each structure.'
  },
  {
    id: 'formulation',
    title: 'Question formation',
    shortTitle: 'Questions',
    description: 'Learn how to turn base sentences into grammatically correct questions.'
  },
  {
    id: 'cloze',
    title: 'Guided cloze',
    shortTitle: 'Cloze',
    description: 'Complete the gaps and receive immediate feedback.'
  },
  {
    id: 'composition',
    title: 'Composition',
    shortTitle: 'Composition',
    description: 'Use the structure to produce your own short text.'
  }
];

const lessonStepOverrides = {
  'present-simple': {
    examples: {
      title: 'Exam-related sentences',
      shortTitle: 'Sentences',
      description: 'Examples from the integrated exam bank with their Present Simple functions.'
    },
    cloze: {
      title: 'Cloze',
      description: 'Fill the spaces with the verb in the correct form.'
    }
  },
  'past-simple': {
    cloze: {
      title: 'Cloze',
      description: 'Fill the blanks with the verb in the correct form.'
    }
  }
};

const baseClassModuleIds = ['present-simple', 'present-continuous', 'past-simple', 'past-continuous', 'present-perfect', 'perfect-sequencing', 'future-forms', 'modals', 'imperatives', 'gerunds-infinitives', 'determiners', 'passive-voice', 'teaching-skills', 'conditionals'];
const getModulePhaseIds = (moduleId) => (
  baseClassModuleIds.includes(moduleId)
    ? ['base', 'specialized', 'exam']
    : ['specialized', 'exam']
);

const Modules = () => {
  const router = useRouter();
  const { progress, resetPractice, setPracticeAnswer } = useExamProgress();
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [clozeAnswers, setClozeAnswers] = useState({});
  const [checkedCloze, setCheckedCloze] = useState({});
  const [compositionDrafts, setCompositionDrafts] = useState({});
  const [recognitionAnswers, setRecognitionAnswers] = useState({});
  const [checkedRecognition, setCheckedRecognition] = useState({});
  const [modulePhase, setModulePhase] = useState('base');
  const [unlockedPhaseIndex, setUnlockedPhaseIndex] = useState(0);

  useEffect(() => {
    let requestedModule = router.query.module;
    let requestedStage = router.query.stage;

    if (!requestedModule && router.asPath.includes('?')) {
      const params = new URLSearchParams(router.asPath.split('?')[1]);
      requestedModule = params.get('module');
      requestedStage = params.get('stage');
    }

    if (Array.isArray(requestedModule)) {
      requestedModule = requestedModule[0];
    }

    if (Array.isArray(requestedStage)) {
      requestedStage = requestedStage[0];
    }

    if (requestedModule && grammarModules.some((module) => module.id === requestedModule)) {
      const modulePhases = getModulePhaseIds(requestedModule);
      const stage = modulePhases.includes(requestedStage)
        ? requestedStage
        : modulePhases[0];
      setActiveModuleId(requestedModule);
      setModulePhase(stage);
      const requestedPhaseIndex = modulePhases.indexOf(stage);
      setUnlockedPhaseIndex((current) => Math.max(current, requestedPhaseIndex));
      setStepIndex(0);
      setCurrentQuestionIndex(0);
      return;
    }

    if (router.isReady && !requestedModule) {
      setActiveModuleId(null);
      setModulePhase('base');
      setUnlockedPhaseIndex(0);
      setStepIndex(0);
      setCurrentQuestionIndex(0);
    }
  }, [router.asPath, router.isReady, router.query.module, router.query.stage]);

  const activeModule = grammarModules.find((module) => module.id === activeModuleId);
  const isPresentSimple = activeModule?.id === 'present-simple';
  const isPresentContinuous = activeModule?.id === 'present-continuous';
  const isPastSimple = activeModule?.id === 'past-simple';
  const isPastContinuous = activeModule?.id === 'past-continuous';
  const isPresentPerfect = activeModule?.id === 'present-perfect';
  const isFutureForms = activeModule?.id === 'future-forms';
  const isModals = activeModule?.id === 'modals';
  const isImperatives = activeModule?.id === 'imperatives';
  const isGerundsInfinitives = activeModule?.id === 'gerunds-infinitives';
  const isHowsQuantifiers = activeModule?.id === 'determiners';
  const isPerfectTenses = activeModule?.id === 'perfect-sequencing';
  const isPassiveVoice = activeModule?.id === 'passive-voice';
  const isTeachingSkills = activeModule?.id === 'teaching-skills';
  const isConditionals = activeModule?.id === 'conditionals';
  const hasBaseClass = isPresentSimple || isPresentContinuous || isPastSimple || isPastContinuous || isPresentPerfect || isPerfectTenses || isFutureForms || isModals || isImperatives || isGerundsInfinitives || isHowsQuantifiers || isPassiveVoice || isTeachingSkills || isConditionals;

  const moduleStats = useMemo(() => {
    return grammarModules.map((module) => {
      const moduleQuestions = examQuestions.filter((question) => module.examQuestionIds.includes(question.id));
      const answered = moduleQuestions.filter((question) => Boolean(progress.practice[question.id])).length;
      const correct = moduleQuestions.filter((question) => progress.practice[question.id] === question.answer).length;
      const percent = moduleQuestions.length ? Math.round((answered / moduleQuestions.length) * 100) : 0;

      return { ...module, answered, correct, total: moduleQuestions.length, percent };
    });
  }, [progress.practice]);

  const activeStats = activeModule ? moduleStats.find((module) => module.id === activeModule.id) : null;

  const questions = useMemo(() => {
    if (!activeModule) {
      return [];
    }
    return examQuestions.filter((question) => activeModule.examQuestionIds.includes(question.id));
  }, [activeModule]);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = progress.practice[currentQuestion?.id];
  const activeLessonSteps = useMemo(() => {
    const overrides = lessonStepOverrides[activeModuleId] || {};
    return defaultLessonSteps.map((step) => ({
      ...step,
      ...(overrides[step.id] || {})
    }));
  }, [activeModuleId]);
  const currentStep = activeLessonSteps[stepIndex] || activeLessonSteps[0];
  const moduleProgress = Math.round(((stepIndex + 1) / activeLessonSteps.length) * 100);
  const compositionKey = activeModule?.id;

  const startModule = (moduleId) => {
    const firstPhase = getModulePhaseIds(moduleId)[0];
    setActiveModuleId(moduleId);
    setModulePhase(firstPhase);
    setUnlockedPhaseIndex(0);
    setStepIndex(0);
    setCurrentQuestionIndex(0);
    router.push(
      `/practice?module=${moduleId}&stage=${firstPhase}`,
      undefined,
      { shallow: true }
    );
  };

  const backToCatalog = () => {
    setActiveModuleId(null);
    setModulePhase('base');
    setUnlockedPhaseIndex(0);
    setStepIndex(0);
    setCurrentQuestionIndex(0);
    router.push('/practice', undefined, { shallow: true });
  };

  const openCoursePhase = (phase, unlock = false) => {
    const phaseIndex = getModulePhaseIds(activeModuleId).indexOf(phase);
    if (phaseIndex < 0) {
      return;
    }

    if (!unlock && phaseIndex > unlockedPhaseIndex) {
      return;
    }

    if (unlock) {
      setUnlockedPhaseIndex((current) => Math.max(current, phaseIndex));
    }
    setModulePhase(phase);
    setStepIndex(0);
    setCurrentQuestionIndex(0);
    router.push(
      `/practice?module=${activeModuleId}&stage=${phase}`,
      undefined,
      { shallow: true }
    );
  };

  const moveStep = (direction) => {
    setStepIndex((current) => {
      const next = current + direction;
      return Math.min(Math.max(next, 0), activeLessonSteps.length - 1);
    });
  };

  const moveQuestion = (direction) => {
    setCurrentQuestionIndex((current) => {
      const next = current + direction;
      return Math.min(Math.max(next, 0), questions.length - 1);
    });
  };

  const getClozeKey = (index) => `${activeModule?.id}-${index}`;

  const updateClozeAnswer = (index, value) => {
    const key = getClozeKey(index);
    setClozeAnswers((current) => ({ ...current, [key]: value }));
    setCheckedCloze((current) => ({ ...current, [key]: false }));
  };

  const checkCloze = (index) => {
    const key = getClozeKey(index);
    setCheckedCloze((current) => ({ ...current, [key]: true }));
  };

  const updateRecognitionAnswer = (index, value) => {
    const key = `${activeModule.id}-recognition-${index}`;
    setRecognitionAnswers((current) => ({ ...current, [key]: value }));
    setCheckedRecognition((current) => ({ ...current, [key]: Boolean(value) }));
  };

  const renderCatalog = () => (
    <>
      <Row className="mb-5 align-items-end">
        <Col xl={8} lg={9}>
          <Badge bg="primary" className="mb-3 rounded-pill">Grammar Modules</Badge>
          <h1 className="mb-2">Choose a module to begin</h1>
          <p className="text-muted mb-0">
            Each module combines a guided class, exam-focused practice, writing, and a short module test.
          </p>
        </Col>
        <Col xl={4} lg={3} className="text-lg-end mt-4 mt-lg-0">
          <Button as={Link} href="/exam" variant="outline-primary">
            Open full mock exam
          </Button>
        </Col>
      </Row>

      <Row className="g-4">
        {moduleStats.map((module) => (
          <Col xxl={3} xl={4} md={6} key={module.id}>
            <Card className="grammar-catalog-card h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
                  <span className="grammar-catalog-order">{module.order}</span>
                  <Badge bg="light" text="dark" className="rounded-pill">{module.level}</Badge>
                </div>
                <h3>{module.title}</h3>
                <p>{module.focus}</p>
                <div className="grammar-catalog-meta">
                  <span>{module.correct}/{module.total} module test</span>
                  <span>{module.percent}%</span>
                </div>
                <ProgressBar now={module.percent} className="mb-4" />
                <Button variant="primary" className="w-100" onClick={() => startModule(module.id)}>
                  Start module
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );

  const renderFunctionsStep = () => (
    <div>
      <div className="grammar-method-intro mb-4">
        <span className="grammar-method-kicker">Meaning before form</span>
        <h4>One verb form, five communicative purposes</h4>
        <p>
          Before memorizing rules, identify what the sentence communicates.
          Its function explains why the Present Simple is the right choice.
        </p>
      </div>

      <Row className="g-3">
        {activeModule.methodology.functions.map((item, index) => (
          <Col xl={index < 3 ? 4 : 6} md={6} key={item.id}>
            <div className={`grammar-function-card grammar-function-${item.id}`}>
              <div className="grammar-function-icon">
                <i className={`fe fe-${item.icon}`}></i>
              </div>
              <div>
                <span className="grammar-function-number">0{index + 1}</span>
                <h4>{item.label}</h4>
                <p>{item.cue}</p>
                <blockquote>{item.example}</blockquote>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <div className="grammar-learning-tip mt-4">
        <i className="fe fe-zap"></i>
        <div>
          <strong>Key question</strong>
          <span>Is it a routine, state, truth, schedule, or dynamic narrative?</span>
        </div>
      </div>
    </div>
  );

  const renderTimeExpressionsStep = () => (
    <Row className="g-4">
      <Col xl={7}>
        <div className="grammar-subsection-card h-100">
          <div className="grammar-subsection-heading">
            <span>01</span>
            <div>
              <h4>Adverbs of frequency</h4>
              <p>They usually appear before the main verb.</p>
            </div>
          </div>
          <div className="grammar-frequency-list">
            {activeModule.methodology.frequencyAdverbs.map((item) => (
              <div className="grammar-frequency-row" key={item.expression}>
                <div>
                  <strong>{item.expression}</strong>
                  <small>{item.meaning}</small>
                </div>
                <span>{item.example}</span>
              </div>
            ))}
          </div>
        </div>
      </Col>
      <Col xl={5}>
        <div className="grammar-subsection-card mb-4">
          <div className="grammar-subsection-heading">
            <span>02</span>
            <div>
              <h4>Frequency phrases</h4>
              <p>They usually appear at the end of the sentence.</p>
            </div>
          </div>
          <div className="grammar-time-chip-list">
            {activeModule.methodology.frequencyPhrases.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="grammar-word-order">
          <small>WORD ORDER</small>
          <p><span>She</span> <strong>usually</strong> drinks coffee.</p>
          <p><span>She</span> drinks coffee <strong>every day</strong>.</p>
          <div className="grammar-be-exception">
            With <em>be</em>, place the adverb after the verb: <strong>She is always ready.</strong>
          </div>
        </div>
      </Col>
    </Row>
  );

  const renderStructureStep = () => (
    <div>
      <div className="grammar-structure-grid mb-4">
        {activeModule.methodology.forms.map((item, index) => (
          <div className="grammar-structure-card" key={item.label}>
            <span>0{index + 1}</span>
            <small>{item.label}</small>
            <h4>{item.pattern}</h4>
            <p>{item.example}</p>
          </div>
        ))}
      </div>

      <Row className="g-4">
        <Col xl={5}>
          <div className="grammar-rule-box h-100">
            <div className="grammar-rule-title">
              <i className="fe fe-edit-3"></i>
              <h4>He / She / It</h4>
            </div>
            <ul>
              {activeModule.methodology.thirdPersonRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        </Col>
        <Col xl={7}>
          <div className="grammar-wh-box h-100">
            <div className="grammar-rule-title">
              <i className="fe fe-help-circle"></i>
              <div>
                <h4>WH + does + subject + base verb?</h4>
                <p>Place the information word at the beginning.</p>
              </div>
            </div>
            <div className="grammar-wh-list">
              {activeModule.methodology.whQuestions.map((item) => (
                <div key={item.word}>
                  <span>{item.word}<small>{item.purpose}</small></span>
                  <p>{item.question}</p>
                </div>
              ))}
            </div>
            <div className="grammar-subject-question">
              <strong>Subject question:</strong> Who drinks black coffee?
              <span>Do not use do/does when who is the subject.</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );

  const renderContextStep = () => (
    <div>
      <Row className="g-4">
        <Col xl={7}>
          <article className="grammar-story-card">
            <span className="grammar-story-eyebrow">READING IN CONTEXT</span>
            <h4>{activeModule.methodology.story.title}</h4>
            {activeModule.methodology.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </Col>
        <Col xl={5}>
          <div className="grammar-recognition-card">
            <span className="grammar-story-eyebrow">CHECK UNDERSTANDING</span>
            <h4>Classify each sentence</h4>
            <p className="text-muted">Select the Present Simple function.</p>
            <div className="grammar-recognition-list">
              {activeModule.methodology.recognition.map((item, index) => {
                const key = `${activeModule.id}-recognition-${index}`;
                const answer = recognitionAnswers[key] || '';
                const isChecked = Boolean(checkedRecognition[key]);
                const isCorrect = answer === item.answer;

                return (
                  <div
                    className={[
                      'grammar-recognition-item',
                      isChecked && isCorrect ? 'is-correct' : '',
                      isChecked && !isCorrect ? 'is-wrong' : ''
                    ].filter(Boolean).join(' ')}
                    key={item.sentence}
                  >
                    <p>{item.sentence}</p>
                    <Form.Select
                      value={answer}
                      aria-label={`Function of: ${item.sentence}`}
                      onChange={(event) => updateRecognitionAnswer(index, event.target.value)}
                    >
                      <option value="">Choose a function...</option>
                      {activeModule.methodology.functions.map((option) => (
                        <option value={option.id} key={option.id}>{option.label}</option>
                      ))}
                    </Form.Select>
                    {isChecked ? (
                      <small>{isCorrect ? 'Correct. ' : 'Review: '}{item.explanation}</small>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );

  const renderExamplesStep = () => (
    <div className="grammar-example-list">
      {activeModule.examSentences.map((item, index) => (
        <div className="grammar-example-item" key={`${item.source}-${index}`}>
          <div className="grammar-example-source">{item.source}</div>
          <div>
            <p className="grammar-example-text">{item.text}</p>
            <p className="grammar-example-function">{item.function}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFormulationStep = () => (
    <div className="grammar-formula-grid">
      <Alert variant="info" className="mb-0">
        {activeModule.formulation.rule}
      </Alert>
      {activeModule.formulation.examples.map((item, index) => (
        <div className="grammar-formula-item" key={index}>
          <div>
            <small>Base sentence</small>
            <p>{item.statement}</p>
          </div>
          <i className="fe fe-arrow-right"></i>
          <div>
            <small>Question form</small>
            <p>{item.question}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderClozeStep = () => (
    <>
      {activeModule.clozeOptions ? (
        <div className="grammar-cloze-word-bank" aria-label="Available base verbs">
          <span>OPTIONS</span>
          {activeModule.clozeOptions.map((option) => <strong key={option}>{option}</strong>)}
        </div>
      ) : null}
      <div className="grammar-cloze-list">
        {activeModule.cloze.map((item, index) => {
          const key = getClozeKey(index);
          const answer = clozeAnswers[key] || '';
          const isChecked = Boolean(checkedCloze[key]);
          const isCorrect = normalizeAnswer(answer) === normalizeAnswer(item.answer);

          return (
            <div className="grammar-cloze-item" key={key}>
              <p className="mb-3">{item.prompt}</p>
              <div className="grammar-cloze-controls">
                <Form.Control
                  value={answer}
                  placeholder="Type the correct form"
                  onChange={(event) => updateClozeAnswer(index, event.target.value)}
                />
                <Button variant="light" onClick={() => checkCloze(index)}>
                  Check
                </Button>
              </div>
              {isChecked ? (
                <Alert variant={isCorrect ? 'success' : 'warning'} className="mt-3 mb-0 py-2">
                  <strong>{isCorrect ? 'Correct.' : `Suggested answer: ${item.answer}.`}</strong> {item.explanation}
                </Alert>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );

  const renderCompositionStep = () => (
    <Row>
      <Col xl={8} className="mb-4 mb-xl-0">
        <div className="grammar-writing-prompt">
          <span>YOUR TURN</span>
          <p>{activeModule.composition.prompt}</p>
          {activeModule.composition.model ? (
            <blockquote>
              <small>Model opening</small>
              {activeModule.composition.model}
            </blockquote>
          ) : null}
        </div>
        <Form.Control
          as="textarea"
          rows={10}
          className="grammar-composition-box"
          value={compositionDrafts[compositionKey] || ''}
          placeholder="Write your response here..."
          onChange={(event) => {
            setCompositionDrafts((current) => ({
              ...current,
              [compositionKey]: event.target.value
            }));
          }}
        />
        {activeModule.methodology ? (
          <div className="grammar-word-count">
            {(compositionDrafts[compositionKey] || '').trim()
              ? (compositionDrafts[compositionKey] || '').trim().split(/\s+/).length
              : 0} words
          </div>
        ) : null}
      </Col>
      <Col xl={4}>
        <div className="grammar-support-box">
          <h5>{activeModule.methodology ? 'Writing checklist' : 'Support language'}</h5>
          <ul>
            {activeModule.composition.support.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {activeModule.methodology ? (
            <div className="grammar-writing-checklist">
              <span><i className="fe fe-check"></i> I included a routine.</span>
              <span><i className="fe fe-check"></i> I used he/she/it + s correctly.</span>
              <span><i className="fe fe-check"></i> I added a frequency expression.</span>
              <span><i className="fe fe-check"></i> I checked capitalization and punctuation.</span>
            </div>
          ) : null}
        </div>
      </Col>
    </Row>
  );

  const renderExamStep = () => (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <p className="text-muted mb-0">Official exam questions connected to this grammar module.</p>
        </div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => resetPractice(activeModule.examQuestionIds)}
        >
          Reset module test
        </Button>
      </div>

      <div className="prep-question-nav mb-4">
        {questions.map((item, index) => {
          const answer = progress.practice[item.id];
          const isCorrect = answer === item.answer;
          return (
            <button
              type="button"
              key={item.id}
              className={[
                'prep-question-dot',
                index === currentQuestionIndex ? 'active' : '',
                answer ? 'answered' : '',
                answer && isCorrect ? 'correct' : '',
                answer && !isCorrect ? 'wrong' : ''
              ].filter(Boolean).join(' ')}
              onClick={() => setCurrentQuestionIndex(index)}
              aria-label={`Question ${item.id}`}
            >
              {item.id}
            </button>
          );
        })}
      </div>

      {currentQuestion ? (
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          showFeedback={Boolean(selectedAnswer)}
          onSelect={(answer) => setPracticeAnswer(currentQuestion.id, answer)}
        />
      ) : null}

      <div className="d-flex justify-content-between align-items-center mt-4">
        <ButtonGroup>
          <Button variant="light" onClick={() => moveQuestion(-1)} disabled={currentQuestionIndex === 0}>
            Previous question
          </Button>
          <Button variant="light" onClick={() => moveQuestion(1)} disabled={currentQuestionIndex === questions.length - 1}>
            Next question
          </Button>
        </ButtonGroup>
        <Button as={Link} href="/review" variant="primary">
          Review
        </Button>
      </div>
    </>
  );

  const renderStepContent = () => {
    if (!activeModule) {
      return null;
    }

    if (currentStep.id === 'functions') {
      return renderFunctionsStep();
    }

    if (currentStep.id === 'time-expressions') {
      return renderTimeExpressionsStep();
    }

    if (currentStep.id === 'structure') {
      return renderStructureStep();
    }

    if (currentStep.id === 'context') {
      return renderContextStep();
    }

    if (currentStep.id === 'examples') {
      return renderExamplesStep();
    }

    if (currentStep.id === 'formulation') {
      return renderFormulationStep();
    }

    if (currentStep.id === 'cloze') {
      return renderClozeStep();
    }

    if (currentStep.id === 'composition') {
      return renderCompositionStep();
    }

    return renderExamStep();
  };

  const renderCoursePhases = () => {
    if (!activeModule) {
      return null;
    }

    const phases = [
      {
        id: 'base',
        title: 'Base Class',
        description: 'Interactive concept lesson'
      },
      {
        id: 'specialized',
        title: 'Exam-Focused Lesson',
        description: 'Targeted language practice'
      },
      {
        id: 'exam',
        title: 'Practice Exam',
        description: 'Official-style questions'
      }
    ].filter((phase) => hasBaseClass || phase.id !== 'base');

    return (
      <div className="grammar-course-phases">
        {phases.map((phase, index) => (
          <button
            type="button"
            key={phase.id}
            className={[
              'grammar-course-phase',
              modulePhase === phase.id ? 'is-active' : '',
              index > unlockedPhaseIndex ? 'is-locked' : ''
            ].filter(Boolean).join(' ')}
            onClick={() => openCoursePhase(phase.id)}
            disabled={index > unlockedPhaseIndex}
          >
            <span>{index + 1}</span>
            <div>
              <strong>{phase.title}</strong>
              <small>{phase.description}</small>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderBaseClass = () => (
    <>
      {renderCoursePhases()}
      {isPresentSimple ? (
        <PresentSimpleBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      ) : isPresentContinuous ? (
        <PresentContinuousBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      ) : isPastContinuous ? (
        <PastContinuousBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      ) : isPresentPerfect ? (
        <PresentPerfectBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      ) : isFutureForms ? (
        <FutureFormsBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      ) : isModals ? (
        <ModalsBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      ) : isImperatives ? (
        <ImperativesBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      ) : isGerundsInfinitives ? (
        <GerundsInfinitivesBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      ) : isHowsQuantifiers ? (
        <HowsQuantifiersBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      ) : isPerfectTenses ? (
        <PerfectTensesBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      ) : isPassiveVoice ? (
        <PassiveVoiceBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      ) : isTeachingSkills ? (
        <TeachingSkillsGlossaryBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      ) : isConditionals ? (
        <ConditionalsBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      ) : (
        <PastSimpleBaseClass
          onBack={backToCatalog}
          onComplete={() => openCoursePhase('specialized', true)}
        />
      )}
    </>
  );

  const renderPracticeExamPhase = () => (
    <>
      {renderCoursePhases()}
      <Row className="mb-4 align-items-end">
        <Col lg={8}>
          <Button variant="link" className="px-0 mb-3 grammar-back-link" onClick={backToCatalog}>
            <i className="fe fe-arrow-left me-1"></i>
            Back to modules
          </Button>
          <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
            <Badge bg="primary" className="rounded-pill">Module {activeModule.order}</Badge>
            <Badge bg="light" text="dark" className="rounded-pill">Practice Exam</Badge>
          </div>
          <h1 className="mb-2">{activeModule.title} Module Test</h1>
          <p className="text-muted mb-0">
            Apply what you learned with questions from the integrated official exam bank.
          </p>
        </Col>
      </Row>
      <Card className="grammar-panel grammar-module-exam-card">
        <Card.Body>
          {renderExamStep()}
          <div className="grammar-lesson-actions">
            <Button variant="light" onClick={() => openCoursePhase('specialized')}>
              Back to Exam-Focused Lesson
            </Button>
            <Button variant="primary" onClick={backToCatalog}>
              Finish module
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );

  const renderSpecializedModule = () => (
    <>
      {renderCoursePhases()}
      <Row className="mb-5 align-items-start">
        <Col xl={8} lg={8}>
          <Button variant="link" className="px-0 mb-3 grammar-back-link" onClick={backToCatalog}>
            <i className="fe fe-arrow-left me-1"></i>
            Back to modules
          </Button>
          <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
            <Badge bg="primary" className="rounded-pill">
              Module {activeModule.order}
            </Badge>
            <Badge bg="light" text="dark" className="rounded-pill">{activeModule.level}</Badge>
          </div>
          <h1 className="mb-2">{activeModule.title}</h1>
          <p className="text-muted mb-0">{activeModule.focus}</p>
          {activeModule.methodology ? (
            <div className="grammar-method-path mt-3">
              <span>Understand</span>
              <i className="fe fe-arrow-right"></i>
              <span>Recognize</span>
              <i className="fe fe-arrow-right"></i>
              <span>Practice</span>
              <i className="fe fe-arrow-right"></i>
              <span>Produce</span>
            </div>
          ) : null}
        </Col>
        <Col xl={4} lg={4} className="mt-4 mt-lg-0">
          <Card className="grammar-progress-card">
            <Card.Body>
              <div className="d-flex justify-content-between small mb-2">
                <span>{currentStep.shortTitle}</span>
                <span>{stepIndex + 1}/{activeLessonSteps.length}</span>
              </div>
              <ProgressBar now={moduleProgress} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4 grammar-stepper-card">
        <Card.Body>
          <div className="grammar-stepper">
            {activeLessonSteps.map((step, index) => (
              <button
                type="button"
                key={step.id}
                className={[
                  'grammar-stepper-item',
                  index === stepIndex ? 'active' : '',
                  index < stepIndex ? 'completed' : ''
                ].filter(Boolean).join(' ')}
                onClick={() => setStepIndex(index)}
              >
                <span>{index + 1}</span>
                <small>{step.shortTitle}</small>
              </button>
            ))}
          </div>
        </Card.Body>
      </Card>

      <Card className="grammar-panel grammar-lesson-card">
        <Card.Body>
          <div className="grammar-section-heading">
            <span>{stepIndex + 1}</span>
            <div>
              <h3>{currentStep.title}</h3>
              <p>{currentStep.description}</p>
            </div>
          </div>

          {renderStepContent()}

          <div className="grammar-lesson-actions">
            <Button variant="light" onClick={() => moveStep(-1)} disabled={stepIndex === 0}>
              Previous
            </Button>
            {stepIndex < activeLessonSteps.length - 1 ? (
              <Button variant="primary" onClick={() => moveStep(1)}>
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => openCoursePhase('exam', true)}
              >
                Continue to Module Practice Exam
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );

  const renderModule = () => {
    if (hasBaseClass && modulePhase === 'base') {
      return renderBaseClass();
    }

    if (modulePhase === 'exam') {
      return renderPracticeExamPhase();
    }

    return renderSpecializedModule();
  };

  return (
    <Container fluid className="px-6 py-6">
      {activeModule ? renderModule() : renderCatalog()}
    </Container>
  );
};

export default Modules;
