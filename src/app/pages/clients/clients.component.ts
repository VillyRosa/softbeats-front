import { Component, OnInit } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';
import { IbgeService } from 'src/app/services/ibge.service';
import { UsersService } from 'src/app/services/users.service';
import { ViacepService } from 'src/app/services/viacep.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {

  loading: boolean = false;

  authUser: any;

  viewRegisters: boolean = true;

  tableLines: any = [];

  clients: any = [];

  clientForm: any = {
    name: '',
    email: '',
    telphone: '',
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
    private readonly ibgeService: IbgeService
  ) {

  }

  ngOnInit(): void {

    this.load();

  }

  load(): void {

    this.loading = true;

    this.authUser = this.usersService.getAuth();
    console.log(this.authUser);

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
        this.loading = false;
      }
    });

  }

  async getCities() {

    this.loading = true;
    this.clientForm.address.city = null;

    await firstValueFrom(this.ibgeService.getCities(this.clientForm.address.state))
      .then((data: any) => {

        this.cities = data;

      })
      .catch(err => console.log(err))
      .finally(() => this.loading = false)

  }

  async searchCep(): Promise<void> {

    if (this.clientForm.address.cep.length !== 8) return;

    this.loading = true

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
      .finally(() => this.loading = false)

  }

  save() {

    this.loading = true;

    console.log(this.usersService.getAuth());

    const body: any = {
      userid: this.usersService.getAuth(),
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
      complete: () => this.loading = false
    });

  }

  edit() {
    console.log('Editando!');
  }

  delete() {
    console.log('Deletando!');
  }

}
