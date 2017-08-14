import { Component, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { VgEvents } from 'videogular2/src/core/events/vg-events';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  elem: any;

  buffer: any;
  buffer2: any;

  constructor( private api: VgAPI) { }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(
      () => {
        this.buffer = this.api.getMediaById('otherVideo');
        this.buffer2 = this.api.getMediaById('singleVideo');
        console.log(this.buffer);
        console.log(this.buffer2);

        if (this.buffer.time.left === 0) {
          this.buffer2.pause();
        }

        if (this.buffer.isBufferDetected || this.buffer2.isBufferDetected  ) {
          this.buffer.pause();
          this.buffer2.pause();
          console.warn('buffer!!');
        } else {
          if ( !this.buffer.isWaiting && !this.buffer2.isWaiting ) {
            this.buffer.play();
            this.buffer2.play();
          }
        }
    });
  }
}
