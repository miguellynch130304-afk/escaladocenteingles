import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { getModuleGlossary } from 'data/moduleGlossaries';

const ModuleGlossary = ({ module, onBack, onComplete }) => {
  const entries = getModuleGlossary(module.id);

  return (
    <>
      <Row className="mb-4 align-items-end">
        <Col lg={8}>
          <Button variant="link" className="px-0 mb-3 grammar-back-link" onClick={onBack}>
            <i className="fe fe-arrow-left me-1"></i>
            Back to modules
          </Button>
          <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
            <Badge bg="primary" className="rounded-pill">Module {module.order}</Badge>
            <Badge bg="light" text="dark" className="rounded-pill">Glossary</Badge>
          </div>
          <h1 className="mb-2">{module.title} Glossary</h1>
          <p className="text-muted mb-0">
            Review the essential terms before beginning this module.
          </p>
        </Col>
      </Row>

      <Card className="grammar-panel module-glossary-panel">
        <Card.Body>
          <div className="module-glossary-intro">
            <span>Key language</span>
            <h2>Know the terms before applying the rules</h2>
            <p>Each definition includes a short example you will meet again in the lesson.</p>
          </div>

          <Row className="g-3">
            {entries.map((entry, index) => (
              <Col xl={entries.length === 5 ? 4 : 6} md={6} key={entry.term}>
                <article className="module-glossary-card h-100">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{entry.term}</h3>
                  <p>{entry.definition}</p>
                  <blockquote>{entry.example}</blockquote>
                </article>
              </Col>
            ))}
          </Row>

          <div className="module-glossary-actions">
            <Button variant="light" onClick={onBack}>Back to modules</Button>
            <Button variant="primary" onClick={onComplete}>
              Continue to lesson
              <i className="fe fe-arrow-right ms-2"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ModuleGlossary;
