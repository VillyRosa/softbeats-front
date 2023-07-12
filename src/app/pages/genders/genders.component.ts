import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { GendersService } from 'src/app/services/genders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-genders',
  templateUrl: './genders.component.html',
  styleUrls: ['./genders.component.scss']
})

export class GendersComponent implements OnInit {

  authUser: any = [];

  viewRegisters: boolean = true;

  tableLines: any = [];
  genders: any = [];
  genderForm: any = {
    name: '',
    description: ''
  };

  constructor(
    private readonly functionsService: FunctionsService,
    private readonly usersService: UsersService,
    private readonly gendersService: GendersService
  ) {}

  ngOnInit(): void {
    
    this.load();

  }

  load(): void {

    this.functionsService.showLoading = true;

    this.authUser = this.usersService.getAuth();
    this.genders = [];
    this.tableLines = [];

    this.gendersService.getAll(this.authUser.id).subscribe({
      next: data => {
        this.genders = data;
        data.forEach((gender: any) => this.tableLines.push([gender.name, gender.description]))
      },
      error: err => console.log(err),
      complete: () => this.functionsService.showLoading = false
    });

  }

  toggleView(ev: boolean): void {
    this.viewRegisters = ev;
    this.onCancel();
  }

  onSearchChange(ev: string) {
    this.tableLines = [];
    this.genders.forEach((gender: any) => {
      if (gender.name.toLowerCase().indexOf(ev.toLowerCase()) !== -1) {
        this.tableLines.push([gender.name, gender.description]);
      }
    });
  }

  onSelectGender(ev: any): void {
    this.genderForm.id = ev.id;
    this.genderForm.name = ev.name;
    this.genderForm.description = ev.description;

    this.viewRegisters = false;
  }

  onSave(): void {

    if (this.genderForm.name === '') return this.functionsService.returnAlert('Informe o nome do gênero!', 'danger');

    this.functionsService.showLoading = true;

    const body: any = {
      userid: this.usersService.getAuth().id,
      name: this.genderForm.name,
      price: this.genderForm.price,
      description: this.genderForm.description
    };

    this.gendersService.create(body).subscribe({
      next: data => {
        console.log(data);
        this.functionsService.returnAlert('Gênero cadastrado com sucesso!', 'success');
      },
      error: err => console.log(err),
      complete: () =>  {
        this.functionsService.showLoading = false
        this.load();
        this.viewRegisters = true;
      }
    });

  }

  onEdit(): void {

    if (this.genderForm.name === '') return this.functionsService.returnAlert('Informe o nome da categoria!', 'danger');
    if (this.genderForm.price === '') return this.functionsService.returnAlert('Informe o preço da categoria!', 'danger');

    this.functionsService.showLoading = true;

    this.gendersService.edit(this.genderForm).subscribe({
      next: data => {
        console.log(data);
        this.functionsService.returnAlert('Gênero editado com sucesso!', 'success')
      },
      error: err => console.log(err),
      complete: () => {
        this.functionsService.showLoading = false;
        this.load();
        this.viewRegisters = true;
      }
    });

  }

  onDelete(): void {

    this.functionsService.showLoading = true;

    this.gendersService.delete(this.genderForm.id).subscribe({
      next: data => {
        console.log(data);
        this.functionsService.returnAlert('Gênero excluido com sucesso!', 'success')
      },
      error: err => console.log(err),
      complete: () => {
        this.functionsService.showLoading = false;
        this.load();
        this.viewRegisters = true;
      }
    });

  }

  onCancel(): void {
    this.genderForm = {
      name: '',
      description: ''
    };
  }

}
