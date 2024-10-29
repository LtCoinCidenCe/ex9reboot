import patients from "../../data/patients";
import { NoSSNPatient, Patient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NoSSNPatient[] => {
  return patients.map(({ id, dateOfBirth, gender, name, occupation }) =>
    ({ id, dateOfBirth, gender, name, occupation })
  );
};

export default {
  getPatients,
  getNonSensitivePatients,
};
