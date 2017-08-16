import { Component } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { VgEvents } from 'videogular2/src/core/events/vg-events';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  firstVideo: any;
  secondVideo: any;
  audio: any;

  constructor(private api: VgAPI) { }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getMasterMedia().subscriptions.timeUpdate.subscribe(() => {
      this.firstVideo = this.api.getMediaById('firstVideo');
      this.secondVideo = this.api.getMediaById('secondVideo');
      this.audio = this.api.getMediaById('audio');
      console.log('1stBuffer', this.firstVideo);
      console.log('2ndbBuffer', this.secondVideo);
      console.log('Current', this.secondVideo.currentTime * 1000);

      if (!this.firstVideo.time.left) {
        this.secondVideo.pause();
        this.audio.pause();
      }

      // launch when buffer is detected
      if (this.firstVideo.isBufferDetected || this.secondVideo.isBufferDetected) {
        console.warn('buffer!!');
        // Pause the video if some buffer is waiting for data
        this.firstVideo.pause();
        this.secondVideo.pause();
        console.log('buffer1', this.firstVideo);
        console.log('buffer2', this.secondVideo);
        }
      });

    this.api.getMasterMedia().subscriptions.pause.subscribe(() => {
      this.api.getMasterMedia().subscriptions.progress.subscribe(() => {
        console.log('Estoy pausado y no he cargado el buffer');
        this.firstVideo = this.api.getMediaById('firstVideo');
        this.secondVideo = this.api.getMediaById('secondVideo');
        console.log(this.firstVideo.isWaiting);
        console.log(this.secondVideo.isWaiting);
        if (this.firstVideo.isBufferDetected && this.secondVideo.isBufferDetected) {
          console.log('Estoy pausado y ya cargué el buffer');
          this.firstVideo.play();
          this.secondVideo.play();
        }
      });
    });
  }
}
