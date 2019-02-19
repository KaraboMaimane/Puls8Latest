import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage {
  path: any;
  message: any;
  message2;
  email: any;
  date: any;
  time: any;
  UserKey: void;
  djKey: any;
  key;
  name;
  chatArray= new Array
  constructor(public navCtrl: NavController, public navParams: NavParams,public database: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroomPage');
    let profileKey = this.navParams.get("userKey")
    let djKey = this.navParams.get("djKey")
    this.djKey = djKey
    this.key = profileKey;
    console.log(this.key)
    this.name = this.key.username;
    this.UserKey = this.key.userKey;
    this.time = this.key.time;
    this.date = this.key.date;
    this.email = this.key.userEmail;
    this.message = this.key.message
    console.log(this.djKey)
    let currentId = firebase.auth().currentUser.uid;
    console.log(currentId);
    this.path = this.djKey + '/' + this.UserKey

    this.database.getChats(this.path).then((data:any)=>{
      console.log(data.djKey)
      this.chatArray = data;
      var index = Object.keys(this.chatArray)
      console.log(index)
      for(var x = 0; x <this.chatArray.length;x++){
        var k = this.chatArray[x]
        console.log(k)
      }
    })

    this.database.retrieveChats(this.djKey).then((data:any)=>{
      console.log(data);
    })


    
  }

  reply(){
    this.database.replyMessage(this.path,this.message2).then((data:any)=>{
      console.log("reply sent" ,data)

    })
  }

}
