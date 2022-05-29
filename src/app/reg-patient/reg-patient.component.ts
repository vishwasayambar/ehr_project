import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PatientService } from 'src/services/patient.service';

@Component({
  selector: 'app-reg-patient',
  templateUrl: './reg-patient.component.html',
  styleUrls: ['./reg-patient.component.css']
})
export class RegPatientComponent implements OnInit {
  form: FormGroup;
  popup = false
  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.form = this.fb.group({
      patID: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),

    });

   }

  ngOnInit(): void {
  }

  onAddDocSubmit() {
    const data = this.form.value;
    this.patientService.addPatient(data);
   this.popup = true;
  }
}

