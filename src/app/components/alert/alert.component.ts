import { Component } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  endAnimation: boolean = false;

  constructor(
    private functionsService: FunctionsService
  ) {}

  toggleVisibility(): boolean {

    if (this.functionsService.alertObj.showAlert) {

      const animation = setTimeout(() => this.endAnimation = true, 3000)

      const finish = setTimeout(() => {
        this.endAnimation = false;
        this.functionsService.alertObj.showAlert = false;
        this.toggleVisibility();
        clearTimeout(animation);
        clearTimeout(finish);
      }, 4000);
    }

    return this.functionsService.alertObj.showAlert;
  }

  returnMessage(): string {
    return this.functionsService.alertObj.message;
  }

  returnType(): string {
    return this.functionsService.alertObj.type;
  }

}
