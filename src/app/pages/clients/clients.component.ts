import { Component, OnInit } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { IbgeService } from 'src/app/services/ibge.service';
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

  states: any = [];
  cities: any = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly clientsService: ClientsService,
    private readonly viacepService: ViacepService,
    private readonly ibgeService: IbgeService,
    private readonly functionsService: FunctionsService
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

    forkJoin([clientsRequest, statesRequest]).subscribe({
      next: ([clientsResp, statesResp]) => {
        this.clients = clientsResp;
        this.states = statesResp;
  
        clientsResp.forEach((client: any) => this.tableLines.push([client.name, client.email, client.telephone, client.instagram]));
      },
      error: error => console.log(error),
      complete: () => {
        this.functionsService.showLoading = false;
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
          alert('Cep inválido.')
          this.clientForm.address.cep = '';
        }

      })
      .catch((err) => console.log(err))
      .finally(() => this.functionsService.showLoading = false)

  }

  onSelectClient(ev: any) {

    this.clientForm.id = ev.id;
    this.clientForm.name = ev.name;
    this.clientForm.email = ev.email;
    this.clientForm.telephone = ev.telephone;
    this.clientForm.instagram = ev.instagram;

    this.viewRegisters = false;

  }

  onSave(): void {

    if (this.clientForm.name === '') return this.functionsService.returnAlert('Informe o nome do cliente!', 'danger');
    if (this.clientForm.email === '') return this.functionsService.returnAlert('Informe o email do cliente!', 'danger');
    if (this.clientForm.telephone === '') return this.functionsService.returnAlert('Informe o telefone do cliente!', 'danger');

    this.functionsService.showLoading = true;

    const body: any = {
      userid: this.usersService.getAuth().id,
      name: this.clientForm.name,
      email: this.clientForm.email,
      telephone: this.clientForm.telephone,
      instagram: this.clientForm.instagram
    };

    this.clientsService.create(body).subscribe({
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
      next: data => console.log(data),
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