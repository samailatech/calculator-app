const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { evaluate } = require('mathjs');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/calculate', (req, res) => {
  const { input } = req.body;
  try {
    // Replace "Math." with empty string to use mathjs functions
    const cleanedInput = input.replace(/Math\./g, '');
    const result = evaluate(cleanedInput);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
