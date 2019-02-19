import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the EditDjProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-dj-profile',
  templateUrl: 'edit-dj-profile.html',
})
export class EditDjProfilePage implements OnInit{
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
  downloadurl
  EditProfileArr=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public PulsedbDatabase: DatabaseProvider) {
  }


  ngOnInit(){
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDjProfilePage');
  }

  // uploadPicture() {
  //     this.PulsedbDatabase.uploadProfilePic(this.downloadurl, this.name).then(data => {
  //       console.log('added to db');
  //       this.PulsedbDatabase.update(this.name, this.email, this.contact, this.bio, this.downloadurl).then((data) => {
  //         this.EditProfileArr.push(data);
  //       })
  //       this.navCtrl.pop();
  //     },
  //       Error => {
  //         console.log(Error)
  //       })
    
  // }

}
