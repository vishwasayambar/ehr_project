import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';

import { PatientService as AdminPatientService} from 'src/admin/services/patient.service';
import { PatientService } from 'src/services/patient.service';


@Component({
  selector: 'app-viewpatient',
  templateUrl: './viewpatient.component.html',
  styleUrls: ['./viewpatient.component.sass']
})
export class ViewpatientComponent implements OnInit {
  patientList: Array<any> = [];
  model: any = {
    acID: '',
  };

  patient: string[] = [];

  Doctor: any = {
    docID: '',
    fName: 'First Name',
    lName: 'Last Name',
    Doj: '',
    emailID: 'test_name@mail.com',
    phone: '123456789',
    city: 'city',
    state: 'state',
    speciality: 'speciality',
    imageHash: '',
  };

  patientDetails: any = [];

  loaded : boolean = false;
  loadComplete: boolean = false;

  showProgressCard: boolean = false;
  showProgressWarn:boolean = false;
  progressMsg:string = ''

  constructor(private patientServices: AdminPatientService, private storagePatientService: PatientService)
   {
    this.progressMsg = 'Loading patient Accounts From Blockchain'
    this.patientDetails = patientServices.patientDetails
    }

  ngOnInit(): void {
   this.GetPatients()
   this.patientList = this.storagePatientService.getPatient();
  }

  loadPatDetails() {
    console.log(this.patient);
    this.patientDetails = []
    for (var i = 0; i <= this.patient.length; i++) {
      this.patientServices.getPatientDetails(this.patient[i]).then((data:any)=>{
        this.patientDetails.push(data)
      });
    }
    this.progressMsg = ''
    this.showProgressCard = false
  }

  GetPatients(): any{
    this.showProgressCard= true;
    this.showProgressWarn = false;
    this.progressMsg = ''

    if(this.patientDetails.length >= 1){
      this.showProgressCard = false
      return 0
    }

    this.patientServices.getPatient().then((docs:any)=>{
      this.patient = docs
      if (this.patient.length >= 1) {
        this.loadPatDetails();
        this.progressMsg = "Found "+this.patient.length + " Accounts"
      }
      else{
        this.progressMsg = 'No Patients in the Network....'
      }
    })

  }
}
