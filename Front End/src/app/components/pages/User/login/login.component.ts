import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  msg = '';
  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    ]),
  });
  constructor(private _data: AuthService, private router: Router) {}

  ngOnInit(): void {}

  get email() {
    return this.login.get('email');
  }
  get password() {
    return this.login.get('password');
  }

  logIn() {
    if (this.login.valid) {
      this._data.logIn(this.login.value).subscribe(
        (res) => {
          localStorage.setItem('token', res.data.token);
          this._data.isLoggedIn = true;
          this._data.userData = res.data.userData;
        },
        (e) => {
          this._data.isLoggedIn = false;
          this._data.userData = null;
          this.msg = e.error.message;
        },
        () => this.router.navigateByUrl('/')
      );
    } else {
      this.msg = 'Data is invalid';
    }
  }
}
