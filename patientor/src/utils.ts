import { NewPatient } from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
  console.log(object);
  const { dateOfBirth, gender, name, occupation, ssn } = object as NewPatient; // TODO: to be fixed
  const fakePatient: NewPatient = {
    dateOfBirth,
    gender,
    name,
    occupation,
    ssn,
  };
  return fakePatient;
};

export const isString = (text: unknown): text is string => {
  return typeof text === "string";
};
