import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';
import { CategoriesPage } from '../categories/categories';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {

  commentsArray = [];
  inboxArray = [];
  userKey: void;
  name;
  email;
  surname;
  pic;
  track;
  profileArr = new Array();
  trackarray = [];
  bio;
  city
  fullname
  gender
  genre
  payment
  price
  role
  img
  stagename
  profile: string;
  state;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public PulsedbDatabase: DatabaseProvider) {

  }

  ngOnInit(){
    this.profile = 'infor';
  }
  ionViewDidEnter() {
    this.PulsedbDatabase.getProfile().then((data: any) => {
      console.log(data)
      this.profileArr = data
      console.log(this.profileArr)
        this.bio = this.profileArr[0].bio
        this.city = this.profileArr[0].city,
        this.email = this.profileArr[0].email,
        this.fullname = this.profileArr[0].fullname,
        this.gender = this.profileArr[0].gender,
        this.genre = this.profileArr[0].genre,
        this.payment = this.profileArr[0].payment,
        this.price = this.profileArr[0].price,
        this.role = this.profileArr[0].role,
        this.img = this.profileArr[0].img,
        this.stagename = this.profileArr[0].stagename,
        this.userKey = this.profileArr[0].user
        console.log(this.userKey)

        this.PulsedbDatabase.getComments(this.userKey).then((data:any)=>{
          console.log(data)
          this.commentsArray = data;
        })
        this.PulsedbDatabase.getDjInbox(this.userKey).then((data:any)=>{
          console.log(data)
          this.inboxArray = data;
        })

      if (this.role != "Dj") {

      }
    })
  }
  // edit(page: string) {
  //   this.PulsedbDatabase.getUser().then(data => {
  //     console.log(data);
  //   })
  //   console.log("in");
  //   this.PulsedbDatabase.getUserState().then((state: any) => {
  //     console.log(state)
  //     this.state = state
  //     console.log(this.state) 
  //     if (this.state == 1) {
  //       this.db.getProfile1().then((data: any) => {
  //         console.log(data)
  //         let profile = [];
  //         profile = data
  //         this.role = profile[0].role
  //         console.log(this.role)
  //         if (this.role == "Audience") {
  //           this.navCtrl.push('');
  //         }
  //         else if (this.role == "Dj") {
  //           this, this.navCtrl.push(ProfilePage)
  //         }
  //         else {
  //           this.navCtrl.push('CatergoriesPage');
  //         }
  //       })
  //     }
  //     else if (this.state == 0) {
  //       console.log('user is offline')
  //       this.navCtrl.push(LoginPage)
  //     }
  //   })

  // }
  logout() {
    this.PulsedbDatabase.logout().then(() => {
      this.navCtrl.push('CategoriesPage');
    }, (error) => {
      console.log(error.message);
    })
  }

  upload() {
    this.navCtrl.push('TrackUploadPage')
  }



}
