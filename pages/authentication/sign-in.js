// import node module libraries
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Alert, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";
import { supabase } from "lib/supabaseClient";

const getSafeDestination = (value) => (
  typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/"
);

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    if (!supabase) {
      setError("Premium sign in is temporarily unavailable.");
      setSubmitting(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (signInError) {
      setError("The email or password is incorrect.");
      setSubmitting(false);
      return;
    }

    router.replace(getSafeDestination(router.query.next));
  };

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100 auth-login-page">
      <Col xxl={4} xl={5} lg={6} md={8} xs={12} className="py-6">
        <Card className="auth-login-card">
          <Card.Body className="p-5 p-md-6">
            <div className="auth-login-brand mb-5">
              <span className="auth-login-mark">
                <i className="fe fe-book-open"></i>
                <small>EP</small>
              </span>
              <div>
                <small>Teacher preparation</small>
                <h1>English <em>Prep</em></h1>
                <p>Advanced EBR</p>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="mb-2">Premium sign in</h2>
              <p className="text-muted mb-0">
                The free demo does not require an account. Sign in only if your Premium access was activated.
              </p>
            </div>

            {error ? <Alert variant="danger">{error}</Alert> : null}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="docente01@example.com"
                  autoComplete="username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </Form.Group>

              <div className="auth-login-notice mb-4">
                <i className="fe fe-lock"></i>
                <span>Premium access is limited to accounts activated by the administrator.</span>
              </div>

              <div>
                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Signing in...
                      </>
                    ) : 'Sign In'}
                  </Button>
                </div>
                <div className="text-center mt-3">
                  <Link href="/" className="text-muted">
                    Continue with the free demo
                  </Link>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;
