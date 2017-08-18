import { IPlayable } from 'videogular2/src/core/vg-media/i-playable';
import { Component } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/merge';

export interface ISource {
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  firstVideo: IPlayable;
  secondVideo: IPlayable;
  thirdVideo: IPlayable;
  audio: IPlayable;
  api: VgAPI;
  flag = true;

  source: Array<ISource> = [
    // tslint:disable-next-line:max-line-length
    { url: 'https://apexsct-my.sharepoint.com/personal/juan_rendon_yuxiglobal_com/Documents/Microsoft%20Teams%20Chat%20Files/matrix-min.mp4' },
    { url: 'https://apexsct-my.sharepoint.com/personal/juan_rendon_yuxiglobal_com/Documents/Microsoft%20Teams%20Chat%20Files/inmortals-min.mp4' },
    // tslint:disable-next-line:max-line-length
    { url: 'https://apexsct-my.sharepoint.com/personal/juan_rendon_yuxiglobal_com/Documents/Microsoft%20Teams%20Chat%20Files/league-mn.mp4' },
  ];

  currentIndex = 0;
  currentItem: ISource = this.source[this.currentIndex];
  secondItem: ISource = this.source[this.currentIndex + 1];

  constructor() { }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.firstVideo =  this.api.getMediaById('firstVideo');
    this.secondVideo = this.api.getMediaById('secondVideo');
    this.thirdVideo = this.api.getMediaById('thirdVideo');
    this.audio = this.api.getMediaById('backgroundAudio');
    console.log(this.secondVideo);
    this.secondVideo.subscriptions.loadedMetadata.merge(
      this.thirdVideo.subscriptions.loadedMetadata
    ).subscribe(() => {
      let currentTime = 0;
      if (this.currentIndex === 0) {
        currentTime = 0;
      } else if (this.currentIndex === 1) {
        currentTime = 20;
      } else {
        currentTime = 40;
      }
      this.firstVideo.currentTime = currentTime;
      this.audio.currentTime = currentTime;
      this.playVideo();
    });

    this.secondVideo.subscriptions.ended.merge(
      this.thirdVideo.subscriptions.ended
    ).subscribe(() => {

      this.nextVideo();
      this.api.pause();
    });
    // Todo: Set seek for slider scrub-bar
    this.secondVideo.subscriptions.seeked.subscribe(timeSeeked => {
      if (this.currentIndex === 0) {
        this.firstVideo.currentTime = timeSeeked.target.currentTime;
        this.audio.currentTime = timeSeeked.target.currentTime;
      } else if (this.currentIndex === 1) {
        this.firstVideo.currentTime = timeSeeked.target.currentTime + 20;
        this.audio.currentTime = timeSeeked.target.currentTime + 20;
      } else {
        this.firstVideo.currentTime = timeSeeked.target.currentTime + 40;
        this.audio.currentTime = timeSeeked.target.currentTime + 40;
      }
    });
  }

  nextVideo() {
    if (this.currentIndex === this.source.length - 1) {
      return;
    }
    // this.api.pause();
    this.currentIndex = ++this.currentIndex % this.source.length;
    this.currentItem = this.source[this.currentIndex];
    this.flag = !this.flag;
  }

  playVideo() {
    this.audio.play();
    this.firstVideo.play();
    this.flag ? this.secondVideo.play() : this.thirdVideo.play();
  }

  findIndex(number) {
    this.currentIndex = number;
    this.currentItem = this.source[this.currentIndex];
  }

  prevVideo() {
    this.api.pause();
   if (this.currentIndex < 1) {
     return;
   }
   this.currentIndex--;
    this.currentItem = this.source[this.currentIndex];
  }



}
