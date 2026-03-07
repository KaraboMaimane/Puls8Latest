import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  standalone: false,
  selector: 'page-track-upload',
  templateUrl: 'track-upload.html',
})
export class TrackUploadPage {
  artistName;
  albumName;
  trackName;
  arrProfile = new Array();
  name;
  surname;

  constructor(
    public navCtrl: NavController,
    public PulsedbDatabase: DatabaseProvider
  ) {}

  ionViewDidLoad() {}

  upload(event?: any) {
    // TODO: handle file upload
  }

  saveArtist() {
    // TODO: save artist track
  }
}
