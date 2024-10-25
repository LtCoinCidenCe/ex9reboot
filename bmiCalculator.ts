import { isNotNumber } from "./utils";

const calculateBmi = (height: number, weight: number) => {
  if (isNaN(weight))
    throw new Error("weight is NaN");
  if (isNaN(height))
    throw new Error("height is Nan");
  if (height === 0)
    throw new Error("height is 0");
  const bmi = 10000 * weight / (height * height);
  if (bmi < 16)
    return "Underweight (Severe thinness)";
  if (bmi < 17)
    return "Underweight (Moderate thinness)";
  if (bmi < 18.5)
    return "Underweight (Mild thinness)";
  if (bmi < 25)
    return "Normal range";
  if (bmi < 30)
    return "Overweight (Pre-obese)";
  if (bmi < 35)
    return "Obese (Class I)";
  if (bmi < 40)
    return "Obese (Class II)";
  else
    return "Obese (Class III)";
}

if (isNotNumber(process.argv[2]) || isNotNumber(process.argv[3])) {
  console.log("invalid non-number input");
  process.exit(1);
}

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
