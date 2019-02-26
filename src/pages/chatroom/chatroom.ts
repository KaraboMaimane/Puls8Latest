import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'
import { DatabaseProvider } from '../../providers/database/database';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  currentUserName: any;
  path: any;
  message: any;
  Usermessage;
  message2;
  email: any;
  date: any;
  time: any;
  UserKey;
  djKey: any;
  key;
  name;
  chatArray= new Array();
  key2;
  side;
  userArray: any[];
  role: any;
  img: any;
  fullname: any;
  stagename: any;
  image: any;
  check = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public database: DatabaseProvider) {
    this.Usermessage = "You have a new message from :"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroomPage');
    let profileKey = this.navParams.get("userKey")
    let djKey = this.navParams.get("djKey")
    let djKey2 = this.navParams.get("objKey")
    this.key2 = djKey2
    this.djKey = djKey
    this.key = profileKey;
    if(this.key != undefined){
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
    this.side = "left"
    this.database.getChats(this.path).then((data:any)=>{
      console.log(data.djKey)
      this.chatArray = [];
      this.chatArray.length = 0;
      this.chatArray = data;
      var index = Object.keys(this.chatArray)
      console.log(index)
      for(var x = 0; x <this.chatArray.length;x++){
        var k = this.chatArray[x]
        console.log(k)
      }
    })
    }
    else if(this.key2 != undefined){
      console.log(this.key2)
      let djDetails = this.key2;
      this.djKey = djDetails.userKey
      this.side = "right"
      console.log(this.djKey)

      this.UserKey = firebase.auth().currentUser.uid;
      console.log(this.UserKey)
       this.path =  this.djKey + '/' + this.UserKey;
       this.database.getChats(this.path).then((data:any)=>{
        console.log(data.djKey)
        this.chatArray = [];
        this.chatArray.length = 0;
        this.chatArray = data;
        var index = Object.keys(this.chatArray)
        console.log(index)
        for(var x = 0; x <this.chatArray.length;x++){
          var k = this.chatArray[x]
          console.log(k)
        }
      })
    }else{
      this.chatArray.length = 0;
      this.chatArray = []
      this.database.getChats(this.djKey).then((data:any)=>{
        console.log(data);
        this.chatArray.length = 0;
        this.chatArray = data
  
      })
    }
    
    this.database.getuser().then((data:any)=>{
      console.log("data found",data)
      this.currentUserName = data.fullname
      this.role = data.role
      this.stagename = data.stagename
      this.image = data.img
      console.log(this.image)
      
      
    })
   

    console.log(this.path)
    this.database.getChats(this.path)
  }

  reply(){
    let image =  this.image
    this.database.replyMessage(this.path,this.message2,this.side,this.currentUserName).then((data:any)=>{
      if(this.role != "Audience"){
        this.database.createUserInbox(this.UserKey,this.Usermessage,this.djKey,this.stagename,image,this.check)
        console.log(data)
      }
      
      })
  }

}