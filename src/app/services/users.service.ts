import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FunctionsService } from './functions.service';

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

  url: string = '';

  authenticatedUser: any = undefined;

  constructor(
    private functionsService: FunctionsService,
    private http: HttpClient
  ) { 

    this.url = functionsService.getUrl() + 'users/';

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
