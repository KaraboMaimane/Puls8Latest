import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { DatabaseProvider } from '../../providers/database/database';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the TrackUploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
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


  constructor(public navCtrl: NavController, public navParams: NavParams, public PulsedbDatabase: DatabaseProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
  }

  // saveArtist(event: any) {
  //   this.PulsedbDatabase.UploadMusic(this.trackName).then(data => {
  //     this.PulsedbDatabase.storeToDB(data, this.artistName).then(() => {
  //     })
  //     this.navCtrl.pop();
  //   },
  //     Error => {
  //       console.log(Error)
  //     })
  // }


}
