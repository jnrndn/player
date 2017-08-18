import { Component } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

export interface ISource {
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  firstVideo: any;
  secondVideo: any;
  audio: any;
  api: VgAPI;

  source: Array<ISource> = [
    // tslint:disable-next-line:max-line-length
    { url: 'https://apexsct-my.sharepoint.com/personal/carlos_angulo_yuxiglobal_com/Documents/Microsoft%20Teams%20Chat%20Files/matrix-min.mp4' },
    { url: 'https://apexsct-my.sharepoint.com/personal/carlos_angulo_yuxiglobal_com/Documents/Microsoft%20Teams%20Chat%20Files/inmortals-min.mp4' },
    // tslint:disable-next-line:max-line-length
    { url: 'https://apexsct-my.sharepoint.com/personal/carlos_angulo_yuxiglobal_com/Documents/Microsoft%20Teams%20Chat%20Files/league-mn.mp4' },
  ];

  currentIndex = 0;
  currentItem: ISource = this.source[this.currentIndex];

  constructor() { }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    // this.audio = this.api.getMediaById('backgroundAudio');
    // this.audio.volume = 0.6;
    this.api.getMediaById('secondVideo').subscriptions.loadedMetadata.subscribe(() => {
      this.playVideo();
    });
    this.api.getMediaById('secondVideo').subscriptions.ended.subscribe(() => {
      this.nextVideo();
      this.api.pause();
    });
    this.api.getMediaById('secondVideo').subscriptions.seeking.subscribe(timeSeeked => {
      if (this.currentIndex === 0) {
        this.api.getMediaById('firstVideo').currentTime = timeSeeked.target.currentTime;
      } else if (this.currentIndex === 1) {
        this.api.getMediaById('firstVideo').currentTime = timeSeeked.target.currentTime + 20;
      } else {
        this.api.getMediaById('firstVideo').currentTime = timeSeeked.target.currentTime + 40;
      }
    });
  }

  nextVideo() {
    this.currentIndex++;
    if (this.currentIndex === this.source.length) {
      this.currentIndex = 0;
    }
    this.currentItem = this.source[this.currentIndex];
  }

  playVideo() {
    this.api.play();
  }

  findIndex(number) {
    this.currentIndex = number;
    this.currentItem = this.source[this.currentIndex];
  }

  prevVideo() {
    this.currentIndex--;
    if (this.currentIndex === this.source.length) {
      this.currentIndex = 0;
    }
    this.currentItem = this.source[this.currentIndex];
  }



}
