import { Fragment, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Badge, Button, Card, Col, Container, ProgressBar, Row, Table } from 'react-bootstrap';
import { Book, Bullseye, CheckCircle, ClockHistory } from 'react-bootstrap-icons';
import { StatRightTopIcon } from 'widgets';
import ScoreSummary from 'components/exam/ScoreSummary';
import useExamProgress from 'hooks/useExamProgress';
import { examMetadata, examQuestions } from 'data/examQuestions';
import { grammarModules } from 'data/grammarModules';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Home = () => {
  const { progress, stats } = useExamProgress();

  const moduleStats = useMemo(() => {
    return grammarModules.map((module) => {
      const questions = examQuestions.filter((question) => module.examQuestionIds.includes(question.id));
      const answered = questions.filter((question) => Boolean(progress.practice[question.id])).length;
      const correct = questions.filter((question) => progress.practice[question.id] === question.answer).length;
      const percent = questions.length ? Math.round((answered / questions.length) * 100) : 0;

      return {
        ...module,
        total: questions.length,
        answered,
        correct,
        percent
      };
    });
  }, [progress.practice]);

  const dashboardCards = [
    {
      id: 1,
      title: 'Banco oficial',
      value: examMetadata.totalQuestions,
      icon: <Book size={18} />,
      statInfo: `<span className="text-dark me-2">${grammarModules.length}</span> modulos`
    },
    {
      id: 2,
      title: 'Modulos',
      value: `${stats.practiceAnswered}/${examMetadata.totalQuestions}`,
      icon: <CheckCircle size={18} />,
      statInfo: `<span className="text-dark me-2">${stats.practiceScore}</span> aciertos guardados`
    },
    {
      id: 3,
      title: 'Simulacro',
      value: `${stats.examAnswered}/${examMetadata.totalQuestions}`,
      icon: <ClockHistory size={18} />,
      statInfo: `<span className="text-dark me-2">${examMetadata.durationMinutes}</span> minutos`
    },
    {
      id: 4,
      title: 'Meta base',
      value: '36',
      icon: <Bullseye size={18} />,
      statInfo: '<span className="text-dark me-2">60%</span> segunda escala'
    }
  ];

  const chartOptions = {
    labels: ['Modulos', 'Simulacro'],
    colors: ['#624bff', '#0ea5e9'],
    dataLabels: { enabled: false },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '52%' },
        dataLabels: {
          name: { show: false },
          value: { show: true, fontSize: '28px', fontWeight: 700, formatter: (value) => `${Math.round(value)}%` }
        }
      }
    },
    chart: { type: 'radialBar', sparkline: { enabled: true } },
    stroke: { lineCap: 'round' }
  };

  const chartSeries = [
    Math.round((stats.practiceScore / examMetadata.totalQuestions) * 100),
    Math.round((stats.examScore / examMetadata.totalQuestions) * 100)
  ];

  return (
    <Fragment>
      <div className="prep-hero bg-primary pt-8 pb-20">
        <Container fluid className="px-6">
          <Row className="align-items-center">
            <Col xl={7} lg={8}>
              <Badge bg="light" text="dark" className="mb-3 rounded-pill">{examMetadata.examCode}</Badge>
              <h1 className="text-white mb-3">Preparacion EBA Avanzado Ingles</h1>
              <p className="text-white-75 mb-4 prep-hero-copy">
                Modulos gramaticales, cloze guiado, composition y simulacro final de {examMetadata.totalQuestions} preguntas con clave oficial.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Button as={Link} href="/practice" variant="white">
                  Abrir modulos
                </Button>
                <Button as={Link} href="/exam" variant="outline-white">
                  Simulacro final
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid className="mt-n16 px-6">
        <Row>
          {dashboardCards.map((item) => (
            <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={item.id}>
              <StatRightTopIcon info={item} />
            </Col>
          ))}
        </Row>

        <Row className="mt-6">
          <Col xl={8} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
            <Card className="h-100">
              <Card.Header className="bg-white py-4 d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-1">Modulos gramaticales</h4>
                  <p className="text-muted mb-0">Progreso guardado en este navegador.</p>
                </div>
                <Button as={Link} href="/practice" variant="primary" size="sm">
                  Abrir
                </Button>
              </Card.Header>
              <Table responsive className="mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Modulo</th>
                    <th>Nivel</th>
                    <th>Aciertos</th>
                    <th>Progreso</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {moduleStats.map((module) => (
                    <tr key={module.id}>
                      <td>
                        <h5 className="mb-1">{module.title}</h5>
                        <p className="mb-0 text-muted small">{module.focus}</p>
                      </td>
                      <td className="text-nowrap">{module.level}</td>
                      <td className="text-nowrap">{module.correct}/{module.total}</td>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <span className="text-dark small">{module.percent}%</span>
                          <ProgressBar now={module.percent} className="flex-grow-1 prep-table-progress" />
                        </div>
                      </td>
                      <td className="text-end">
                        <Button as={Link} href={`/practice?module=${module.id}`} variant="light" size="sm">
                          Ir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>

          <Col xl={4} lg={12} md={12} xs={12}>
            <Card className="mb-6">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h4 className="mb-1">Pulso de avance</h4>
                    <p className="text-muted mb-0">Modulos vs simulacro</p>
                  </div>
                  <i className="fe fe-activity text-primary fs-3"></i>
                </div>
                <Chart options={chartOptions} series={chartSeries} type="radialBar" height={260} />
                <div className="d-flex justify-content-around text-center">
                  <div>
                    <div className="fw-bold text-dark">{stats.practiceScore}</div>
                    <div className="small text-muted">Modulos</div>
                  </div>
                  <div>
                    <div className="fw-bold text-dark">{stats.examScore}</div>
                    <div className="small text-muted">Simulacro</div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <ScoreSummary
              title="Ultimo estado"
              score={stats.examScore || stats.practiceScore}
              answered={stats.examAnswered || stats.practiceAnswered}
              total={examMetadata.totalQuestions}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Home;
