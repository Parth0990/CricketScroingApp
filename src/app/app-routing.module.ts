import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTournamentComponent } from './Add-Tournament/add-tournament.component';
import { EditMyProfileComponent } from './EditMyProfile/edit-my-profile.component';
import { HomeComponent } from './Home/home.component';
import { LoginComponent } from './Login/login.component';
import { AuthguradGuard } from './shared/authgurad.guard';
import { SignupComponent } from './SignUp/signup.component';
import { ViewTournamentComponent } from './ViewTournament/view-tournament.component';

const routes: Routes = [
  {
    path: 'addtournament',
    component: AddTournamentComponent,
    pathMatch: 'full',
    canActivate: [AuthguradGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'viewtournament',
    component: ViewTournamentComponent,
    pathMatch: 'full',
    canActivate: [AuthguradGuard]
  },
  {
    path: 'editmyprofile',
    component: EditMyProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthguradGuard]
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthguradGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
