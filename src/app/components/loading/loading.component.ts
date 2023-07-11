import { Component, Input } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  constructor(
    private readonly functionsService: FunctionsService
  ) {}

  toggleVisibility(): boolean {
    return this.functionsService.showLoading; 
  }

}
