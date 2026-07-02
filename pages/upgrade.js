import { useState } from 'react';
import Link from 'next/link';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Spinner
} from 'react-bootstrap';
import { useAuth } from 'components/auth/AuthProvider';
import {
  PREMIUM_DURATION_MONTHS,
  PREMIUM_PRICE_PEN
} from 'data/accessPlans';
import { examMetadata } from 'data/examQuestions';
import { grammarModules } from 'data/grammarModules';

const paymentDetails = {
  holder: 'Miguel Angel Caballero Lynch',
  bcpAccount: '19171114628056',
  cci: '00219117111462805656',
  yape: '903 541 244',
  whatsapp: '51903541244'
};

const benefits = [
  {
    icon: 'book-open',
    title: `${grammarModules.length} complete modules`,
    description: 'Glossaries, Base Classes, Exam-Focused Lessons and guided practice.'
  },
  {
    icon: 'edit-3',
    title: `${examMetadata.totalQuestions}-question Mock Exam`,
    description: 'Complete exam simulation with navigation, timer and saved answers.'
  },
  {
    icon: 'check-circle',
    title: 'Answers and explanations',
    description: 'Review your results and understand the reason behind each answer.'
  },
  {
    icon: 'trending-up',
    title: 'Progress tracking',
    description: 'Keep your module and exam progress available in the same account.'
  },
  {
    icon: 'refresh-cw',
    title: 'Course updates',
    description: 'Receive new content and improvements during your active year.'
  },
  {
    icon: 'shield',
    title: 'Personal access',
    description: 'Your Premium plan is linked securely to your Supabase account.'
  }
];

const formatDate = (value) => (
  value
    ? new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).format(new Date(value))
    : ''
);

