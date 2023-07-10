import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form-buttons',
  templateUrl: './form-buttons.component.html',
  styleUrls: ['./form-buttons.component.scss']
})
export class FormButtonsComponent {

  constructor(private readonly usersService: UsersService) {}

  @Input() isCreate: boolean = true;
  
  @Output() saveAction: EventEmitter<any> = new EventEmitter();
  @Output() editAction: EventEmitter<any> = new EventEmitter();
  @Output() deleteAction: EventEmitter<any> = new EventEmitter();

  handleClickSave() {
    this.saveAction.emit();
  }

  handleClickEdit() {
    this.editAction.emit();
  }

  handleClickDelete() {
    this.deleteAction.emit();
  }

}
