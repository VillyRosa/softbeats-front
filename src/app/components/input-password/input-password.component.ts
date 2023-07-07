import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent {

  
  showPassword: boolean = false;
  
  @Input() placeholder: string = 'Senha';
  @Input() password: string = '';
  @Output() passwordChange: EventEmitter<string> = new EventEmitter

  changePassword(): void {
    this.passwordChange.emit(this.password);
  }

}
