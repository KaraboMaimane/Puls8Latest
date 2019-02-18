import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular'
import firebase from 'firebase';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class DatabaseProvider {
  currentUserID: any;
  userKey: any;
  currentUserPath: any;
  currentUserImage: any;
  currentUserName: any;
  allDjSArray = new Array();
  pic2;

  constructor(public http: HttpClient, public alertCtrl: AlertController) {
    console.log('Hello DatabaseProvider Provider');
  }

  Register(fullname, email, password) {
    return new Promise((accpt, rej) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref('Registration/' + user.uid).push({
          fullname: fullname,
          email: email,
          role: "Audience",
          userType: "user",
          img: this.pic2,
          key: user.uid
        })
        accpt("user registered")

      }, Error => {
        let alert = this.alertCtrl.create({
          title: 'Credentials Error',
          message: Error.message,
          buttons: ['Dismiss']
        });
        alert.present();
      })
    })

  }

  getAllDjs() {
    this.allDjSArray.length = 0;
    return new Promise((accpt, rej) => {
      firebase.database().ref('Registration/').on('value', (data: any) => {
        var Djs = data.val();
        var keys: any = Object.keys(Djs);
        console.log(keys)
        for (var i = 0; i < keys.length; i++) {
          var x = keys[i];
          var y = 'Registration/' + x;
          firebase.database().ref(y).on('value', (data2: any) => {
            var djInfomation = data2.val();
            var keys2: any = Object.keys(djInfomation);
            console.log(djInfomation)
            console.log(keys2)
            for (var j = 0; j < keys2.length; j++) {
              var k = keys2[j];
              console.log(k)
              let obj = {
                bio: djInfomation[k].bio, 
                city: djInfomation[k].city,
                email: djInfomation[k].email,
                fullname: djInfomation[k].fullname,
                gender: djInfomation[k].gender,
                genre: djInfomation[k].genre,
                payment: djInfomation[k].payment,
                price: djInfomation[k].price,
                role: djInfomation[k].role,
                img: djInfomation[k].img,
                stagename: djInfomation[k].stagename,
                key: k,
                key2: x
              }

              if (obj.role == "Dj") {
                this.allDjSArray.push(obj);
                console.log(obj)
              }

            }

          })
          accpt(this.allDjSArray)
        }
      })
    })
  }

  makeComment(key,userKey,userComment){
    return new Promise((accpt,rej)=>{
      firebase.database().ref('Comments/' + key).push({
        comment: userComment,
        username: userKey,
      })
    })
  }

  getuser(){
    return new Promise ((accpt,rej)=>{
      
      firebase.database().ref('Registration').on('value', (data: any) => {
        var users =  data.val();
        var user = firebase.auth().currentUser;
        var  userIDs = Object.keys(users);
        for (var x = 0; x < userIDs.length; x++){
          var str1 = new String( userIDs[x]); 
          var index = str1.indexOf( ":" ); 
          var currentUserID = userIDs[x].substr(index + 1);
          if (user.uid == currentUserID){
            this.storeUsername(userIDs[x].substr(0,index));
            firebase.database().ref('Registration/' + userIDs[x]).on('value', (data: any) => {
              var Userdetails = data.val(); 
              this.storeUserID(userIDs[x]);
              var keys2:any = Object.keys(Userdetails);
              var user = firebase.auth().currentUser;
              this.storeCurrentUserImage(Userdetails[keys2[0]].img);
              this.storeCurrentUsername(Userdetails[keys2[0]].Username);
              this.storeUserKey(keys2[0])
              this.storeCurrentUserPath(userIDs[x])
              accpt(Userdetails[keys2])
            })
            break
          }
          else{
            alert("you are not logged in")
          }
        }
      })
    })
   }

   storeUsername(username){
     console.log(username)
   }
   
   storeCurrentUsername(username){
   this.currentUserName =  username;
   }
   
   storeCurrentUserImage(img){
   this.currentUserImage = img;
   }
   
   storeCurrentUserPath(path){
   this.currentUserPath = path;
   }

   storeUserKey(key){
    this.userKey = key
   }

   storeUserID(uid){
    this.currentUserID = uid;
  }


}
