import { Component, SimpleChanges } from '@angular/core';
import { VgAPI } from 'videogular2/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  bufferVideoOne: any;
  bufferVideoTwo: any;

  constructor( private api: VgAPI ) {}

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getMediaById('singleVideo').subscriptions.bufferDetected.subscribe(buffer => console.log(buffer));
  }

}
