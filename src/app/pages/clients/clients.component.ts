import { Component, OnInit } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import { BeatsService } from 'src/app/services/beats.service';
import { ClientsService } from 'src/app/services/clients.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { IbgeService } from 'src/app/services/ibge.service';
import { SalesService } from 'src/app/services/sales.service';
import { UsersService } from 'src/app/services/users.service';
import { ViacepService } from 'src/app/services/viacep.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {

  authUser: any;

  viewRegisters: boolean = true;

  tableLines: any = [];

  clients: any = [];
  sales: any = [];
  beats: any = [];

  clientForm: any = {
    name: '',
    email: '',
    telephone: '',
    instagram: '',
    address: {
      cep: '',
      state: null,
      city: null,
      neighborhood: '',
      street: '',
      number: '',
      complement: ''
    }
  };
  clientSales: any = [];
  tableLinesSales: any = [];

  states: any = [];
  cities: any = [];

  constructor(
    private usersService: UsersService,
    private clientsService: ClientsService,
    private viacepService: ViacepService,
    private ibgeService: IbgeService,
    private functionsService: FunctionsService,
    private salesService: SalesService,
    private beatsService: BeatsService
  ) {

  }

  ngOnInit(): void {

    this.load();

  }

  load(): void {

    this.functionsService.showLoading = true;

    this.authUser = this.usersService.getAuth();
    this.clients = [];
    this.tableLines = [];

    const clientsRequest = this.clientsService.getAll(this.authUser.id);
    const statesRequest = this.ibgeService.getStates();
    const salesRequest = this.salesService.getAll(this.authUser.id);
    const beatsRequest = this.beatsService.getAll(this.authUser.id);

    forkJoin([clientsRequest, statesRequest, salesRequest, beatsRequest]).subscribe({
      next: ([clientsResp, statesResp, salesResp, beatsResp]) => {
        this.clients = clientsResp;
        this.states = statesResp;
        this.sales = salesResp;
        this.beats = beatsResp;
  
        clientsResp.forEach((client: any) => this.tableLines.push([client.name, client.email, client.telephone, client.instagram]));
      },
      error: error => console.log(error),
      complete: () => {
        this.functionsService.showLoading = false;
      }
    });

  }

  onSearchChange(ev: string): void {
    this.tableLines = [];
    this.clients.forEach((client: any) => {
      if (client.name.toLowerCase().indexOf(ev.toLowerCase()) !== -1 || client.email.toLowerCase().indexOf(ev.toLowerCase()) !== -1 || client.instagram.indexOf(ev) !== -1) {
        this.tableLines.push([client.name, client.email, client.telephone, client.instagram]);
      }
    });
  }

  toggleView(ev: boolean): void {
    this.viewRegisters = ev;
    this.onCancel();
  }

  async getCities(): Promise<void> {

    this.functionsService.showLoading = true;
    this.clientForm.address.city = null;

    await firstValueFrom(this.ibgeService.getCities(this.clientForm.address.state))
      .then((data: any) => {

        this.cities = data;

      })
      .catch(err => console.log(err))
      .finally(() => this.functionsService.showLoading = false)

  }

  async searchCep(): Promise<void> {

    if (this.clientForm.address.cep.length !== 8) return;

    this.functionsService.showLoading = true;

    firstValueFrom(this.viacepService.searchCep(this.clientForm.address.cep))
      .then(async data => {

        if (!data.erro) {
          this.clientForm.address.state = data.uf;
          await this.getCities()
          this.clientForm.address.city = data.localidade;
          this.clientForm.address.neighborhood = data.bairro;
          this.clientForm.address.street = data.logradouro;
          this.clientForm.address.complement = data.complemento;
        } else {
          alert('Cep inválido.');
          this.clientForm.address.cep = '';
        }

      })
      .catch((err) => console.log(err))
      .finally(() => this.functionsService.showLoading = false)

  }

  async onSelectClient(ev: any): Promise<void> {

    this.clientForm.id = ev.id;
    this.clientForm.name = ev.name;
    this.clientForm.email = ev.email;
    this.clientForm.telephone = ev.telephone;
    this.clientForm.instagram = ev.instagram;
    
    this.clientSales = [];
    this.tableLinesSales = [];

    this.clientSales = this.sales.filter((aux: any) => aux.client_id === ev.id);
    this.clientSales.forEach((sale: any) => {
      this.tableLinesSales.push([
        this.clients.filter((aux: any) => aux.id === sale.client_id)[0].name,
        this.beats.filter((aux: any) => aux.id === sale.beat_id)[0].name,
        sale.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
        this.formateDate(sale.datetime)
      ]);
    });

    this.viewRegisters = false;

  }

  formateDate(datetime: string): string {

    return `${datetime.slice(8, 10)}/${datetime.slice(5, 7)}/${datetime.slice(0, 4)}`;

  }

  valueTotal(): string {

    let total: number = 0;

    this.clientSales.forEach((aux: any) => total+= parseFloat(aux.price));

    return total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

  onSave(): void {

    if (this.clientForm.name === '') return this.functionsService.returnAlert('Informe o nome do cliente!', 'danger');
    if (this.clientForm.email === '') return this.functionsService.returnAlert('Informe o email do cliente!', 'danger');
    if (this.clientForm.telephone === '') return this.functionsService.returnAlert('Informe o telefone do cliente!', 'danger');

    this.functionsService.showLoading = true;

    this.clientForm.userid = this.authUser.id;

    this.clientsService.create(this.clientForm).subscribe({
      next: data => {
        console.log(data)
      },
      error: error => console.log(error),
      complete: () => {
        this.functionsService.showLoading = false;
        this.load();
        this.viewRegisters = true;
        this.functionsService.returnAlert('Cliente cadastrado com sucesso!', 'success');
      }
    });

  }

  onEdit(): void {

    this.functionsService.showLoading = true;

    this.clientsService.edit(this.clientForm).subscribe({
      next: data => {
        this.functionsService.returnAlert('Cliente editado com sucesso!', 'success');
      },
      error: error => console.log(error),
      complete: () => {
        this.functionsService.showLoading = false;
        this.load();
        this.viewRegisters = true;
      }
    })

  }

  onDelete(): void {
    
    this.functionsService.showLoading = true;

    this.clientsService.delete(this.clientForm.id).subscribe({
      next: data => console.log(data),
      error: error => console.log(error),
      complete: () => {
        this.functionsService.showLoading = false;
        this.load();
        this.viewRegisters = true;
        this.functionsService.returnAlert('Cliente deletado com sucesso!', 'success');
      }
    });

  }

  onCancel(): void {
    this.clientForm = {
      name: '',
      email: '',
      telephone: '',
      instagram: '',
      address: {
        cep: '',
        state: null,
        city: null,
        neighborhood: '',
        street: '',
        number: '',
        complement: ''
      }
    };
  }

}