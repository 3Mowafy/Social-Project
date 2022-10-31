import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Err404Component } from './components/pages/err404/err404.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/User/login/login.component';
import { RegisterComponent } from './components/pages/User/register/register.component';
import { EditProfileComponent } from './components/pages/User/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/pages/User/profile/profile.component';
import { EditPostComponent } from './components/pages/Posts/edit-post/edit-post.component';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { RedirectGuard } from './guards/redirect.guard';
import { SingleComponent } from './components/pages/Posts/single/single.component';
import { FriendComponent } from './components/pages/User/friend/friend.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: 'login', component: LoginComponent, canActivate: [IsLoggedGuard] },
  {
    path: 'user',
    component: ProfileComponent,
  },
  { path: 'user/:id', component: FriendComponent },
  {
    path: 'editprofile',
    component: EditProfileComponent,
  },
  {
    path: 'editpost/:id',
    component: EditPostComponent,
  },
  {
    path: 'single/:id',
    component: SingleComponent,
  },
  { path: '**', component: Err404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
