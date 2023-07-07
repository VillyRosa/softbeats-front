import { Injectable } from '@angular/core';
import { FunctionsService } from './functions.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ICreate {
  userid: number;
  name: string;
  email: string;
  telephone: string;
  instagram: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url: string = '';

  constructor(
    private readonly functionsService: FunctionsService,
    private http: HttpClient
  ) { 

    this.url = functionsService.getUrl() + 'clients/'

  }

  getAll(userid: number): Observable<any> {

    return this.http.get(this.url + `?userid=${userid}`)

  }

  create(client: ICreate): Observable<any> {

    return this.http.post(this.url, client)

  }
  
}
