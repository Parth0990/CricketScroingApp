import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './Home/home.component';
import { AddTournamentComponent } from './Add-Tournament/add-tournament.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Login/login.component';
import { SignupComponent } from './SignUp/signup.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ViewTournamentComponent } from './ViewTournament/view-tournament.component';
import { EditMyProfileComponent } from './EditMyProfile/edit-my-profile.component';
import { SpinnerComponent } from './Spinner/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddTournamentComponent,
    LoginComponent,
    SignupComponent,
    ViewTournamentComponent,
    EditMyProfileComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MatDatepickerModule,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
