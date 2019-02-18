import { Component } from '@angular/core';
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
export class ProfilePage {

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public PulsedbDatabase: DatabaseProvider) {
  
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
        console.log(this.fullname)


      if (this.role != "Dj") {

      }
    })
  }
  edit(page: string) {
    this.navCtrl.push('EditDjProfilePage');

  }
  logout() {
    this.PulsedbDatabase.logout().then(() => {
      this.navCtrl.push(CategoriesPage);
    }, (error) => {
      console.log(error.message);
    })
  }

  upload(){
    this.navCtrl.push('TrackUploadPage')
  }



}
