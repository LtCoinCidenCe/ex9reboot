import { z } from "zod";
import { NewPatientSchema } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string,
}

export interface Patient extends NewPatient {
  "id": string,
  entries: Entry[],
}

export type NoSSNPatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = z.infer<typeof NewPatientSchema>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
