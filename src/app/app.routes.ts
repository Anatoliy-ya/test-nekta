import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DevicesComponent } from './devices/devices.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'devices', component: DevicesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
