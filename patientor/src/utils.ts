import { z } from "zod";
import { Gender } from "./types";

export const NewPatientSchema = z.object({
  "dateOfBirth": z.string().date(),
  "gender": z.nativeEnum(Gender),
  "name": z.string(),
  "occupation": z.string(),
  "ssn": z.string(),
});
