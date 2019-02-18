import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the ViewProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {
  profile;
  messagestate: string;
  userstatus: any;
  DjProfile;
  djName;
  djGenre;
  djBio;
  djStagename;
  djEmail;
  djImage;
  djCity;
  djKey;
  constructor(public navCtrl: NavController, public navParams: NavParams,public database: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewprofilePage');
    this.profile = this.navParams.get("Djkey")
    console.log(this.profile)
    this.DjProfile = this.profile

    this.djName = this.DjProfile.fullname;
    this.djBio = this.DjProfile.bio;
    this.djGenre = this.DjProfile.genre;
    this.djEmail = this.DjProfile.email;
    this.djImage = this.DjProfile.img;
    this.djStagename = this.DjProfile.stagename;
    this.djCity = this.DjProfile.city;
    this.djKey = this.DjProfile.key2;
    console.log(this.djName)

    this.database.getuser().then((data:any)=>{
      console.log(data)
    })
  }
  

  SendMessage(event:string){
    

    // this.database.makeComment()
  }

}
