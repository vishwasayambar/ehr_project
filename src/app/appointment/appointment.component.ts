import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PatientService } from 'src/services/patient.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.sass']
})
export class AppointmentComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.form = this.fb.group({
      patID: new FormControl(''),
      speciality: new FormControl(''),
      date: new FormControl(''),
      time: new FormControl(''),

    });


   }

  ngOnInit(): void {
  }

  onAddDocSubmit() {
    
  }
}
