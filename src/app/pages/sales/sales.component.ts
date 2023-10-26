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
    beat: {
      beatid: null,
      price: ''
    }
  };

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

        console.log(this.sales)
        salesResp.forEach((sale: any) => {
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

  selectBeat(): void {
    const beat = this.beats.filter((aux: any) => aux.id === Number(this.saleForm.beat.beatid))[0];
    const licenceid = beat.category_id;

    this.saleForm.beat.price = this.categories.filter((aux: any) => aux.id === Number(licenceid))[0].price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

  formateDate(datetime: string): string {

    return `${datetime.slice(8, 10)}/${datetime.slice(5, 7)}/${datetime.slice(0, 4)}`;

  }

  onSave() {

    this.functionsService.showLoading = true;

    const priceString = this.saleForm.beat.price;
    const numericString = priceString.replace(/[^\d.,]/g, '').replace(',', '.');
    const priceDouble = parseFloat(numericString);

    this.salesService.create({userid: this.authUser.id, clientid: this.saleForm.clientid, beatid: this.saleForm.beat.beatid, price: priceDouble}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.load();
        this.viewRegisters = true;
        this.saleForm = {
          clientid: null,
          beat: {
            beatid: null,
            price: ''
          }
        };
      },
      error: (err: any) => console.error(err),
      complete: () => this.functionsService.showLoading = false
    });

  }

  onEdit() {

  }

  onDelete() {

  }

  onCancel() {

  }

}