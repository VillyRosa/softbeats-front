import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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

  loading: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {

  }

  async register() {

    this.loading = true;

    await firstValueFrom(this.usersService.register(this.registerObj))
      .then((data) => this.router.navigate(['/login']))
      .finally(() => this.loading = false)
      .catch((err) => alert(err))

  }

}
