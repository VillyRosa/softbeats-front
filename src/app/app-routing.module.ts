import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BeatsComponent } from './pages/beats/beats.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { GendersComponent } from './pages/genders/genders.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ClientsComponent } from './pages/clients/clients.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'beats', component: BeatsComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'genders', component: GendersComponent },
    { path: 'sales', component: SalesComponent },
    { path: 'clients', component: ClientsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
