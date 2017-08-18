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
    this.api.getMediaById('secondVideo').subscriptions.loadedMetadata.subscribe(() => {
      if (this.currentIndex === 0) {
        this.api.getMediaById('firstVideo').currentTime = 0;
        this.api.getMediaById('backgroundAudio').currentTime = 0;
      } else if (this.currentIndex === 1) {
        this.api.getMediaById('firstVideo').currentTime = 20;
        this.api.getMediaById('backgroundAudio').currentTime = 20;
      } else {
        this.api.getMediaById('firstVideo').currentTime = 40;
        this.api.getMediaById('backgroundAudio').currentTime = 40;
      }
      this.playVideo();
    });
    this.api.getMediaById('secondVideo').subscriptions.ended.subscribe(() => {
      this.nextVideo();
      this.api.pause();
    });
    this.api.getMediaById('secondVideo').subscriptions.seeked.subscribe(timeSeeked => {
      if (this.currentIndex === 0) {
        this.api.getMediaById('firstVideo').currentTime = timeSeeked.target.currentTime;
        this.api.getMediaById('backgroundAudio').currentTime = timeSeeked.target.currentTime;
      } else if (this.currentIndex === 1) {
        this.api.getMediaById('firstVideo').currentTime = timeSeeked.target.currentTime + 20;
        this.api.getMediaById('backgroundAudio').currentTime = timeSeeked.target.currentTime + 20;
      } else {
        this.api.getMediaById('firstVideo').currentTime = timeSeeked.target.currentTime + 40;
        this.api.getMediaById('backgroundAudio').currentTime = timeSeeked.target.currentTime + 40;
      }
    });
  }

  nextVideo() {
    this.api.pause();
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
    this.api.pause();
    this.currentIndex--;
    if (this.currentIndex === -1) {
      this.currentIndex = 0;
    }
    this.currentItem = this.source[this.currentIndex];
  }



}
