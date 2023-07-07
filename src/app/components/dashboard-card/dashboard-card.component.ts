import { Component, Input } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent {

  @Input() icon: string = '';
  @Input() iconColor: string = '';
  @Input() title: string = '';

  constructor(
    private functionsService: FunctionsService
  ) {

  }

  toBrl(value: number): string {
    return this.functionsService.toBrl(value);
  }

}
