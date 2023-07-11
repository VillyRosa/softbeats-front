import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FunctionsService } from './services/functions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'softbeats';

  constructor(
    private functionsService: FunctionsService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) this.functionsService.showLoading = false;
    });
  }

}
