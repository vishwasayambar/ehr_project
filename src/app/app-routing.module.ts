import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegPatientComponent } from './reg-patient/reg-patient.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('../admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('../doctor/doctor.module').then((m) => m.DoctorModule),
  },
  {
    path: 'patient/add',
    component: RegPatientComponent
  },
  {
    path: 'appointmet/take',
    component: AppointmentComponent
  },
  // {
  //   path: 'patient/list',
  //   component: RegPatientComponent
  // },
  { path: '**', component: HomeComponent, redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
