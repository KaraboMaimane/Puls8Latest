import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewChatRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-chat-request',
  templateUrl: 'view-chat-request.html',
})
export class ViewChatRequestPage {

  date: any;
  name: any;
  email: any;
  time: any;
  image: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewChatRequestPage');
    let profile = this.navParams.get("userObj")
    console.log(profile)
    let userProfile = profile;
    this.image = userProfile.userImage;
    this.time = userProfile.time;
    this.email = userProfile.userEmail;
    this.name = userProfile.username;
    this.date = userProfile.date;
  }

}
