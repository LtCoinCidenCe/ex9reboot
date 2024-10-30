import { z } from "zod";
import { NewPatientSchema } from "./utils";

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string,
}

export interface Patient extends NewPatient {
  "id": string,
}

export type NoSSNPatient = Omit<Patient, "ssn">;

export type NewPatient = z.infer<typeof NewPatientSchema>;

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}
