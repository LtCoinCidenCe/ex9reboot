import { NewPatient, Gender } from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("dateOfBirth" in object &&
    "gender" in object &&
    "name" in object &&
    "occupation" in object &&
    "ssn" in object) {
    const { dateOfBirth, gender, name, occupation, ssn, } = object;
    const pat: NewPatient = {
      dateOfBirth: parseDate(dateOfBirth),
      gender: parseGender(gender),
      name: parseString(name),
      occupation: parseString(occupation),
      ssn: parseString(ssn),
    };
    return pat;
  }

  throw new Error("Incorrect or missing data");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text))
    throw new Error("Incorrect or missing string: " + text);
  return text;
};

const isDate = (date: string): boolean => {
  const time = Date.parse(date);
  return Boolean(time) && !isNaN(time);
};

export const parseDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error("Incorrect or missing date: " + date);
  return new Date(date).toLocaleString();
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

export const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error("Incorrent or missing gender: " + gender);
  return gender;
};
