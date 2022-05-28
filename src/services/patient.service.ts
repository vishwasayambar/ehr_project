import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() {
  
  }
  addPatient(patient:any) {
    let patientList = this.getPatient();
    patientList.push(patient)
    window.localStorage.setItem('patients', JSON.stringify(patientList));
  }
  getPatient() {
      return JSON.parse(localStorage.getItem("patients") || "[]")
  }
  deletePateint() {
      
  }
}
