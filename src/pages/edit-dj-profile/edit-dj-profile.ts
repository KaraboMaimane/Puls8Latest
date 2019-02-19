import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { NgForm } from "@angular/forms";
/**
 * Generated class for the EditDjProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-dj-profile',
  templateUrl: 'edit-dj-profile.html',
})
export class EditDjProfilePage {
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
  uid;
  stagename
  downloadurl
  EditProfileArr = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public PulsedbDatabase: DatabaseProvider) {
    this.retreivePics1();
  }

  ionViewDidLoad() {
    this.retreivePics1();
    console.log('ionViewDidLoad EditDjProfilePage');
  }
  ngOnInit() {
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
  UpdateImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }



  submit(form: NgForm) {
    this.PulsedbDatabase.uploadProfilePic(this.img, form.value.fullname).then(data => {
      console.log('added to db');
      this.PulsedbDatabase.updateDjProfile(form.value.fullname, form.value.email, this.img, form.value.stagename, form.value.gender, form.value.genre, form.value.price, form.value.payment, form.value.bio, form.value.city).then((data) => {
        this.EditProfileArr.push(data);
        console.log(this.EditProfileArr)
      })
      this.navCtrl.pop();
    },
      Error => {
        console.log(Error)
      })
  }

  getUid1() {
    this.PulsedbDatabase.getUserID().then(data => {
      this.uid = data
      console.log(this.uid);
    })
  }
  retreivePics1() {
    this.profileArr.length = 0;
    this.getUid1();
    this.PulsedbDatabase.viewUserProfile().then(data => {
      var keys: any = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (this.uid == data[k].uid) {
          let objt = {
            downloadurl: data[k].downloadurl
          }
          this.profileArr.push(objt);
          console.log(this.profileArr)
        }
      }

    }, Error => {
      console.log(Error)
    });


  }
}
