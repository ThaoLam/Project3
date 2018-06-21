import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'ngx-flash-messages';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReadpageComponent } from './components/readpage/readpage.component';
import { InfopageComponent } from './components/infopage/infopage.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { TransferService } from './services/transfer.service';
import { UploadComponent } from './components/upload/upload.component';


//*********************************************************
const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'profile', component: ProfileComponent},
  {path:'infopage', component: InfopageComponent},
  {path:'readpage', component: ReadpageComponent},
  {path:'upload', component: UploadComponent},
]
//**********************************************************

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    ProfileComponent,
    ReadpageComponent,
    InfopageComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, TransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
