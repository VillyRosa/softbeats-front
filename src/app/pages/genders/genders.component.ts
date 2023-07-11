import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-genders',
  templateUrl: './genders.component.html',
  styleUrls: ['./genders.component.scss']
})

export class GendersComponent implements OnInit {

  authUser: any = [];

  viewRegisters: boolean = true;

  genderForm: any = {
    name: '',
    description: ''
  };

  constructor(
    private readonly functionsService: FunctionsService,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    
    this.load();

  }

  load(): void {

    this.functionsService.showLoading = true;

    this.authUser = this.usersService.getAuth();

    this.functionsService.showLoading = false;

  }

  toggleView(ev: boolean): void {
    this.viewRegisters = ev;
    this.onCancel();
  }

  onSelectClient(ev: any): void {

    this.genderForm.id = ev.id;
    this.genderForm.name = ev.name;
    this.genderForm.description = ev.description;

    this.viewRegisters = false;

  }

  onSave(): void {

    this.functionsService.showLoading = true;

  }

  onEdit(): void {

    this.functionsService.showLoading = true;

  }

  onDelete(): void {

    this.functionsService.showLoading = true;

  }

  onCancel(): void {
    this.genderForm = {
      name: '',
      description: ''
    };
  }

}
