import { z, ZodError } from "zod";
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

/**
 * fake an id first as body.id before using the function
 * @param body to be parsed
 * @returns body as Entry
 * @throws exception with message
 */
export const entrySanitizerParser = (body: unknown): Entry => {
  let entry;
  try {
    entry = EntrySchema.parse(body);
    // console.log("entry", entry);
    switch (entry.type) {
      case "HealthCheck": {
        const rating = entry.healthCheckRating;
        if (rating === undefined) {
          throw new Error("missing rating");
        }
        break;
      }
      case "Hospital": {
        const { discharge } = entry;
        if (!discharge) {
          throw new Error("missing discharge");
        }
        break;
      }
      case "OccupationalHealthcare": {
        const { employerName, sickLeave } = entry;
        if (employerName === undefined || employerName.length === 0) {
          throw new Error("invalid employer name");
        }
        if (!sickLeave) {
          throw new Error("missing sick leave");
        }
        break;
      }
      default:
        throw new Error("invalid entry type");
        break;
    }
  }
  catch (err: unknown) {
    if (err instanceof ZodError) {
      // console.log("err.errors", err.errors);
      // console.log("err.issues", err.issues);
      let msg = err.errors[0].message;
      if (msg === "Required") {
        msg = err.errors[0].path.join(".") + " required";
      }
      throw new Error(msg);
    }
  }
  return entry as Entry;
};
