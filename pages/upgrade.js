import { useState } from 'react';
import Link from 'next/link';
import { Alert, Badge, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useAuth } from 'components/auth/AuthProvider';
import {
  PREMIUM_DURATION_MONTHS,
  PREMIUM_PRICE_PEN
} from 'data/accessPlans';
import { examMetadata } from 'data/examQuestions';
import { grammarModules } from 'data/grammarModules';

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
  const salesWhatsapp = process.env.NEXT_PUBLIC_SALES_WHATSAPP?.replace(/\D/g, '');

  const requestMessage = [
    'Hello, I want Premium access to English Prep.',
    `Account: ${user?.email || 'I need a Premium account'}`,
    `Plan: S/ ${PREMIUM_PRICE_PEN} for ${PREMIUM_DURATION_MONTHS} months.`
  ].join('\n');

  const handleRequest = async () => {
    setNotice('');

    if (salesWhatsapp) {
      window.open(
        `https://wa.me/${salesWhatsapp}?text=${encodeURIComponent(requestMessage)}`,
        '_blank',
        'noopener,noreferrer'
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(requestMessage);
      setNotice('Request copied. Send it to the administrator together with your payment receipt.');
    } catch (_error) {
      setNotice(
        user
          ? `Contact the administrator and provide this account: ${user.email}`
          : 'Contact the administrator to request your Premium account.'
      );
    }
  };

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
              <Button variant="warning" size="lg" onClick={handleRequest}>
                Request full access
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
    </Container>
  );
};

export default Upgrade;
