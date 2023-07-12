import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-beat-card',
  templateUrl: './beat-card.component.html',
  styleUrls: ['./beat-card.component.scss']
})
export class BeatCardComponent {

  @Input() image: string = '';
  @Input() name: string = '';

}
