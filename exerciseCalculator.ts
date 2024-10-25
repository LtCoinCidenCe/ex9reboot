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
        goodDays += 1
      }
    }
    else {
      lazydays += 1;
      success = false;
    }
  }
  let rating = (lazydays + busyDays * 2 + goodDays * 3) / n;
  let ratingDescription = 'not too bad but could be better'
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
  }
}

const dailyExercise = [3, 0, 0, 0, 0];
const target = 2;

console.log(calculateExercises(dailyExercise, target));
