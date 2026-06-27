import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Accordion, Badge, Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap';
import QuestionCard from 'components/exam/QuestionCard';
import ScoreSummary from 'components/exam/ScoreSummary';
import useExamProgress, { calculateScore, countAnswered } from 'hooks/useExamProgress';
import { examQuestions } from 'data/examQuestions';

const filters = [
  { id: 'all', label: 'Todas' },
  { id: 'correct', label: 'Correctas' },
  { id: 'wrong', label: 'Incorrectas' },
  { id: 'unanswered', label: 'Pendientes' }
];

const Review = () => {
  const router = useRouter();
  const { progress } = useExamProgress();
  const [mode, setMode] = useState('practice');
  const [filter, setFilter] = useState('wrong');

  useEffect(() => {
    if (router.query.mode === 'exam' || router.query.mode === 'practice') {
      setMode(router.query.mode);
    }
  }, [router.query.mode]);

  const answers = mode === 'exam' ? progress.exam : progress.practice;
  const score = useMemo(() => calculateScore(answers), [answers]);
  const answered = useMemo(() => countAnswered(answers), [answers]);

  const rows = useMemo(() => {
    return examQuestions.map((question) => {
      const selectedAnswer = answers[question.id];
      const status = !selectedAnswer ? 'unanswered' : selectedAnswer === question.answer ? 'correct' : 'wrong';
      return { question, selectedAnswer, status };
    });
  }, [answers]);

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
          <Badge bg="primary" className="mb-3 rounded-pill">Revision</Badge>
          <h1 className="mb-2">Mapa de respuestas</h1>
          <p className="text-muted mb-0">Clave oficial cruzada con tus respuestas guardadas.</p>
        </Col>
        <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
          <ButtonGroup>
            <Button as={Link} href="/practice" variant="light">Modulos</Button>
            <Button as={Link} href="/exam" variant="primary">Simulacro</Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Row>
        <Col xl={4} lg={5} className="mb-6 mb-lg-0">
          <ScoreSummary
            title={mode === 'exam' ? 'Simulacro' : 'Modulos'}
            score={score}
            answered={answered}
            total={examQuestions.length}
          />
        </Col>

        <Col xl={8} lg={7}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                <ButtonGroup>
                  <Button variant={mode === 'practice' ? 'primary' : 'light'} onClick={() => switchMode('practice')}>
                    Modulos
                  </Button>
                  <Button variant={mode === 'exam' ? 'primary' : 'light'} onClick={() => switchMode('exam')}>
                    Simulacro
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
                    <span className="fw-semibold">Pregunta {question.id}</span>
                    <span className="text-muted prep-review-snippet">{question.prompt}</span>
                    <Badge
                      bg={status === 'correct' ? 'success' : status === 'wrong' ? 'danger' : 'light'}
                      text={status === 'unanswered' ? 'dark' : undefined}
                    >
                      {status === 'correct' ? 'Correcta' : status === 'wrong' ? `Tu ${selectedAnswer} / Clave ${question.answer}` : `Clave ${question.answer}`}
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
                <h4 className="mb-2">Sin preguntas en este filtro</h4>
                <p className="text-muted mb-0">Cambia de filtro o vuelve a responder otro bloque.</p>
              </Card.Body>
            </Card>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Review;
