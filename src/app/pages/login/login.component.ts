import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FunctionsService } from 'src/app/services/functions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginObj: any = {
    email: '',
    password: ''
  }

  constructor(
    private usersService: UsersService,
    private router: Router,
    private readonly functionsService: FunctionsService
  ) {

  }

  ngOnInit(): void {
    
  }

  async login() {

    this.functionsService.showLoading = true;

    await firstValueFrom(this.usersService.login(this.loginObj))
      .then((data) => {
        window.localStorage.setItem('login', JSON.stringify(data));
        this.router.navigate(['/home/dashboard']);
        this.functionsService.returnAlert('Autenticado com sucesso!', 'success');
      })
      .finally(() => {
        this.functionsService.showLoading = false;
      })
      .catch((err) => {
        this.functionsService.returnAlert(err.error.message, 'danger');
      })

  }

}
