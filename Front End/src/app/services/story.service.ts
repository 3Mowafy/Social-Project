import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  _url = 'http://127.0.0.1:3000/api/story/';
  public serverUrl = 'http://127.0.0.1:3000/';
  constructor(private _http: HttpClient) {}

  addStory(data: any): Observable<any> {
    return this._http.post(`${this._url}addStory`, data);
  }

  showStory(): Observable<any> {
    return this._http.get(`${this._url}showStory`);
  }

  removeStory(id: any): Observable<any> {
    return this._http.delete(`${this._url}removeStory/${id}`);
  }
}
