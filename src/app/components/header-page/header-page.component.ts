import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})

export class HeaderPageComponent {

  @Input() title: string = '';
  @Input() showActionButtons: boolean = true;

}
