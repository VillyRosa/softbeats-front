import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() tableHeaders: any = [];
  @Input() tableLines: any = [];
  @Input() values: any = [];

  @Output() objSelected: EventEmitter<any> = new EventEmitter;

  setValues(obj: any) {
    this.objSelected.emit(obj);
  }

}
