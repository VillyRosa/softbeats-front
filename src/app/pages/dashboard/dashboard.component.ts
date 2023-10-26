import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BeatsService } from 'src/app/services/beats.service';
import { ClientsService } from 'src/app/services/clients.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { SalesService } from 'src/app/services/sales.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  authUser: any;

  itens: any = [];
  tableLines: any = [];

  sales: any = [];
  beats: any = [];
  clients: any = [];

  constructor(
    private usersService: UsersService,
    private dashboardService: DashboardService,
    private functionsService: FunctionsService,
    private beatsService: BeatsService,
    private clientsService: ClientsService,
    private salesService: SalesService
  ) {

  }

  ngOnInit(): void {

    this.load();

  }

  load(): void {

    this.functionsService.showLoading = true;
    
    this.authUser = this.usersService.getAuth();

    const dashboardService = this.dashboardService.get(this.authUser.id);
    const beatsService = this.beatsService.getAll(this.authUser.id);
    const clientsRequest = this.clientsService.getAll(this.authUser.id);
    const salesRequest = this.salesService.getAll(this.authUser.id);

    forkJoin([dashboardService, beatsService, clientsRequest, salesRequest]).subscribe({
      next: ([dashboardResp, beatsResp, clientsResp, salesResp]) => {
        this.itens = dashboardResp;
        this.beats = beatsResp;
        this.sales = salesResp.slice(0, 5);
        this.clients = clientsResp;

        this.sales.forEach((sale: any) => {
          this.tableLines.push([
            this.clients.filter((aux: any) => aux.id === sale.client_id)[0].name,
            this.beats.filter((aux: any) => aux.id === sale.beat_id)[0].name,
            sale.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
            this.formateDate(sale.datetime)
          ]);
        });
      },
      error: err => console.log(err),
      complete: () => this.functionsService.showLoading = false
    })

  }

  formateDate(datetime: string): string {

    return `${datetime.slice(8, 10)}/${datetime.slice(5, 7)}/${datetime.slice(0, 4)}`;

  }

}