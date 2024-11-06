import express, { NextFunction, Request, Response } from "express";
import { v1 as uuid } from "uuid";
import { ZodError } from "zod";
import patientService from "../services/patientService";
import { EntrySchema, NewPatientSchema } from "../utils";
import { Entry, NewPatient, Patient } from "../types";


const route = express.Router();

route.get("/", (_req, res) => {
  res.json(patientService.getNonSensitivePatients()).end();
});

const patientValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  }
  catch (err: unknown) {
    if (err instanceof ZodError) {
      res.status(400).json(err).end();
    } else {
      next(err);
    }
  }
};

route.get("/:id", (req, res) => {
  const found = patientService.getPatientbyId(req.params.id);
  if (!found) {
    res.status(404).end();
    return;
  }
  res.json(found).end();
  return;
});

route.post("/", patientValidator, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const result = patientService.addPatient(req.body);
  res.json(result).end();
});

route.post("/:id/entries", (req, res) => {
  const patient = patientService.getPatientbyId(req.params.id);
  if (!patient) {
    res.status(404).end();
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  req.body.id = "tempid";
  try {
    const entry = EntrySchema.parse(req.body) as Entry;
    switch (entry.type) {
      case "HealthCheck": {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        const HCR = req.body.healthCheckRating;
        if (!(typeof HCR === "number")) {
          res.status(400).json("invalid health check rating").end();
          return;
        }
        entry.healthCheckRating = HCR;
        console.log("entry", entry);
        const rating = Number(entry.healthCheckRating);
        if (!(rating === 0 || rating === 1 || rating === 2 || rating === 3)) {
          res.status(400).json("invalid health check rating").end();
          return;
        }
        entry.id = uuid();
        patient.entries.push(entry);
        res.json(entry).end();
      }
        break;

      default:
        res.status(400).json("invalid entry type");
        break;
    }
  }
  catch (err: unknown) {
    if (err instanceof ZodError) {
      res.status(400).json(err).end();
    }
    else {
      throw err;
    }
  }
  res.end();
});

export default route;
