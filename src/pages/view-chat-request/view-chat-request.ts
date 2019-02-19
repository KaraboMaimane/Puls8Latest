import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

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

  userKey: any;
  djKey: any;
  date: any;
  name: any;
  email: any;
  time: any;
  image: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public database: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewChatRequestPage');
    let profile = this.navParams.get("userObj")
    let djkey = this.navParams.get("djObj")
    console.log(profile)
    console.log(djkey)
    this.djKey = djkey
    let userProfile = profile;
    this.image = userProfile.userImage;
    this.time = userProfile.time;
    this.email = userProfile.userEmail;
    this.name = userProfile.username;
    this.date = userProfile.date;
    this.userKey = userProfile.userKey;
  }


  chatroom(){
    this.database.StartChat(this.userKey,this.djKey,this.name,this.userKey,this.email,this.date,this.time).then((data:any)=>{
      console.log("chat started",data)
      this.navCtrl.push('ChatroomPage',{userKey: this.userKey})
    })
  }
}
