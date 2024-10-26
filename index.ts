import express from 'express';
import { isNotNumber } from './utils';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.json({ error: "parameters missing" });
    return;
  }
  if (isNotNumber(target)
    || !Array.isArray(daily_exercises)
    || daily_exercises.some(item => isNotNumber(item))) {
    res.json({ error: "malformatted parameters" });
    return;
  }
  const result = calculateExercises(daily_exercises as number[], target as number);
  res.json(result);
  return;
});

const PORT = 5173;

app.listen(PORT, () => {
  console.log("express app listening on", PORT);
});
