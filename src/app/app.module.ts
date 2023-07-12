import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from './app-routing.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NgxMaskModule } from 'ngx-mask';

// Interceptors
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';

// Componentes
import { MatIconModule } from '@angular/material/icon';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { DecorationContainerComponent } from './components/decoration-container/decoration-container.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AsideComponent } from './components/aside/aside.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BeatsComponent } from './pages/beats/beats.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { GendersComponent } from './pages/genders/genders.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { TableComponent } from './components/table/table.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FormButtonsComponent } from './components/form-buttons/form-buttons.component';
import { AlertComponent } from './components/alert/alert.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { BeatCardComponent } from './components/beat-card/beat-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InputPasswordComponent,
    DecorationContainerComponent,
    RegisterComponent,
    HomeComponent,
    AsideComponent,
    DashboardComponent,
    BeatsComponent,
    CategoriesComponent,
    GendersComponent,
    SalesComponent,
    ClientsComponent,
    HeaderPageComponent,
    LoadingComponent,
    DashboardCardComponent,
    TableComponent,
    NotFoundComponent,
    FormButtonsComponent,
    AlertComponent,
    InputSearchComponent,
    BeatCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
