import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  msg = '';
  isDelted = false;
  profileInfo = new FormGroup({
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
  });

  constructor(public _data: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.profile();
  }
  profile() {
    this._data.profile().subscribe(
      (res) => {
        this._data.isLoggedIn = true;
        this._data.userData = res.data;
        this.profileInfo.patchValue(res.data);
      },
      () => {
        this._data.isLoggedIn = false;
        this._data.userData = null;
      }
    );
  }
  editProfile() {
    this._data
      .editProfile(this.profileInfo.value)
      .subscribe(() => this.router.navigateByUrl('profile'));
  }

  addProfileImage(event: any) {
    const file = event.target.files[0];
    const upload = new FormData();
    upload.append('img', file);

    this._data.addProfileImage(upload).subscribe(
      () => this.router.navigateByUrl('profile'),
      () => (this.msg = 'invalid extension Only jpg')
    );
  }

  addProfileCoverImage(event: any) {
    const file = event.target.files[0];
    const upload = new FormData();
    upload.append('img', file);

    this._data.addProfileCoverIamge(upload).subscribe(
      () => this.router.navigateByUrl('profile'),
      () => (this.msg = 'invalid extension Only jpg')
    );
  }

  showdelted() {
    this.isDelted = !this.isDelted;
  }

  deleteAccount() {
    this._data.removeProfile().subscribe(
      (res) => res,
      (e) => e.error.message,
      () => this.router.navigateByUrl('')
    );
  }
}
