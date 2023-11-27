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
    this.tableLines = [];
    this.sales = [];

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
          this.tableLines.push([
            this.clients.filter((aux: any) => aux.id === sale.client_id)[0].name,
            this.beats.filter((aux: any) => aux.id === sale.beat_id)[0].name,
            sale.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
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

    this.saleForm = {
      clientid: null,
      beat: {
        beatid: null,
        price: ''
      }
    };

    this.onCancel();
  }

  onSelectSale(ev: any): void {

    this.saleForm.id = ev.id;
    this.saleForm.clientid = ev.client_id;
    this.saleForm.beat.beatid = ev.beat_id;
    this.saleForm.beat.price = ev.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });;

    this.viewRegisters = false;

  }

  selectBeat(): void {
    if (this.saleForm.beat.beatid === 'null') return;
    const beat = this.beats.filter((aux: any) => aux.id === Number(this.saleForm.beat.beatid))[0];
    const licenceid = beat.category_id;

    this.saleForm.beat.price = this.categories.filter((aux: any) => aux.id === Number(licenceid))[0].price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }

  formateDate(datetime: string): string {

    return `${datetime.slice(8, 10)}/${datetime.slice(5, 7)}/${datetime.slice(0, 4)}`;

  }

  onSave() {

    if (this.saleForm.clientid === null) return this.functionsService.returnAlert('Insira o cliente', 'danger');
    if (this.saleForm.beat.beatid === null) return this.functionsService.returnAlert('Insira o beat', 'danger');
    if (this.saleForm.beat.price === null || this.saleForm.beat.price === '') return this.functionsService.returnAlert('Insira o valor', 'danger');

    this.functionsService.showLoading = true;

    const priceString = this.saleForm.beat.price;
    const numericString = priceString.replace(/[^\d.,]/g, '').replace(',', '.');
    const priceDouble = parseFloat(numericString);

    this.salesService.create({ userid: this.authUser.id, clientid: this.saleForm.clientid, beatid: this.saleForm.beat.beatid, price: priceDouble }).subscribe({
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
        this.functionsService.returnAlert(data.message, 'success');
      },
      error: (err: any) => console.error(err),
      complete: () => this.functionsService.showLoading = false
    });

  }

  onEdit() {

    if (this.saleForm.clientid === null) return this.functionsService.returnAlert('Insira o cliente', 'danger');
    if (this.saleForm.beat.beatid === null || this.saleForm.beat.beatid === 'null') return this.functionsService.returnAlert('Insira o beat', 'danger');
    if (this.saleForm.beat.price === null || this.saleForm.beat.price === '') return this.functionsService.returnAlert('Insira o valor', 'danger');

    this.functionsService.showLoading = true;

    this.salesService.edit({ id: this.saleForm.id, clientid: this.saleForm.clientid, beatid: this.saleForm.beat.beatid, price: this.convertToDouble(this.saleForm.beat.price) }).subscribe({
      next: (data: any) => {
        console.log(data);
        this.functionsService.returnAlert(data.message, 'success');
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

  onDelete() {

    this.functionsService.showLoading = true;

    this.salesService.delete(this.saleForm.id).subscribe({
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
        this.functionsService.returnAlert(data.message, 'success');
      },
      error: (err: any) => console.error(err),
      complete: () => this.functionsService.showLoading = false
    });

  }

  onCancel() {
    this.saleForm = {
      clientid: null,
      beat: {
        beatid: null,
        price: ''
      }
    };
  }

  convertToDouble(valorString: string): number {
    const valorLimpo = valorString.replace(/\s/g, '');

    if (valorLimpo.startsWith('R$')) {
      const valorNumericoString = valorLimpo.substring(2);
      const valorNumericoFormatado = valorNumericoString.replace(/\./g, '').replace(',', '.');
      const valorNumerico = parseFloat(valorNumericoFormatado);
      if (!isNaN(valorNumerico)) {
        return valorNumerico;
      } else {
        console.error('Formato inválido para conversão: ' + valorString);
        return 0;
      }
    } else {
      console.error('Formato inválido para conversão: ' + valorString);
      return 0;
    }
  }

}