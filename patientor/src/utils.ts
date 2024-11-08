import { z } from "zod";
import { Entry, Gender, HealthCheckRating } from "./types";

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
  healthCheckRating: z.nativeEnum(HealthCheckRating).optional(),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string()
  }).optional(),
  employerName: z.string().optional(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
  }).optional()
});

export const entrySanitizer = (body: unknown): body is Entry => {
  try {
    const entry = EntrySchema.parse(body);
    // console.log("entry", entry);
    switch (entry.type) {
      case "HealthCheck": {
        const rating = entry.healthCheckRating;
        if (rating === undefined) {
          return false;
        }
        break;
      }
      case "Hospital": {
        const { discharge } = entry;
        if (!discharge) {
          return false;
        }
        break;
      }
      case "OccupationalHealthcare": {
        const { employerName, sickLeave } = entry;
        if (employerName === undefined || employerName.length === 0) {
          return false;
        }
        if (!sickLeave) {
          return false;
        }
        break;
      }
      default:
        return false;
        break;
    }
  }
  catch {
    return false;
  }
  return true;
};
