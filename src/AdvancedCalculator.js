import React, { useState } from 'react';
import { Button, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import * as math from 'mathjs';

const AdvancedCalculator = () => {
  const [expression, setExpression] = useState('');
  const [unit1, setUnit1] = useState('Choose unit');
  const [unit2, setUnit2] = useState('Choose unit');
  const [conversionResult, setConversionResult] = useState('');

  const handleClick = (value) => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const handleFunctionClick = (func) => {
    const funcMap = {
      'Arc sine': 'asin(',
      'Argument': 'arg(',
      'Inverse hyperbolic cosine': 'acosh(',
      'Arc cosine': 'acos(',
      'Absolute value': 'abs(',
    };
    setExpression((prevExpression) => prevExpression + funcMap[func]);
  };

  const calculate = () => {
    try {
      const sanitizedExpression = expression
        .replace(/√/g, 'sqrt')
        .replace(/π/g, 'pi')
        .replace(/e/g, 'exp(1)')
        .replace(/|/g, 'abs')
        .replace(/Arg/g, 'arg')
        .replace(/Re/g, 're')
        .replace(/im/g, 'im')
        .replace(/conj/g, 'conj');

      const result = math.evaluate(sanitizedExpression);
      setExpression(result.toString());
    } catch (error) {
      setExpression('Error');
    }
  };

  const clear = () => {
    setExpression('');
  };

  const handleConversion = () => {
    try {
      const value = math.evaluate(expression);
      const result = math.unit(value, unit1).toNumber(unit2);
      setConversionResult(`${value} ${unit1} is ${result} ${unit2}`);
    } catch (error) {
      setConversionResult('Error');
    }
  };

  const operators = [
    '(', ')', 'π', 'e', '√', '%', '^', 'log(', 'ln(', 'sin(', 'cos(', 'tan(', '+', '-', '*', '/', 
    '|', 'Arg(', 'Re(', 'im(', 'conj(', 'a*b', 'n'
  ];

  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

  const units = ['rad', 'deg', 'm', 'cm', 'mm', 'km', 'in', 'ft', 'yd'];

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
              {operators.map((operator) => (
                <Col key={operator} xs={3} className="mb-2">
                  <Button variant="primary" onClick={() => handleClick(operator)} block>
                    {operator}
                  </Button>
                </Col>
              ))}
              <Col xs={3} className="mb-2">
                <DropdownButton
                  variant="primary"
                  title="f(x)"
                  id="dropdown-basic-button"
                  onSelect={handleFunctionClick}
                  block
                >
                  <Dropdown.Item eventKey="Arc sine">Arc sine</Dropdown.Item>
                  <Dropdown.Item eventKey="Argument">Argument</Dropdown.Item>
                  <Dropdown.Item eventKey="Inverse hyperbolic cosine">Inverse hyperbolic cosine</Dropdown.Item>
                  <Dropdown.Item eventKey="Arc cosine">Arc cosine</Dropdown.Item>
                  <Dropdown.Item eventKey="Absolute value">Absolute value</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            <Row>
              {numbers.map((number) => (
                <Col key={number} xs={4} className="mb-2">
                  <Button variant="primary" onClick={() => handleClick(number)} block>
                    {number}
                  </Button>
                </Col>
              ))}
              <Col xs={4} className="mb-2">
                <Button variant="primary" onClick={calculate} block>
                  =
                </Button>
              </Col>
              <Col xs={4} className="mb-2">
                <Button variant="danger" onClick={clear} block>
                  Clear
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={6} className="mb-2">
                <DropdownButton
                  variant="secondary"
                  title={unit1}
                  id="dropdown-unit1-button"
                  onSelect={(eventKey) => setUnit1(eventKey)}
                  block
                >
                  {units.map((unit) => (
                    <Dropdown.Item eventKey={unit} key={unit}>
                      {unit}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
              <Col xs={6} className="mb-2">
                <DropdownButton
                  variant="secondary"
                  title={unit2}
                  id="dropdown-unit2-button"
                  onSelect={(eventKey) => setUnit2(eventKey)}
                  block
                >
                  {units.map((unit) => (
                    <Dropdown.Item eventKey={unit} key={unit}>
                      {unit}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="mb-2">
                <Button variant="success" onClick={handleConversion} block>
                  Convert
                </Button>
              </Col>
            </Row>
            {conversionResult && (
              <Row>
                <Col xs={12} className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={conversionResult}
                    readOnly
                  />
                </Col>
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdvancedCalculator;
