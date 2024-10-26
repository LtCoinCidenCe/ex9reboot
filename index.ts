import express from 'express';
import { isNotNumber } from './utils';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!').end();
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  res.json({ height, weight, bmi });
  return;
});

const PORT = 5173;

app.listen(PORT, () => {
  console.log("express app listening on", PORT);
});
