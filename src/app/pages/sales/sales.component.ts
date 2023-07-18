import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BeatsService } from 'src/app/services/beats.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ClientsService } from 'src/app/services/clients.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { SalesService } from 'src/app/services/sales.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  authUser: any;

  viewRegisters: boolean = true;
  tableLines: any = [];

  sales: any = [];
  beats: any = [];
  categories: any = [];
  clients: any = [];

  saleForm: any = {
    clientid: null,
    beats: [
      {
        beatid: null,
        price: ''
      }
    ]
  }

  constructor(
    private functionsService: FunctionsService,
    private salesService: SalesService,
    private beatsService: BeatsService,
    private categoriesService: CategoriesService,
    private clientsService: ClientsService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {

    this.functionsService.showLoading = true;

    this.authUser = this.usersService.getAuth();
    this.clients = [];

    const salesRequest = this.salesService.getAll(this.authUser.id);
    const beatsService = this.beatsService.getAll(this.authUser.id);
    const categoriesService = this.categoriesService.getAll(this.authUser.id);
    const clientsRequest = this.clientsService.getAll(this.authUser.id);

    forkJoin([salesRequest, beatsService, categoriesService, clientsRequest]).subscribe({
      next: ([salesResp, beatsResp, categoriesResp, clientsResp]) => {
        this.sales = salesResp;
        this.beats = beatsResp;
        this.categories = categoriesResp;
        this.clients = clientsResp;

        salesResp.forEach((sale: any) => {
          let price: number = 0;
          sale.itens.forEach((item: any) => price+= parseFloat(item.price));

          this.tableLines.push([
            clientsResp.filter((client: any) => client.id === sale.client_id)[0].name,
            sale.itens.length,
            this.functionsService.toBrl(price),
            this.functionsService.convertDate(sale.datetime)
          ]);
        });
      },
      error: err => console.log(err),
      complete: () => this.functionsService.showLoading = false
    });

  }

  toggleView(ev: boolean): void {
    this.viewRegisters = ev;
    this.onCancel();
  }

  onSelectSale(ev: any): void {

    console.log(ev)

    this.saleForm.id = ev.id;
    this.saleForm.clientid = ev.client_id;

    this.saleForm.beats = [];
    ev.itens.forEach((sale: any) => {
      this.saleForm.beats.push({
        beatid: sale.beat_id,
        price: sale.price
      });
    });
    
    this.viewRegisters = false;

  }

  addBeat(): void {
    this.saleForm.beats.push({
      beatid: null,
      price: ''
    });
  }

  removeBeat(index: number): void {
    if (this.saleForm.beats.length === 1) return this.functionsService.returnAlert('É necessário ter ao menos um beat!', 'warning');
    this.saleForm.beats.splice(index, 1);
  }

  onSave() {

  }

  onEdit() {

  }

  onDelete() {

  }

  onCancel() {

  }

}