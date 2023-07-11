import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  authUser: any;

  itens: any = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly dashboardService: DashboardService,
    private readonly functionsService: FunctionsService
  ) {

  }

  ngOnInit(): void {

    this.load();

  }

  load(): void {

    this.functionsService.showLoading = true;

    this.authUser = this.usersService.getAuth();

    this.dashboardService.get(this.authUser.id).subscribe({
      next: data => this.itens = data,
      error: err => console.log(err),
      complete: () => this.functionsService.showLoading = false
    })

  }

}