import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const route = express.Router();

route.get("/", (_req, res) => {
  res.json(patientService.getNonSensitivePatients()).end();
});

route.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);
  const result = patientService.addPatient(newPatient);
  res.json(result).end();
  return;
});

export default route;
