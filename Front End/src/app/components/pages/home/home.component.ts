import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isShow = false;
  constructor(public _data: AuthService) {}
  ngOnInit(): void {
    this.navShow();
  }

  navShow() {
    this._data.profile().subscribe(
      (d) => {
        this._data.isLoggedIn = true;
        this._data.userData = d.data;
      },
      () => {
        this._data.isLoggedIn = false;
        this._data.userData = null;
      },
      () => (this.isShow = true)
    );
  }
}
