import express from "express";
import cors from "cors";
import diagnoseService from "./services/diagnoseService";
import patientService from "./services/patientService";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  res.json(diagnoseService.getDiagnoses()).end();
});

app.get("/api/patients", (_req, res) => {
  res.json(patientService.getNonSensitivePatients()).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
