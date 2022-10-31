import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public _data: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.profile();
  }
  profile() {
    if (this._data.isLoggedIn) {
      this._data.profile().subscribe(
        (res) => {
          this._data.isLoggedIn = true;
          this._data.userData = res.data;
        },
        () => {
          this._data.isLoggedIn = false;
          this._data.userData = null;
        }
      );
    }
  }

  logout() {
    this._data.logout().subscribe(
      () => {
        this._data.isLoggedIn = false;
        this._data.userData = null;
      },
      () => {},
      () => {
        location.reload();
        localStorage.removeItem('token');
      }
    );
  }
}
