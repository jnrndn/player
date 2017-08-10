import { Component } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  api: VgAPI;
  $currentTime: Observable<any>;
  myMedia;
  media;

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.timeUpdate
     .subscribe(x => console.log(x.srcElement.currentTime, this.media, this.myMedia));

  }
}
