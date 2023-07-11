import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ICreate {
  userid: number;
  name: string;
  email: string;
  telephone: string;
  instagram: string;
}

interface IEdit {
  id: number,
  name?: string;
  email?: string;
  telephone?: string;
  instagram?: string;
}

@Injectable({
  providedIn: 'root'
})

export class ClientsService {

  url: string = 'clients/';

  constructor(
    private http: HttpClient
  ) { 

  }

  getAll(userid: number): Observable<any> {

    return this.http.get(this.url + userid)

  }

  create(client: ICreate): Observable<any> {

    return this.http.post(this.url, client)

  }

  edit(client: IEdit): Observable<any> {

    return this.http.patch(this.url, client)

  }

  delete(clientId: number): Observable<any> {

    return this.http.delete(this.url + clientId)

  }
  
}
