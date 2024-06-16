import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '../features/landing-page/landing-page.component';
import { DashboardComponent } from '../features/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LandingPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirect to login page
  { path: '**', redirectTo: '/login' }, // Redirect to login for any other route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
