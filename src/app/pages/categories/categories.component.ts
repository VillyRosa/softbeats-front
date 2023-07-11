import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit {

  authUser: any;
  viewRegisters: boolean = true;

  categories: any = [];
  tableLines: any = [];

  categoryForm: any = {
    name: '',
    price: '',
    description: ''
  };

  constructor(
    private readonly usersService: UsersService,
    private readonly functionsService: FunctionsService,
    private readonly categoriesService: CategoriesService
  ) {

  }

  ngOnInit(): void {

    this.load();

  }

  load(): void {

    this.functionsService.showLoading = true;

    this.authUser = this.usersService.getAuth();
    this.categories = [];
    this.tableLines = [];

    this.categoriesService.getAll(this.authUser.id).subscribe({
      next: data => {
        this.categories = data;
        data.forEach((category: any) => this.tableLines.push([category.name, this.functionsService.toBrl(category.price)]))
      },
      error: err => console.log(err),
      complete: () => this.functionsService.showLoading = false
    });

  }

  toggleView(ev: boolean): void {
    this.viewRegisters = ev;
    this.onCancel();
  }

  onSelectCategory(ev: any): void {
    this.categoryForm.id = ev.id;
    this.categoryForm.name = ev.name;
    this.categoryForm.price = ev.price;
    this.categoryForm.description = ev.description;

    this.viewRegisters = false;
  }

  onSave(): void {

    if (this.categoryForm.name === '') return this.functionsService.returnAlert('Informe o nome da categoria!', 'danger');
    if (this.categoryForm.price === '') return this.functionsService.returnAlert('Informe o preço da categoria!', 'danger');

    this.functionsService.showLoading = true;

    const body: any = {
      userid: this.usersService.getAuth().id,
      name: this.categoryForm.name,
      price: this.categoryForm.price,
      description: this.categoryForm.description
    };

    this.categoriesService.create(body).subscribe({
      next: data => {
        console.log(data);
        this.functionsService.returnAlert('Categoria cadastrada com sucesso!', 'success');
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

    if (this.categoryForm.name === '') return this.functionsService.returnAlert('Informe o nome da categoria!', 'danger');
    if (this.categoryForm.price === '') return this.functionsService.returnAlert('Informe o preço da categoria!', 'danger');

    this.functionsService.showLoading = true;

    this.categoriesService.edit(this.categoryForm).subscribe({
      next: data => {
        console.log(data);
        this.functionsService.returnAlert('Categoria editada com sucesso!', 'success')
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

    this.categoriesService.delete(this.categoryForm.id).subscribe({
      next: data => {
        console.log(data);
        this.functionsService.returnAlert('Categoria excluida com sucesso!', 'success')
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
    this.categoryForm = {
      name: '',
      price: '',
      description: ''
    };
  }

}