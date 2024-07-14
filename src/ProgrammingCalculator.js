import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import * as math from 'mathjs';

const ProgrammingCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [base, setBase] = useState(10);

  const handleInput = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const calculate = () => {
    try {
      let res;
      switch (base) {
        case 2:
          res = parseInt(input, 2);
          break;
        case 8:
          res = parseInt(input, 8);
          break;
        case 10:
          res = math.evaluate(input);
          break;
        case 16:
          res = parseInt(input, 16);
          break;
        default:
          res = math.evaluate(input);
      }
      setResult(res.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const convert = (toBase) => {
    try {
      let decimalValue;
      switch (base) {
        case 2:
          decimalValue = parseInt(input, 2);
          break;
        case 8:
          decimalValue = parseInt(input, 8);
          break;
        case 10:
          decimalValue = parseInt(input, 10);
          break;
        case 16:
          decimalValue = parseInt(input, 16);
          break;
        default:
          decimalValue = parseInt(input, 10);
      }
      const convertedValue = decimalValue.toString(toBase);
      setResult(convertedValue.toUpperCase());
    } catch (error) {
      setResult('Error');
    }
  };

  const clear = () => {
    setInput('');
    setResult('');
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Programming Calculator</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Input</Form.Label>
              <Form.Control
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Base</Form.Label>
              <Form.Control
                as="select"
                value={base}
                onChange={(e) => setBase(parseInt(e.target.value))}
              >
                <option value={2}>Binary</option>
                <option value={8}>Octal</option>
                <option value={10}>Decimal</option>
                <option value={16}>Hexadecimal</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <div className="d-grid gap-2">
            <Row>
              <Col>
                <Button variant="primary" onClick={calculate} block>
                  Calculate
                </Button>
              </Col>
              <Col>
                <Button variant="success" onClick={() => convert(2)} block>
                  Convert to Binary
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="success" onClick={() => convert(8)} block>
                  Convert to Octal
                </Button>
              </Col>
              <Col>
                <Button variant="success" onClick={() => convert(10)} block>
                  Convert to Decimal
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="success" onClick={() => convert(16)} block>
                  Convert to Hexadecimal
                </Button>
              </Col>
              <Col>
                <Button variant="danger" onClick={clear} block>
                  Clear
                </Button>
              </Col>
            </Row>
          </div>
          {result && (
            <div className="mt-3">
              <h3>Result: {result}</h3>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProgrammingCalculator;
