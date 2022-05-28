import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from '../patient/patient.component';
import { UtilsModule } from 'src/utils/utils.module';
import { HttpClientModule } from '@angular/common/http';
import { ViewpatientComponent } from '../patient/viewpatient/viewpatient.component';


@NgModule({
  declarations: [
    PatientComponent,
    ViewpatientComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
