import express, { NextFunction, Request, Response } from "express";
import patientService from "../services/patientService";
import { NewPatientSchema } from "../utils";
import { NewPatient, Patient } from "../types";
import { ZodError } from "zod";

const route = express.Router();

route.get("/", (_req, res) => {
  res.json(patientService.getNonSensitivePatients()).end();
});

const patientValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (err: unknown) {
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

export default route;
