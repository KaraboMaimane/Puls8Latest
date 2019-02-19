import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { database } from 'firebase';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the ChatRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-request',
  templateUrl: 'chat-request.html',
})
export class ChatRequestPage {
  userEmail: any;
  djEmail: any;
  djKey: Promise<void>;
  userKey: any;
  userImage: any;
  UserName: any;
  userDetails: any;
  djBio: any;
  djName: any;
  DjProfile: any;
  profile: any;
  djname;
  name;
  message2;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider) {
    let profile = this.navParams.get("Djkey")

    console.log(profile)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatRequestPage');
    this.profile = this.navParams.get("Djkey")
    console.log(this.profile)
    this.DjProfile = this.profile

    this.djName = this.DjProfile.djName;
    this.djKey = this.DjProfile.djKey;
    this.djEmail = this.DjProfile.djEmail


    this.database.getuser().then((data: any) => {
      console.log(data)
      this.userDetails = data;
      this.UserName = this.userDetails.fullname;
      this.userImage = this.userDetails.img;
      this.userKey = this.userDetails.key;
      this.userEmail = this.userDetails.email;

      console.log(this.UserName)
    })

    // console.log(this.djKey)
    // this.database.getComments(this.djKey).then((data:any)=>{
    //   console.log(data)
    //   this.commentsArray = data;
    // })
    let message = "I am intrested in booking you for a possible event, would you please accept my chat request."
    this.message2 = message
    console.log(this.message2)
  }

  send() {
    
    let dateObj = new Date
    let time = dateObj.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
    let date = dateObj.toDateString();

    this.database.createRequest(this.djKey,this.UserName,this.userEmail,this.userKey,date,time,this.message2,this.userImage).then((data:any)=>{
      console.log("data saved",data)
      this.database.createInbox(this.userKey,this.djName,this.djEmail,this.djKey,date,time).then((data)=>{
        console.log("inbox created",data)
      })
      this.database.createChatRoom(this.userKey,this.djKey).then((data)=>{
        console.log("Chatroom created",data)
      })
    })

  }


}
