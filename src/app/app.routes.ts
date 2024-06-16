import { Routes } from '@angular/router';

import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DishDetailComponent } from './features/dish-detail/dish-detail.component';
import { ChefPageComponent } from './features/chef-page/chef-page.component';
import { CreateAccountComponent } from './features/create-account/create-account.component';

const routes: Routes = [
  { path: 'login', component: LandingPageComponent },
  { path: 'dish/:id', component: DishDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'chef', component: ChefPageComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },

];

export { routes };
