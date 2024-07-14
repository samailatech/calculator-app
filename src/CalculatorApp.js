// CalculatorApp.js
import React, { useState } from 'react';
import BasicCalculator from './BasicCalculator';
import AdvancedCalculator from './AdvancedCalculator';
import FinancialCalculator from './FinancialCalculator';
import ProgrammingCalculator from './ProgrammingCalculator';

const CalculatorApp = () => {
  const [mode, setMode] = useState('basic'); // Default mode

  const renderCalculator = () => {
    switch (mode) {
      case 'basic':
        return <BasicCalculator />;
      case 'advanced':
        return <AdvancedCalculator />;
      case 'financial':
        return <FinancialCalculator />;
      case 'programming':
        return <ProgrammingCalculator />;
      default:
        return <BasicCalculator />;
    }
  };

  return (
    <div className="calculator-app">
      <div className="btn-group mb-3">
        <button
          className="btn btn-primary"
          onClick={() => setMode('basic')}
        >
          Basic Calculator
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setMode('advanced')}
        >
          Advanced Calculator
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setMode('financial')}
        >
          Financial Calculator
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setMode('programming')}
        >
          Programming Calculator
        </button>
      </div>
      {renderCalculator()}
    </div>
  );
};

export default CalculatorApp;
