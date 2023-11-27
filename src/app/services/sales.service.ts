import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ISaleCreate {
  userid: number;
  clientid: number;
  beatid: number;
  price: number;
};

interface ISaleEdit {
  id: number;
  clientid?: number;
  beatid?: number;
  price?: number;
};

@Injectable({
  providedIn: 'root'
})

export class SalesService {

  url: string = 'sales/';

  constructor(private http: HttpClient) { }

  getAll(userid: number): Observable<any> {

    return this.http.get(this.url + userid)

  }

  create(sale: ISaleCreate) {

    return this.http.post(this.url, sale)

  }

  edit(sale: ISaleEdit): Observable<any> {

    return this.http.patch(this.url, sale)

  }

  delete(saleid: number): Observable<any> {

    return this.http.delete(this.url + saleid)
    
  }

}