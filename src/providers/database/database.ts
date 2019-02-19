import { HttpClient } from '@angular/common/http';
import { Injectable ,NgZone} from '@angular/core';
import { AlertController,LoadingController } from 'ionic-angular'
import { ToastController } from 'ionic-angular';
import firebase from 'firebase';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class DatabaseProvider {
  
  
  
  commentsArray(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  currentUserID: any;
  userKey: any;
  currentUserPath: any;
  currentUserImage: any;
  currentUserName: any;
  allDjSArray = new Array();
  DjCategoryArray = new Array();
  ProfileArr = new Array();
  pic2;
  stayLoggedIn;
  djCommentsArray = new Array();
  djInboxArray = new Array();
  userCommentsArray2 = new Array();
  userInbox = new Array();
  constructor(public http: HttpClient, public alertCtrl: AlertController,private ngzone: NgZone,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    console.log('Hello DatabaseProvider Provider');
  }


  getProfile(){
    return new Promise((resolve, reject) => {
    let userID = firebase.auth().currentUser;
    firebase.database().ref("Registration/" + userID.uid).on('value', (data: any) => {
      let details = data.val();
      this.ProfileArr.length = 0;
    let keys = Object.keys(details);
    let k = keys[0];
    console.log(details[k].bio);
    let obj ={
      bio: details[k].bio, 
      city: details[k].city,
      email: details[k].email,
      fullname: details[k].fullname,
      gender: details[k].gender,
      genre: details[k].genre,
      payment: details[k].payment,
      price: details[k].price,
      role: details[k].role,
      img: details[k].img,
      stagename: details[k].stagename,
      key: k,
      user:userID.uid
    }
      this.ProfileArr.push(obj);
      console.log(this.ProfileArr)
      
    });
    resolve(this.ProfileArr)
  })
  }

  getDjcomments(){
    return new Promise((accpt,rej)=>{
      let userID = firebase.auth().currentUser;
      firebase.database().ref("Comments/" + userID).on('value', (data: any) => {
        let details = data.val();
        this.djCommentsArray.length = 0;
        console.log(details)
        this.djCommentsArray.push(details);
        console.log(this.djCommentsArray)
      });
      accpt(this.djCommentsArray)
    })
  }
  

  checkstate() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user != null) {
            this.stayLoggedIn = 1
          }
          else {
            this.stayLoggedIn = 0
          }
          resolve(this.stayLoggedIn)
        })
      })
    })
  }
  loginx(email, password) {
    // let loading = this.loadingCtrl.create({
    //   spinner: 'bubbles',
    //   content: 'Sign in....',
    //   duration: 1000
    // });
    // loading.present();
    return firebase.auth().signInWithEmailAndPassword(email, password);
  } 

  checkAuthState() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            accpt(true)
          } else {
            accpt(false)
          }
        });
      })
    }) 
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
     this.allDjSArray.length =0;
    return new Promise((accpt, rej) => {
      this.allDjSArray.length =0;
      firebase.database().ref('Registration/').on('value', (data: any) => {
        var Djs = data.val();
        var keys: any = Object.keys(Djs);
        console.log(keys)
        for (var i = 0; i < keys.length; i++) {
          var x = keys[i];
          var y = 'Registration/' + x;
          firebase.database().ref(y).on('value', (data2: any) => {
            this.allDjSArray.length =0;
            var djInfomation = data2.val();
            if(data2.val() != null || data2.val() != undefined){
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
                  key: k
                }
  
                if (obj.role == "Dj") {
                  this.allDjSArray.push(obj);
                  console.log(obj)
                }
  
              }
            }else{
              this.allDjSArray = null;
              console.log(null);
            }
  

          })
          accpt(this.allDjSArray)
        }
      })
    })
  }
  
  SelectDj(category) {
    return new Promise((accpt, rej) => {
      firebase.database().ref('Registration/').on('value', (data: any) => {
        var Djs = data.val();
        var keys: any = Object.keys(Djs);
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
              if (category == djInfomation[k].category) {
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
          }
          })
          accpt(this.allDjSArray)
        }
      })
    })
  }

  makeComment(key,username,userKey,userPic,userComment){
    return new Promise((accpt,rej)=>{
      firebase.database().ref('Comments/' + key).push({
        comment: userComment,
        userKey: userKey,
        username: username,
        userImage: userPic
      })
      accpt("Comment sent")
    })
  }
  getDjInbox(key){
    return new Promise((accpt,rej)=>{
      firebase.database().ref('Bookings/').on('value',(data:any)=>{
        console.log(data.val())
        var djComments = data.val();
        var k = Object.keys(djComments)
        console.log(k)
        console.log(key)
        if(key == k){
          for(var x  = 0;x < k.length;x++){
            var y = k[x];
            var z = 'Bookings/' + y;
            console.log(z);
            firebase.database().ref(z).on('value',(data2:any)=>{
              var User = data2.val();
              console.log(User)
              var k2 = Object.keys(User)
              for(var a = 0;a < k2.length;a++){
                 var key2 = k2[a]
                 let obj = {
                  message: User[key2].message,
                  userImage: User[key2].image,
                  userKey: User[key2].key,
                  username: User[key2].name,
                  time: User[key2].time,
                  date: User[key2].date,
                  userEmail: User[key2].email
                 }
                 console.log(obj)
                 this.userInbox.push(obj)
              }

            })
            accpt(this.userInbox)
          }
        }
      })
    })
  }

  getComments(key){
    this.userCommentsArray2.length = 0
    return new Promise((accpt,rej)=>{
      firebase.database().ref('Comments/').on('value',(data:any)=>{
        console.log(data.val())
        var djComments = data.val();
        var k = Object.keys(djComments)
        console.log(k)
        console.log(key)
        if(key == k){
          for(var x  = 0;x < k.length;x++){
            var y = k[x];
            var z = 'Comments/' + y;
            console.log(z);
            firebase.database().ref(z).on('value',(data2:any)=>{
              var UserComments = data2.val();
              console.log(UserComments)
              var k2 = Object.keys(UserComments)
              for(var a = 0;a < k2.length;a++){
                 var key2 = k2[a]
                 let obj = {
                  comment: UserComments[key2].comment,
                  userImage: UserComments[key2].userImage,
                  userKey: UserComments[key2].userKey,
                  username: UserComments[key2].username,
                 }
                 console.log(obj)
                 this.userCommentsArray2.push(obj)
              }

            })
            accpt(this.userCommentsArray2)
          }
        }
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

  createRequest(key,userName,userEmail,Userkey,date,time,message,image){
    return new Promise((accpt,rej)=>{
      firebase.database().ref('Bookings/' + key).push({
        name: userName,
        email: userEmail,
        key: Userkey,
        date: date,
        time: time,
        message: message,
        image: image,
        check: false
      })
      accpt("Request sent")
    })
  }

  createInbox(key,djName,djEmail,djKey,date,time){
    return new Promise((accpt,rej)=>{
      firebase.database().ref('inbox/' + key).push({
        name: djName,
        email: djEmail,
        key: djKey,
        check: false
      })
      accpt("inbox sent")
    })
  }

  createChatRoom(key,djKey){
    return new Promise((accpt,rej)=>{
      firebase.database().ref('Chatroom/' + key).push({
        key: djKey
      })
      accpt("chatroom created")
    })
  }


  update(name, email, downloadurl, address, surname) {
    this.ProfileArr.length = 0;
    return new Promise((pass, fail) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        firebase.database().ref('Registration/' + user.uid).update({
          name: name,
          email: email,
          downloadurl: downloadurl,
          address: address,
          surname: surname
        });
      })
    })
  }

  uploadProfilePic(pic, name) {
    const toast = this.toastCtrl.create({
      message: 'Successfully updated!',
      duration: 3000
    });
    return new Promise((accpt, rejc) => {
      this.ngzone.run(() => {
        toast.present();
        firebase.storage().ref(name).putString(pic, 'data_url').then(() => {
          accpt(name);
          console.log(name);
        }, Error => {
          rejc(Error.message)
        })
      })
    })
  }
  logout() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().signOut().then(() => {
          resolve()
        }, (error) => {
          reject(error)
        });
      });
    });
  }

  register(email: string, password:string){
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  resetpassword(email: string){
    return firebase.auth().sendPasswordResetEmail(email);
  }
}
