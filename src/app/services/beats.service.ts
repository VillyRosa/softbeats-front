import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeatsService {

  url: string = 'beats/';

  constructor(
    private http: HttpClient
  ) { }

  getAll(userid: number): Observable<any> {

    return this.http.get(this.url + userid)

  }

}
