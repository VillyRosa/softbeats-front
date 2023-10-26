import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BASE_URL } from 'src/app/constants/constants';

@Component({
  selector: 'app-beat-card',
  templateUrl: './beat-card.component.html',
  styleUrls: ['./beat-card.component.scss']
})
export class BeatCardComponent implements OnInit {

  beat: any;
  timer: any = setTimeout
  url = BASE_URL;

  @Input() audio: string = '';
  @Input() image: string = '';
  @Input() name: string = '';
  @Input() beatObj: string = '';

  @Output() beatSelect: EventEmitter<any> = new EventEmitter;

  ngOnInit() {
    this.beat = new Audio(BASE_URL+'beats/audio/'+this.audio);
  }

}
