import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent {
  
  @Input() search: string = '';
  @Output() searchChange: EventEmitter<string> = new EventEmitter();

  clear(): void {
    this.search = '';
    this.changeValue(this.search);
  }

  changeValue(value: string): void {
    this.searchChange.emit(value);
  }

}
