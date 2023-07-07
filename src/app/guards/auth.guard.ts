import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private readonly usersService: UsersService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {

    if (this.usersService.getAuth() === undefined) {
      this.router.navigate(['/login']);
      return false; 
    } else return true;

  }
}
