import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/services/patient.service';
import { DoctorService } from '../services/doctor.service';
import { AppointmentService } from 'src/services/appointment.service';

@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.sass'],
})
export class ViewRecordComponent implements OnInit {
  appointmentsList: Array<any> = [];
  model: any = {};
  PatientRecords: any;
  record: boolean = false;

  PatientRecord: any = [];

  showProgress: boolean = false;
  progressMsg: string = 'Loading....';
  progressWarn: boolean = false;
  progressSuccess: boolean = false;
  viewRecord:boolean =false;
  patients: any;

  constructor(private doctorService: DoctorService, private patientService: PatientService , private storageAppointmentService : AppointmentService ) {}

  ngOnInit(): void {
    //FIXME
    // let data = localStorage.getItem("PatRecord")
    // this.PatientRecords = JSON.parse(data!) || {}
    // console.log(this.PatientRecords);
    this.PatientRecords = {}
    this.patients = this.patientService.getPatient();
    this.appointmentsList = this.storageAppointmentService.getAppointmentPatient();
  }

  onPatIDSubmit() {
    this.showProgress = true;
    this.doctorService
      .getPatientRecords(this.model.patID)
      .then((result: any) => {
        console.log(result);
        this.record = true;
        this.progressSuccess = true;
        this.PatientRecords = result['MedRecord'];
        // localStorage.setItem("PatRecord", JSON.stringify(this.PatientRecords));
        this.progressMsg =
          '<span class="text-danger fw-bold">' +
          this.PatientRecords.length +
          ' </span> Record Found';
      })
      .catch((err: any) => {
        console.log(err);
        this.progressWarn = true;
        this.progressMsg =
          'Not Found a Record for Patient with <br> <span class="text-danger">' +
          this.model.patID;
      });
  }

  onProgressClose() {
    this.showProgress = false;
    this.progressWarn = false;
    this.progressSuccess = false;
    this.progressMsg = 'Loading...!';
  }

  onViewRecord(record:any){
    this.PatientRecord = record
    console.log(this.PatientRecord.data);
    this.viewRecord = true
  }

  onRecordClose(){
    this.PatientRecord = {}
    this.viewRecord = false
  }
}
