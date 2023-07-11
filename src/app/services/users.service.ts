import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ILogin {
  email: string;
  password: string;
};

interface IRegister {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  url: string = 'users/';

  authenticatedUser: any = undefined;

  constructor(
    private http: HttpClient
  ) { 

  }

  login(bodyRequest: ILogin) {

    return this.http.post(this.url + 'login/', bodyRequest)

  }

  register(bodyRequest: IRegister) {

    return this.http.post(this.url + 'create/', bodyRequest)

  }

  getAuth(): any {

    if (window.localStorage.getItem('login')) {
      const authenticatedUser = window.localStorage.getItem('login');
      if (authenticatedUser !== null) {
        this.authenticatedUser = JSON.parse(authenticatedUser);
      }
    }
    
    return this.authenticatedUser;
  }

}
