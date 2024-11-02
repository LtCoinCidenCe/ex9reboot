import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import { NewPatient, NoSSNPatient, Patient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NoSSNPatient[] => {
  return patients.map(({ id, dateOfBirth, gender, name, occupation }) =>
    ({ id, dateOfBirth, gender, name, occupation })
  );
};

const getPatientbyId = (id: string) => {
  return patients.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const complete = {
    id: uuid(),
    entries: [],
    ...patient
  };
  patients.push(complete);
  return complete;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatientbyId,
  addPatient,
};
