import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  _url = 'http://127.0.0.1:3000/api/post/';

  public serverUrl = 'http://127.0.0.1:3000/';

  constructor(private _http: HttpClient) {}

  addPost(data: any): Observable<any> {
    return this._http.post(`${this._url}addPost`, data);
  }

  posts(): Observable<any> {
    return this._http.get(`${this._url}posts`);
  }

  myPosts(): Observable<any> {
    return this._http.get(`${this._url}userPosts`);
  }

  singlePost(id: any): Observable<any> {
    return this._http.get(`${this._url}singlePost/${id}`);
  }

  editPost(id: any, data: any): Observable<any> {
    return this._http.patch(`${this._url}editPost/${id}`, data);
  }

  removePost(id: any): Observable<any> {
    return this._http.delete(`${this._url}removePost/${id}`);
  }

  addRemoveLike(id: any): Observable<any> {
    return this._http.get(`${this._url}addRemoveLike/${id}`);
  }

  addComment(id: any, data: any): Observable<any> {
    return this._http.post(`${this._url}addComment/${id}`, data);
  }

  editComment(id: any, id_2: any, data: any): Observable<any> {
    return this._http.patch(`${this._url}editComment/${id}/${id_2}`, data);
  }

  removeComment(id: any, id_2: any): Observable<any> {
    return this._http.delete(`${this._url}removeComment/${id}/${id_2}`);
  }

  sharePost(id: any): Observable<any> {
    return this._http.get(`${this._url}sharePost/${id}`);
  }
}
