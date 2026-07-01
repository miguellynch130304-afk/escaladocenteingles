import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Accordion, Badge, Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap';
import QuestionCard from 'components/exam/QuestionCard';
import ScoreSummary from 'components/exam/ScoreSummary';
import { useAuth } from 'components/auth/AuthProvider';
import useExamProgress from 'hooks/useExamProgress';
import { examQuestions } from 'data/examQuestions';
import { grammarModules } from 'data/grammarModules';
import { FREE_MODULE_IDS, getAccessibleMockQuestions } from 'data/accessPlans';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'correct', label: 'Correct' },
  { id: 'wrong', label: 'Incorrect' },
  { id: 'unanswered', label: 'Unanswered' }
];

const Review = () => {
  const router = useRouter();
  const { isPremium } = useAuth();
  const { progress } = useExamProgress();
  const [mode, setMode] = useState('practice');
  const [filter, setFilter] = useState('wrong');

  useEffect(() => {
    if (router.query.mode === 'exam' || router.query.mode === 'practice') {
      setMode(router.query.mode);
    }
  }, [router.query.mode]);

  const answers = mode === 'exam' ? progress.exam : progress.practice;
  const freePracticeQuestionIds = useMemo(() => new Set(
    grammarModules
      .filter((module) => FREE_MODULE_IDS.includes(module.id))
      .flatMap((module) => module.examQuestionIds)
  ), []);
  const visibleQuestions = useMemo(() => {
    if (isPremium) {
      return examQuestions;
    }

    if (mode === 'exam') {
      return getAccessibleMockQuestions(examQuestions, false);
    }

    return examQuestions.filter((question) => freePracticeQuestionIds.has(question.id));
  }, [freePracticeQuestionIds, isPremium, mode]);
  const score = useMemo(
    () => visibleQuestions.filter((question) => answers[question.id] === question.answer).length,
    [answers, visibleQuestions]
  );
  const answered = useMemo(
    () => visibleQuestions.filter((question) => Boolean(answers[question.id])).length,
    [answers, visibleQuestions]
  );

  const rows = useMemo(() => {
    return visibleQuestions.map((question) => {
      const selectedAnswer = answers[question.id];
      const status = !selectedAnswer ? 'unanswered' : selectedAnswer === question.answer ? 'correct' : 'wrong';
      return { question, selectedAnswer, status };
    });
  }, [answers, visibleQuestions]);

  const filteredRows = rows.filter((row) => {
    if (filter === 'all') {
      return true;
    }
    return row.status === filter;
  });

  const switchMode = (nextMode) => {
    setMode(nextMode);
    router.push(`/review?mode=${nextMode}`, undefined, { shallow: true });
  };

  return (
    <Container fluid className="px-6 py-6">
      <Row className="mb-6 align-items-center">
        <Col lg={8}>
          <Badge bg="primary" className="mb-3 rounded-pill">Review</Badge>
          <h1 className="mb-2">Answer map</h1>
          <p className="text-muted mb-0">Compare your saved answers with the official answer key.</p>
          {!isPremium ? (
            <div className="free-access-summary mt-3">
              <i className="fe fe-lock"></i>
              <span>Your review is limited to the questions included in the Free plan.</span>
            </div>
          ) : null}
        </Col>
        <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
          <ButtonGroup>
            <Button as={Link} href="/practice" variant="light">Modules</Button>
            <Button as={Link} href="/exam" variant="primary">Mock exam</Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Row>
        <Col xl={4} lg={5} className="mb-6 mb-lg-0">
          <ScoreSummary
            title={mode === 'exam' ? 'Mock exam' : 'Modules'}
            score={score}
            answered={answered}
            total={visibleQuestions.length}
          />
        </Col>

        <Col xl={8} lg={7}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                <ButtonGroup>
                  <Button variant={mode === 'practice' ? 'primary' : 'light'} onClick={() => switchMode('practice')}>
                    Modules
                  </Button>
                  <Button variant={mode === 'exam' ? 'primary' : 'light'} onClick={() => switchMode('exam')}>
                    Mock exam
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  {filters.map((item) => (
                    <Button
                      key={item.id}
                      variant={filter === item.id ? 'dark' : 'light'}
                      onClick={() => setFilter(item.id)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
            </Card.Body>
          </Card>

          <Accordion className="prep-review-accordion">
            {filteredRows.map(({ question, selectedAnswer, status }) => (
              <Accordion.Item eventKey={String(question.id)} key={question.id}>
                <Accordion.Header>
                  <div className="prep-review-header">
                    <span className="fw-semibold">Question {question.id}</span>
                    <span className="text-muted prep-review-snippet">{question.prompt}</span>
                    <Badge
                      bg={status === 'correct' ? 'success' : status === 'wrong' ? 'danger' : 'light'}
                      text={status === 'unanswered' ? 'dark' : undefined}
                    >
                      {status === 'correct' ? 'Correct' : status === 'wrong' ? `Your ${selectedAnswer} / Key ${question.answer}` : `Key ${question.answer}`}
                    </Badge>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <QuestionCard
                    question={question}
                    selectedAnswer={selectedAnswer}
                    showFeedback
                    disabled
                  />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          {filteredRows.length === 0 ? (
            <Card>
              <Card.Body className="text-center py-6">
                <h4 className="mb-2">No questions match this filter</h4>
                <p className="text-muted mb-0">Change the filter or answer another question set.</p>
              </Card.Body>
            </Card>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Review;
