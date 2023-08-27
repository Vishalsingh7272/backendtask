const express = require('express');
const app = express();
const port = 3000;

const operators = {
  plus: (a, b) => a + b,
  minus: (a, b) => a - b,
  times: (a, b) => a * b,
  dividedby: (a, b) => a / b,
};

app.get('/', (req, res) => {
  const allowedOperations = Object.keys(operators);
  const htmlResponse = allowedOperations.map(operation => `<li>${operation}</li>`).join('');
  const responseHtml = `<h2>Allowed Operations:</h2><ul>${htmlResponse}</ul>`;
  res.send(responseHtml);
});

app.get('/:operand1/:operator/:operand2', (req, res) => {
  const operand1 = parseFloat(req.params.operand1);
  const operator = req.params.operator;
  const operand2 = parseFloat(req.params.operand2);

  if (isNaN(operand1) || isNaN(operand2) || !operators[operator]) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const result = operators[operator](operand1, operand2);

  res.json({ result: result });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
