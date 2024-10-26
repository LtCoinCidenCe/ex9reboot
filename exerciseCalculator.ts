import { isNotNumber } from "./utils";

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const calculateExercises = (dailyExerciseHour: number[], targetAmount: number): Result => {
  const n = dailyExerciseHour.length;
  let trainingDays = 0, sum = 0, success = true, goodDays = 0, busyDays = 0, lazydays = 0;
  for (let i = 0; i < n; i++) {
    const element = dailyExerciseHour[i];
    if (element > 0) {
      trainingDays += 1;
      sum += element;
      if (element < targetAmount) {
        success = false;
        busyDays += 1;
      }
      else {
        goodDays += 1;
      }
    }
    else {
      lazydays += 1;
      success = false;
    }
  }
  const rating = (lazydays + busyDays * 2 + goodDays * 3) / n;
  let ratingDescription = 'not too bad but could be better';
  if (rating === 3) {
    ratingDescription = 'perfect';
  }
  else if (rating > 2.5) {
    ratingDescription = 'well done, you are close to perfection';
  }
  else if (rating < 1.5) {
    ratingDescription = 'not sufficient exercise done';
  }
  return {
    periodLength: n,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average: sum / n
  };
};

if (process.argv.length < 4) {
  console.log('too few days for exercises');
  process.exit(1);
}

// validate target value
if (isNotNumber(process.argv[2])) {
  console.log("invalid non-number input");
  process.exit(1);
}

const target = Number(process.argv[2]);
const dailyExercise = [];

for (let i = 3; i < process.argv.length; i++) {
  const element = process.argv[i];
  if (isNotNumber(element)) {
    console.log("invalid non-number input");
    process.exit(1);
  }
  dailyExercise.push(Number(element));
}

console.log(calculateExercises(dailyExercise, target));
