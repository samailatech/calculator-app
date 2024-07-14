import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import * as math from 'mathjs';

const FinancialCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundsPerYear, setCompoundsPerYear] = useState('');
  const [result, setResult] = useState('');

  const calculateCompoundInterest = () => {
    try {
      const P = parseFloat(principal);
      const r = parseFloat(rate) / 100;
      const t = parseFloat(time);
      const n = parseFloat(compoundsPerYear);

      const A = P * math.pow(1 + r / n, n * t);
      setResult(`Compound Interest: ${A.toFixed(2)}`);
    } catch (error) {
      setResult('Error');
    }
  };

  const calculateLoanPayment = () => {
    try {
      const P = parseFloat(principal);
      const r = parseFloat(rate) / 100 / 12;
      const n = parseFloat(time) * 12;

      const payment = (P * r) / (1 - math.pow(1 + r, -n));
      setResult(`Loan Payment: ${payment.toFixed(2)}`);
    } catch (error) {
      setResult('Error');
    }
  };

  const calculateFutureValue = () => {
    try {
      const P = parseFloat(principal);
      const r = parseFloat(rate) / 100;
      const t = parseFloat(time);

      const FV = P * math.pow(1 + r, t);
      setResult(`Future Value: ${FV.toFixed(2)}`);
    } catch (error) {
      setResult('Error');
    }
  };

  const clear = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setCompoundsPerYear('');
    setResult('');
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Financial Calculator</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Principal (P)</Form.Label>
              <Form.Control
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Annual Interest Rate (r%)</Form.Label>
              <Form.Control
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time (years)</Form.Label>
              <Form.Control
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Compounds per Year (n)</Form.Label>
              <Form.Control
                type="number"
                value={compoundsPerYear}
                onChange={(e) => setCompoundsPerYear(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={calculateCompoundInterest}>
              Calculate Compound Interest
            </Button>
            <Button variant="primary" onClick={calculateLoanPayment}>
              Calculate Loan Payment
            </Button>
            <Button variant="primary" onClick={calculateFutureValue}>
              Calculate Future Value
            </Button>
            <Button variant="danger" onClick={clear}>
              Clear
            </Button>
          </div>
          {result && (
            <div className="mt-3">
              <h3>{result}</h3>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FinancialCalculator;
