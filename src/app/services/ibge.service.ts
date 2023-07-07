import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  constructor(
    private http: HttpClient
  ) { }

  getStates(): Observable<any> {

    return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')

  }

  getCities(uf: string): Observable<any> {

    return this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)

  }

}
