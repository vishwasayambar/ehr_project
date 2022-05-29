import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() 
  {

   }

  addAppointmentPatient(Appointmentpatient:any) {
    let AppointmentpatientList = this.getAppointmentPatient();
    AppointmentpatientList.push(Appointmentpatient)
    window.localStorage.setItem('appointmentpatients', JSON.stringify(AppointmentpatientList));
  }
  getAppointmentPatient() {
      return JSON.parse(localStorage.getItem("appointmentpatients") || "[]")
  }
  deletePateint() {
      
  }
}
