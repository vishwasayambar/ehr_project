import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RegPatientComponent } from './reg-patient/reg-patient.component';
import { AddpatientComponent } from 'src/admin/patient/addpatient/addpatient.component';
import { AppointmentComponent } from './appointment/appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    RegPatientComponent,
    AppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
