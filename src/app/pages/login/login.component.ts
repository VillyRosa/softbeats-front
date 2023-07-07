import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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

  loading: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    
  }

  async login() {

    this.loading = true;

    await firstValueFrom(this.usersService.login(this.loginObj))
      .then((data) => {
        window.localStorage.setItem('login', JSON.stringify(data));
        this.router.navigate(['/home/dashboard']);
      })
      .finally(() => this.loading = false)
      .catch((err) => {
        alert(err);
      })

  }

}
