import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FunctionsService } from 'src/app/services/functions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerObj: any = {
    name: '',
    email: '',
    password: '',
    passwordRepeat: ''
  };

  constructor(
    private usersService: UsersService,
    private router: Router,
    private readonly functionsService: FunctionsService
  ) {

  }

  async register() {

    this.functionsService.showLoading = true;

    await firstValueFrom(this.usersService.register(this.registerObj))
      .then((data) => {
        this.router.navigate(['/login']);
        this.functionsService.returnAlert('Conta criada com sucesso!', 'success');
      })
      .finally(() => this.functionsService.showLoading = false)
      .catch((err) => this.functionsService.returnAlert(err.error.message, 'danger'))

  }

}
