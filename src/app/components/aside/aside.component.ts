import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {

  url: string = '';

  constructor(
    private location: Location,
    private router: Router
  ) {

    this.url = this.location.path();

  }

  async moveTo(page: string) {
    await this.router.navigate(['home/' + page]);
    this.url = this.location.path();
  }

  isInThisPage(page: string): boolean {

    if (this.url.includes(page)) return true;

    return false;

  }

}
