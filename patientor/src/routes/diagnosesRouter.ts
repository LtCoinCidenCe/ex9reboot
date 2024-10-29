import express from "express";
import diagnoseService from "../services/diagnoseService";

const route = express.Router();

route.get("/", (_req, res) => {
  res.json(diagnoseService.getDiagnoses()).end();
});

export default route;
