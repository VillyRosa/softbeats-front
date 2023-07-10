import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})

export class HeaderPageComponent {

  @Input() title: string = '';
  @Input() showActionButtons: boolean = true;

  @Output() handleClick: EventEmitter<boolean> = new EventEmitter;

  changeView(isRegister: boolean = true): void {
    this.handleClick.emit(isRegister);
  }

}