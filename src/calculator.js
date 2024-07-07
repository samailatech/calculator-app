import React, { useState } from 'react';
import axios from 'axios';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const handleCalculate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/calculate', { input });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error calculating:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Comprehensive Calculator</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={input}
              readOnly
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={result !== null ? result : ''}
              readOnly
            />
          </div>
          <div className="btn-group" role="group">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
              <button
                key={num}
                className="btn btn-secondary"
                onClick={() => handleClick(num.toString())}
              >
                {num}
              </button>
            ))}
            {['+', '-', '*', '/'].map((op) => (
              <button
                key={op}
                className="btn btn-primary"
                onClick={() => handleClick(op)}
              >
                {op}
              </button>
            ))}
            {['sin(', 'cos(', 'tan('].map((func) => (
              <button
                key={func}
                className="btn btn-info"
                onClick={() => handleClick(func)}
              >
                {func}
              </button>
            ))}
              <button className="btn btn-info" onClick={() => handleClick(')')}>
              )
            </button>
            <button className="btn btn-success" onClick={handleCalculate}>
              =
            </button>
            <button className="btn btn-danger" onClick={handleClear}>
              C
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
