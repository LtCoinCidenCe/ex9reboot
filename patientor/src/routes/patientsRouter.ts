import express, { NextFunction, Request, Response } from "express";
import { v1 as uuid } from "uuid";
import { ZodError } from "zod";
import patientService from "../services/patientService";
import { entrySanitizerParser, NewPatientSchema } from "../utils";
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

route.post("/", patientValidator, (
  req: Request<unknown, unknown, NewPatient>,
  res: Response<Patient>) => {
  const result = patientService.addPatient(req.body);
  res.json(result).end();
});

const newEntryParser = (req: Request, res: Response, next: NextFunction) => {
  if (typeof req.body !== "object" || req.body === null)
    res.status(400).end();
  const cand = req.body as { id: string };
  cand.id = "tempid"; // fake an id to proceed
  try {
    entrySanitizerParser(req.body);
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ "error": error.message }).end();
      return;
    }
    next(error);
  }
};

route.post("/:id/entries", newEntryParser, (
  req: Request<{ id: string }, unknown, Entry>,
  res: Response<Entry>) => {
  const patient = patientService.getPatientbyId(req.params.id);
  if (!patient) {
    res.status(404).end();
    return;
  }
  const entry = req.body;
  entry.id = uuid();
  patient.entries.push(entry);
  res.json(entry).end();
  res.end();
});

export default route;
