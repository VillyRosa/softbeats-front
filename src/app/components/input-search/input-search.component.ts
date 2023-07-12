import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent {
  
  @Input() search: string = '';
  @Input() noMargin: boolean = false;
  @Output() searchChange: EventEmitter<any> = new EventEmitter();

  clear(): void {
    this.search = '';
    this.changeValue();
  }

  changeValue(): void {
    this.searchChange.emit(this.search);
  }

}
