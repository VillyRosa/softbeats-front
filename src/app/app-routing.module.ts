import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BeatsComponent } from './pages/beats/beats.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { GendersComponent } from './pages/genders/genders.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// Guards
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'beats', component: BeatsComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'genders', component: GendersComponent },
    { path: 'sales', component: SalesComponent },
    { path: 'clients', component: ClientsComponent }
  ], canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
