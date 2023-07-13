import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-beat-card',
  templateUrl: './beat-card.component.html',
  styleUrls: ['./beat-card.component.scss']
})
export class BeatCardComponent implements OnInit {

  beat: any;
  timer: any = setTimeout

  @Input() audio: string = '';
  @Input() image: string = '';
  @Input() name: string = '';

  ngOnInit() {
    this.beat = new Audio(this.audio);
  }

}
