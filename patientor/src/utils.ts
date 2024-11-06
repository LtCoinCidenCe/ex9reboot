import { z } from "zod";
import { Gender } from "./types";

export const NewPatientSchema = z.object({
  "dateOfBirth": z.string().date(),
  "gender": z.nativeEnum(Gender),
  "name": z.string(),
  "occupation": z.string(),
  "ssn": z.string(),
});

export const EntrySchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});
