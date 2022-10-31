import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrls: ['./all-friends.component.css'],
})
export class AllFriendsComponent implements OnInit {
  allusers = [];
  constructor(public _data: AuthService) {}

  ngOnInit(): void {
    this.users();
  }

  users() {
    this._data.users().subscribe((res) => {
      this.allusers = res.data;
    });
  }
}
