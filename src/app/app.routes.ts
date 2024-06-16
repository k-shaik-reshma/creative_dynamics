import { Routes } from '@angular/router';

import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LandingPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirect to landing page
  { path: '**', redirectTo: '/login' }, // Redirect to landing for any other route
];

export { routes };
