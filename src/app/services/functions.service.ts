import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  getUrl() {
    return 'http://localhost:3000/';
  }

  toBrl(value: number): string {
    return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

}
