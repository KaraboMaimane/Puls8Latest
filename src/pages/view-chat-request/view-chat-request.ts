import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  standalone: false,
  selector: 'page-view-chat-request',
  templateUrl: 'view-chat-request.html',
})
export class ViewChatRequestPage {

  userKey: any;
  djKey: any;
  date: any;
  name: any;
  email: any;
  time: any;
  image: any;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    public database: DatabaseProvider
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state || window.history.state;
    const profile = state?.['userObj'];
    const djkey = state?.['djObj'];
    if (profile) {
      this.djKey = djkey;
      this.image = profile.userImage;
      this.time = profile.time;
      this.email = profile.userEmail;
      this.name = profile.username;
      this.date = profile.date;
      this.userKey = profile.userKey;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewChatRequestPage');
  }

  chatroom() {
    const state = window.history.state;
    const userProfile2 = state?.['userObj'];
    const djProfile = state?.['djObj'];
    console.log(userProfile2 + '/' + djProfile);
    this.navCtrl.navigateForward(['/chatroom'], { state: { userKey: userProfile2, djKey: djProfile } });
  }
}
