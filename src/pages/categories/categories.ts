import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { AlertController } from 'ionic-angular';
// import { ViewProfilePage } from '../view-profile/view-profile';
import swal from 'sweetalert2';
/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage implements OnInit{
  gender;
  genre;
  city;
  getprofileArr = [];
  getcategoryArr = []; 
  logsucc: string;
  logwarn: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public PulsedbDatabase: DatabaseProvider, public alertCtrl: AlertController) {
    this.PulsedbDatabase.getAllDjs().then((data: any) => {
      this.getprofileArr = data
      console.log(this.getprofileArr);
    })
    this.selectGenre();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  } 

  ngOnInit(){
    this.logsucc = 'false';
    this.logwarn = 'false';
    this.PulsedbDatabase.checkstate().then((data:any)=>{
      if (data == 1){
        this.logsucc = 'true';
        let timer = setInterval(()=>{
          clearInterval(timer);
          this.logsucc = 'false';
        },3000)
      }
      else {
        this.logwarn = 'true';
        let timer = setInterval(()=>{
          clearInterval(timer);
          this.logwarn = 'false';
        },3000)
      }
     })
  }

  refreshs() {
    this.genre = null;
    this.gender = null;
    this.city = null;

  }

  selectGenre() {
    this.PulsedbDatabase.SelectDj(this.genre).then((data) => {
      this.getcategoryArr.length = 0;
      var keys: any = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (this.genre == data[k].genre) {
          let obj = {
            bio: data[k].bio,
            city: data[k].city,
            email: data[k].email,
            fullname: data[k].fullname,
            gender: data[k].gender,
            genre: data[k].genre,
            payment: data[k].payment,
            price: data[k].price,
            role: data[k].role,
            img: data[k].img,
            stagename: data[k].stagename,
            key: k
          }
          this.getprofileArr.push(obj);
          console.log(this.getprofileArr);
          this.getprofileArr.reverse();
        }
      }
    })
  }
  ViewProfile(i){
    console.log(i)
    let dj = i;
    console.log(dj)
    this.navCtrl.push('ViewProfilePage', {Djkey: dj})
  }

  GoToProfilePage() {
    this.PulsedbDatabase.checkAuthState().then(data => {
      if (data == false) {
        let alert = this.alertCtrl.create({
          subTitle: 'You have to sign in before you can view your profile, would you like to sign in now?',
          buttons: [
            {
              text: 'Sign in',
              handler: data => {
                var opt = "profile";
                this.navCtrl.push('LoginPage')
              }
            },
            {
              text: 'Cancel',
              handler: data => {
              }
            }
          ]
        });
        alert.present();
      } else {
        this.navCtrl.push('ProfilePage')
      }

    })
  }


}