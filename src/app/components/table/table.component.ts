import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() tableHeaders: any = [];
  @Input() tableLines: any = [];
  @Input() values: any = [];

  teste(aaa: any) {
    console.log(aaa);
  }

}
