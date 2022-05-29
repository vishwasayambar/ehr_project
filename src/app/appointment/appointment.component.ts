import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppointmentService } from 'src/services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  popup = false;
  form: FormGroup;
  constructor(private fb: FormBuilder, private appointmentService: AppointmentService) {
    this.form = this.fb.group({
      patID: new FormControl(''),
      speciality: new FormControl(''),
      docID: new FormControl(''),
      date: new FormControl(''),
      time: new FormControl(''),

    });


   }

  ngOnInit(): void {
  }

  onAddDocSubmit() {
    const data = this.form.value;
    this.appointmentService.addAppointmentPatient(data);
    this.popup = true;
  }
}
