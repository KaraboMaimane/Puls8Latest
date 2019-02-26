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
  chatsucc: string;
  pendingMessage2: any;
  djImage: any;
  check = false;
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
    this.djEmail = this.DjProfile.djEmail;
    this.djImage = this.DjProfile.djImage;


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
    let message = "I am interested in booking you for a possible event, would you please accept my chat request."
    let pendingMessage = "Pending response from: "
    this.message2 = message
    this.pendingMessage2 =  pendingMessage;
    console.log(this.message2)
  }

  send() {
    
    this.database.createRequest(this.djKey,this.userKey,this.UserName,this.userEmail,this.message2,this.userImage).then((data:any)=>{
      console.log("data saved",data)
      this.database.createInbox(this.djKey,this.UserName,this.userEmail).then((data)=>{
        console.log("inbox created",data)
        this.database.StartChat(this.djKey,this.userKey,this.UserName,this.userEmail,this.message2,this.userImage,this.userKey).then((data:any)=>{
          console.log("Chat started")
          this.database.createUserInbox(this.userKey,this.pendingMessage2,this.djKey,this.djName,this.djImage,this.check).then((data:any)=>{
            console.log("inbox sent", data)
          })
        })
      })
      // this.database.createChatRoom(this.userKey,this.djKey).then((data)=>{
      //   console.log("Chatroom created",data)
      // })
    })

    this.chatsucc = 'true';
    let timer = setInterval(()=>{
      this.chatsucc = 'false';
      this.navCtrl.setRoot('CategoriesPage');
      clearInterval(timer);
    },3000);

  }


}