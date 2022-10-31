import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  msg = '';
  register = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(15),
      Validators.max(80),
    ]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    ]),
  });
  constructor(private _data: AuthService, private router: Router) {}

  ngOnInit(): void {}
  get firstName() {
    return this.register.get('firstName');
  }
  get lastName() {
    return this.register.get('lastName');
  }
  get email() {
    return this.register.get('email');
  }
  get age() {
    return this.register.get('age');
  }
  get gender() {
    return this.register.get('gender');
  }
  get password() {
    return this.register.get('password');
  }

  registerMethod() {
    if (this.register.valid) {
      this._data
        .register(this.register.value)
        .subscribe(() => this.router.navigateByUrl('login'));
    } else {
      this.msg = 'Your Data is invalid';
    }
  }
}
