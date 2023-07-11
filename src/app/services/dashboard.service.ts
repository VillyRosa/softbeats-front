import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  url: string = 'dashboard/';

  constructor(
    private http: HttpClient
  ) { }

  get(userid: number): Observable<any> {

    return this.http.get(this.url + userid)

  }

}
