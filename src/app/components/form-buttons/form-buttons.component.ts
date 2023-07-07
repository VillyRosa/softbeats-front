import { Component, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form-buttons',
  templateUrl: './form-buttons.component.html',
  styleUrls: ['./form-buttons.component.scss']
})
export class FormButtonsComponent {

  constructor(private readonly usersService: UsersService) {}

  @Input() isCreate: boolean = true;
  @Input() saveAction: any;
  @Input() editAction: any;
  @Input() deleteAction: any;

}
