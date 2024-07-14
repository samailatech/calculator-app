import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const BasicCalculator = () => {
  const [expression, setExpression] = useState('');

  const handleClick = (value) => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const calculate = () => {
    try {
      // Replace the '√' symbol with 'Math.sqrt' and handle percentage
      const sanitizedExpression = expression
        .replace(/√/g, 'Math.sqrt')
        .replace(/%/g, '/100');
      const result = eval(sanitizedExpression);
      setExpression(result.toString());
    } catch (error) {
      setExpression('Error');
    }
  };

  const clear = () => {
    setExpression('');
  };

  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
  const operators = ['/', '*', '-', '+', '(', ')', '%', '√'];

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <input
            type="text"
            className="form-control mb-2"
            value={expression}
            readOnly
          />
          <div className="d-grid gap-2">
            <Row>
              {numbers.map((number) => (
                <Col key={number} xs={4} className="mb-2">
                  <Button variant="primary" onClick={() => handleClick(number)} >
                    {number}
                  </Button>
                </Col>
              ))}
            </Row>
            <Row>
              {operators.map((operator) => (
                <Col key={operator} xs={3} className="mb-2">
                  <Button variant="primary" onClick={() => handleClick(operator)} block>
                    {operator}
                  </Button>
                </Col>
              ))}
              <Col xs={3} className="mb-2">
                <Button variant="primary" onClick={calculate} block>
                  =
                </Button>
              </Col>
              <Col xs={3} className="mb-2">
                <Button variant="primary" onClick={() => handleClick('.')} block>
                  .
                </Button>
              </Col>
              <Col xs={3} className="mb-2">
                <Button variant="danger" onClick={clear} block>
                  Clear
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BasicCalculator;
