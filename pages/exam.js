import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Alert, Badge, Button, ButtonGroup, Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import QuestionCard from 'components/exam/QuestionCard';
import ScoreSummary from 'components/exam/ScoreSummary';
import useExamProgress, { calculateScore, countAnswered } from 'hooks/useExamProgress';
import { examMetadata, examQuestions } from 'data/examQuestions';

const formatTime = (seconds) => {
  const safeSeconds = Math.max(0, seconds);
  const hours = Math.floor(safeSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((safeSeconds % 3600) / 60).toString().padStart(2, '0');
  const secs = Math.floor(safeSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${secs}`;
};

const Exam = () => {
  const {
    progress,
    resetExam,
    setExamAnswer,
    startExam,
    finishExam
  } = useExamProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [now, setNow] = useState(Date.now());

  const totalSeconds = examMetadata.durationMinutes * 60;
  const isStarted = Boolean(progress.examStartedAt) && !progress.examFinishedAt;
  const isFinished = Boolean(progress.examFinishedAt);
  const elapsedSeconds = progress.examStartedAt ? Math.floor((now - progress.examStartedAt) / 1000) : 0;
  const remainingSeconds = isStarted ? Math.max(0, totalSeconds - elapsedSeconds) : totalSeconds;
  const currentQuestion = examQuestions[currentIndex];
  const selectedAnswer = progress.exam[currentQuestion.id];

  const examScore = useMemo(() => calculateScore(progress.exam), [progress.exam]);
  const answered = useMemo(() => countAnswered(progress.exam), [progress.exam]);
  const answeredPercent = Math.round((answered / examQuestions.length) * 100);

  useEffect(() => {
    if (!isStarted) {
      return undefined;
    }

    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [isStarted]);

  useEffect(() => {
    if (isStarted && remainingSeconds === 0) {
      finishExam();
    }
  }, [finishExam, isStarted, remainingSeconds]);

  const moveQuestion = (direction) => {
    setCurrentIndex((current) => {
      const next = current + direction;
      return Math.min(Math.max(next, 0), examQuestions.length - 1);
    });
  };

  if (!isStarted && !isFinished) {
    return (
      <Container fluid className="px-6 py-6">
        <Row className="justify-content-center">
          <Col xl={8} lg={10}>
            <Card className="prep-start-card">
              <Card.Body className="p-6">
                <Badge bg="primary" className="mb-3 rounded-pill">Simulacro final</Badge>
                <h1 className="mb-3">{examMetadata.title}</h1>
                <p className="text-muted mb-4">
                  {examMetadata.totalQuestions} preguntas, {examMetadata.durationMinutes} minutos y correccion con la clave oficial.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <Button variant="primary" onClick={startExam}>
                    Iniciar simulacro
                  </Button>
                  <Button as={Link} href="/practice" variant="light">
                    Modulos
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  if (isFinished) {
    return (
      <Container fluid className="px-6 py-6">
        <Row className="mb-6 align-items-center">
          <Col lg={8}>
            <Badge bg="success" className="mb-3 rounded-pill">Simulacro cerrado</Badge>
            <h1 className="mb-2">Resultado final</h1>
            <p className="text-muted mb-0">Respuestas guardadas para revision.</p>
          </Col>
          <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
            <ButtonGroup>
              <Button variant="light" onClick={resetExam}>Nuevo intento</Button>
              <Button as={Link} href="/review?mode=exam" variant="primary">Revision</Button>
            </ButtonGroup>
          </Col>
        </Row>

        <Row>
          <Col xl={5} lg={6} className="mb-6 mb-lg-0">
            <ScoreSummary
              title="Puntaje del simulacro"
              score={examScore}
              answered={answered}
              total={examQuestions.length}
            />
          </Col>
          <Col xl={7} lg={6}>
            <Card className="h-100">
              <Card.Header className="bg-white py-4">
                <h4 className="mb-0">Mapa de respuestas</h4>
              </Card.Header>
              <Card.Body>
                <div className="prep-question-nav">
                  {examQuestions.map((question, index) => {
                    const answer = progress.exam[question.id];
                    const isCorrect = answer === question.answer;
                    return (
                      <button
                        type="button"
                        key={question.id}
                        className={[
                          'prep-question-dot',
                          index === currentIndex ? 'active' : '',
                          answer ? 'answered' : '',
                          answer && isCorrect ? 'correct' : '',
                          answer && !isCorrect ? 'wrong' : ''
                        ].filter(Boolean).join(' ')}
                        onClick={() => setCurrentIndex(index)}
                      >
                        {question.id}
                      </button>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="px-6 py-6">
      <Row className="mb-6 align-items-center">
        <Col xl={8} lg={7}>
          <Badge bg="primary" className="mb-3 rounded-pill">Simulacro en curso</Badge>
          <h1 className="mb-2">Examen final de preparacion</h1>
          <div className="d-flex flex-wrap gap-3 text-muted">
            <span><i className="fe fe-clock me-1"></i>{formatTime(remainingSeconds)}</span>
            <span><i className="fe fe-check-circle me-1"></i>{answered}/{examQuestions.length}</span>
            <span><i className="fe fe-target me-1"></i>meta base 36</span>
          </div>
        </Col>
        <Col xl={4} lg={5} className="text-lg-end mt-4 mt-lg-0">
          <ButtonGroup>
            <Button variant="light" onClick={resetExam}>Reiniciar</Button>
            <Button variant="primary" onClick={finishExam}>Finalizar</Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Row>
        <Col xl={8} lg={7} className="mb-6 mb-lg-0">
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelect={(answer) => setExamAnswer(currentQuestion.id, answer)}
          />
          <div className="d-flex justify-content-between align-items-center mt-4">
            <ButtonGroup>
              <Button variant="light" onClick={() => moveQuestion(-1)} disabled={currentIndex === 0}>
                Anterior
              </Button>
              <Button variant="light" onClick={() => moveQuestion(1)} disabled={currentIndex === examQuestions.length - 1}>
                Siguiente
              </Button>
            </ButtonGroup>
            <span className="text-muted small">Pregunta {currentIndex + 1} de {examQuestions.length}</span>
          </div>
        </Col>

        <Col xl={4} lg={5}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between small mb-2">
                <span>Avance</span>
                <span>{answeredPercent}%</span>
              </div>
              <ProgressBar now={answeredPercent} />
            </Card.Body>
          </Card>

          {remainingSeconds < 900 ? (
            <Alert variant="warning">
              Menos de 15 minutos restantes.
            </Alert>
          ) : null}

          <Card>
            <Card.Header className="bg-white py-4">
              <h4 className="mb-0">Navegador</h4>
            </Card.Header>
            <Card.Body>
              <div className="prep-question-nav">
                {examQuestions.map((question, index) => (
                  <button
                    type="button"
                    key={question.id}
                    className={[
                      'prep-question-dot',
                      index === currentIndex ? 'active' : '',
                      progress.exam[question.id] ? 'answered' : ''
                    ].filter(Boolean).join(' ')}
                    onClick={() => setCurrentIndex(index)}
                  >
                    {question.id}
                  </button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Exam;
