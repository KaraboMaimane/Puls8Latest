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
  allDjSArray = new Array();
  DjCategoryArray = new Array();
  ProfileArr = new Array();
  pic2;
  stayLoggedIn
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
      key: k
    }
      this.ProfileArr.push(obj);
      console.log(this.ProfileArr)
      
    });
    resolve(this.ProfileArr)
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
                key: k
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
