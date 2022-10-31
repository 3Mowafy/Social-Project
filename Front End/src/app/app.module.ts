import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { Err404Component } from './components/pages/err404/err404.component';
import { RegisterComponent } from './components/pages/User/register/register.component';
import { LoginComponent } from './components/pages/User/login/login.component';
import { ProfileComponent } from './components/pages/User/profile/profile.component';
import { EditProfileComponent } from './components/pages/User/edit-profile/edit-profile.component';
import { PostComponent } from './components/pages/Posts/post/post.component';
import { SingleComponent } from './components/pages/Posts/single/single.component';
import { EditPostComponent } from './components/pages/Posts/edit-post/edit-post.component';
import { AllFriendsComponent } from './components/pages/User/all-friends/all-friends.component';
import { FriendComponent } from './components/pages/User/friend/friend.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    Err404Component,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent,
    PostComponent,
    SingleComponent,
    EditPostComponent,
    AllFriendsComponent,
    FriendComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
