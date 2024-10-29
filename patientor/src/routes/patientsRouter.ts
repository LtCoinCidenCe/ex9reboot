import express from "express";
import patientService from "../services/patientService";

const route = express.Router();

route.get("/", (_req, res) => {
  res.json(patientService.getNonSensitivePatients()).end();
});

export default route;
