import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  _url = 'http://127.0.0.1:3000/api/user/';

  public isLoggedIn = false;
  public userData = null;
  public serverUrl = 'http://127.0.0.1:3000/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  register(data: any): Observable<any> {
    return this._http.post(`${this._url}register`, data);
  }

  logIn(data: any): Observable<any> {
    return this._http.post(`${this._url}login`, data);
  }

  profile(): Observable<any> {
    return this._http.get(`${this._url}profile`);
  }

  editProfile(data: any): Observable<any> {
    return this._http.patch(`${this._url}editProfile`, data);
  }

  addProfileImage(data: any): Observable<any> {
    return this._http.patch(`${this._url}addProfileImage`, data);
  }

  addProfileCoverIamge(data: any): Observable<any> {
    return this._http.patch(`${this._url}addProfileCoverIamge`, data);
  }

  removeProfile(): Observable<any> {
    return this._http.delete(`${this._url}removeProfile`);
  }

  users(): Observable<any> {
    return this._http.get(`${this._url}users`);
  }

  singleUser(id: any): Observable<any> {
    return this._http.get(`${this._url}singleUser/${id}`);
  }

  logout(): Observable<any> {
    return this._http.get(`${this._url}logout`);
  }
}
