import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Auth } from './pages/auth/auth';
import { Dashboard } from './pages/dashboard/dashboard';
import { AddVehicle } from './pages/add-vehicle/add-vehicle';
import { QrDisplay } from './pages/qr-display/qr-display';
import { IncomingRequests } from './pages/incoming-requests/incoming-requests';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'auth', component: Auth },
  { path: 'dashboard', component: Dashboard },
  { path: 'add-vehicle', component: AddVehicle },
  { path: 'qr-display/:id', component: QrDisplay },
  { path: 'requests', component: IncomingRequests },
  { path: '**', redirectTo: '' }
];
