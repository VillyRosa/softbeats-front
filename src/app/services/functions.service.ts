import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  showLoading: boolean = false;

  alertObj: any = {
    showAlert: false,
    message: '',
    type: '',
    timer: 3000
  };

  constructor() {}

  toBrl(value: number): string {
    return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

  returnAlert(message: string, type: 'success' | 'danger' | 'warning' = 'success', timer: number = 3000): void {

    if (this.alertObj.showAlert) return;

    this.alertObj.showAlert = true;
    this.alertObj.message = message;
    this.alertObj.type = type;
    this.alertObj.timer = timer;

  }

  convertDate(date: string): string {
    return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;
  }

}
