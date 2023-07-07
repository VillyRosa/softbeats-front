import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {

  loading: boolean = false;

  tableLines: any = [];

  clients: any = [];

  constructor(
    private readonly clientsService: ClientsService
  ) {

  }

  ngOnInit() {

    this.load()

  }

  async load() {

    this.loading = true;

    await firstValueFrom(this.clientsService.getAll(1))
      .then((data) => {
        this.clients = data;
        data.forEach((client: any) => this.tableLines.push([ client.name, client.email, client.telephone, client.instagram ]))
      })
      .finally(() => this.loading = false)
      .catch((err) => console.log(err))

  }

}
