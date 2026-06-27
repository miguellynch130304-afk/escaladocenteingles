import { Badge, Card, ProgressBar, Table } from 'react-bootstrap';
import { passingThresholds } from 'data/examQuestions';

const ScoreSummary = ({
  score,
  answered,
  total,
  title = 'Resultado'
}) => {
  const percent = total ? Math.round((score / total) * 100) : 0;
  const answeredPercent = total ? Math.round((answered / total) * 100) : 0;
  const bestScale = [...passingThresholds]
    .reverse()
    .find((threshold) => score >= threshold.minimum);

  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h4 className="mb-1">{title}</h4>
            <p className="text-muted mb-0">Basado en la clave oficial del PDF.</p>
          </div>
          <Badge bg={bestScale ? 'success' : 'warning'} className="rounded-pill">
            {bestScale ? bestScale.scale : 'En progreso'}
          </Badge>
        </div>

        <div className="prep-score-display mb-4">
          <span>{score}</span>
          <small>/ {total}</small>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between small mb-1">
            <span>Aciertos</span>
            <span>{percent}%</span>
          </div>
          <ProgressBar now={percent} variant={percent >= 60 ? 'success' : 'warning'} />
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between small mb-1">
            <span>Respondidas</span>
            <span>{answered}/{total}</span>
          </div>
          <ProgressBar now={answeredPercent} variant="primary" />
        </div>

        <Table responsive className="mb-0 text-nowrap prep-threshold-table">
          <thead className="table-light">
            <tr>
              <th>Escala</th>
              <th>Minimo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {passingThresholds.map((threshold) => (
              <tr key={threshold.scale}>
                <td>{threshold.scale}</td>
                <td>{threshold.minimum}</td>
                <td>
                  <Badge bg={score >= threshold.minimum ? 'success' : 'light'} text={score >= threshold.minimum ? undefined : 'dark'}>
                    {score >= threshold.minimum ? 'Alcanzado' : 'Pendiente'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ScoreSummary;