const Upgrade = () => {
  const {
    user,
    entitlement,
    isPremium,
    refreshEntitlement
  } = useAuth();
  const [notice, setNotice] = useState('');
  const [checking, setChecking] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const requestMessage = [
    'Hola, realicé el pago por el acceso Premium anual de English Prep.',
    `Cuenta: ${user?.email || 'Necesito que me asignen una cuenta Premium'}.`,
    `Plan: S/ ${PREMIUM_PRICE_PEN} por ${PREMIUM_DURATION_MONTHS} meses.`,
    'Adjunto mi comprobante de pago.'
  ].join('\n');

  const whatsappReceiptUrl = (
    `https://wa.me/${paymentDetails.whatsapp}?text=${encodeURIComponent(requestMessage)}`
  );

  const handlePaymentCheck = async () => {
    setChecking(true);
    const nextEntitlement = await refreshEntitlement();
    const expiry = nextEntitlement?.premium_expires_at
      ? new Date(nextEntitlement.premium_expires_at).getTime()
      : 0;
    const hasPremium = nextEntitlement?.plan === 'premium' && expiry > Date.now();

    setNotice(
      hasPremium
        ? 'Premium access activated. You can now open the complete course.'
        : 'Your payment is still pending activation. Contact the administrator if you already sent the receipt.'
    );
    setChecking(false);
  };

  if (isPremium) {
    return (
      <Container fluid className="px-6 py-6">
        <Row className="justify-content-center">
          <Col xl={8} lg={10}>
            <Card className="premium-active-card">
              <Card.Body className="p-6 text-center">
                <span className="premium-success-icon">
                  <i className="fe fe-check"></i>
                </span>
                <Badge bg="success" className="mb-3 rounded-pill">Premium active</Badge>
                <h1>Your complete course is unlocked</h1>
                <p className="text-muted">
                  Enjoy every module, the complete Mock Exam and all answer explanations.
                </p>
                {entitlement?.premium_expires_at ? (
                  <p className="premium-expiry">
                    Access valid until <strong>{formatDate(entitlement.premium_expires_at)}</strong>
                  </p>
                ) : null}
                <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
                  <Button as={Link} href="/practice" variant="primary">Open all modules</Button>
                  <Button as={Link} href="/exam" variant="light">Open full Mock Exam</Button>
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
      <section className="premium-hero">
        <Row className="align-items-center g-5">
          <Col xl={7} lg={7}>
            <Badge bg="warning" text="dark" className="rounded-pill mb-3">
              Complete annual access
            </Badge>
            <h1>Unlock the complete English Prep experience</h1>
            <p>
              Go beyond the four free modules and prepare with the complete learning path,
              official-style practice and the full Mock Exam.
            </p>
            <div className="premium-price">
              <span>S/</span>
              <strong>{PREMIUM_PRICE_PEN}</strong>
              <small>per year</small>
            </div>
            <p className="premium-account">
              {user ? (
                <>Premium will be linked to <strong>{user.email}</strong></>
              ) : (
                <>No account is required for the demo. Sign in only after your Premium account is activated.</>
              )}
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Button variant="warning" size="lg" onClick={() => setShowPaymentDetails(true)}>
                View payment details
              </Button>
              {user ? (
                <Button variant="outline-light" size="lg" onClick={handlePaymentCheck} disabled={checking}>
                  {checking ? (
                    <>
                      <Spinner size="sm" animation="border" className="me-2" />
                      Checking...
                    </>
                  ) : 'I already paid'}
                </Button>
              ) : (
                <Button
                  as={Link}
                  href="/authentication/sign-in?next=/upgrade"
                  variant="outline-light"
                  size="lg"
                >
                  Premium sign in
                </Button>
              )}
            </div>
          </Col>
          <Col xl={5} lg={5}>
            <div className="premium-plan-card">
              <span className="premium-plan-label">PREMIUM</span>
              <h2>Everything you need to prepare</h2>
              <ul>
                <li><i className="fe fe-check"></i> All {grammarModules.length} learning modules</li>
                <li><i className="fe fe-check"></i> All {examMetadata.totalQuestions} Mock Exam questions</li>
                <li><i className="fe fe-check"></i> Complete answer review</li>
                <li><i className="fe fe-check"></i> {PREMIUM_DURATION_MONTHS} months of access</li>
              </ul>
              <small>Manual activation. No automatic recurring charge.</small>
            </div>
          </Col>
        </Row>
      </section>

      {notice ? <Alert variant="info" className="mt-4">{notice}</Alert> : null}

      <Row className="g-4 mt-2">
        {benefits.map((benefit) => (
          <Col xl={4} md={6} key={benefit.title}>
            <Card className="premium-benefit-card h-100">
              <Card.Body>
                <span><i className={`fe fe-${benefit.icon}`}></i></span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="premium-free-link">
        <span>You can continue using the Free plan at any time.</span>
        <Button as={Link} href="/practice" variant="light">Continue with free access</Button>
      </div>

      <Modal
        show={showPaymentDetails}
        onHide={() => setShowPaymentDetails(false)}
        centered
        size="lg"
        contentClassName="premium-payment-modal"
      >
        <Modal.Header closeButton>
          <div>
            <Badge bg="warning" text="dark" className="rounded-pill mb-2">
              S/ {PREMIUM_PRICE_PEN} · {PREMIUM_DURATION_MONTHS} months
            </Badge>
            <Modal.Title>Payment details</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            Pay by BCP transfer or Yape. Your Premium access will be activated after
            the payment receipt is verified.
          </p>

          <div className="premium-payment-details">
            <div>
              <small>Account holder</small>
              <strong>{paymentDetails.holder}</strong>
            </div>
            <div>
              <small>BCP Soles account</small>
              <strong>{paymentDetails.bcpAccount}</strong>
            </div>
            <div>
              <small>Interbank account (CCI)</small>
              <strong>{paymentDetails.cci}</strong>
            </div>
            <div>
              <small>Yape</small>
              <strong>{paymentDetails.yape}</strong>
            </div>
          </div>

          <Alert variant="info" className="mb-0 mt-4">
            After paying, send your screenshot to <strong>903 541 244</strong>.
            If you are using the free demo, we will also provide your Premium account.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowPaymentDetails(false)}>
            Close
          </Button>
          <Button
            as="a"
            href={whatsappReceiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="success"
          >
            <i className="fe fe-message-circle me-2"></i>
            Send receipt by WhatsApp
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Upgrade;
