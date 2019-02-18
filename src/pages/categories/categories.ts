import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { AlertController } from 'ionic-angular';
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
export class CategoriesPage {
  gender;
  genre;
  city;
  getprofileArr=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public PulsedbDatabase:DatabaseProvider,public alertCtrl: AlertController) {
   this.PulsedbDatabase.getAllDjs().then((data:any)=>{
    this.getprofileArr =data
     console.log(this.getprofileArr);
   })
   this.selectGenre()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  selectGenre(){
    this.PulsedbDatabase.SelectDj(this.genre).then((data)=>{
      console.log(data)
    })
  }
  GoToProfilePage() {
    this.PulsedbDatabase.checkAuthState().then(data => {
      if (data == false) {
        let alert = this.alertCtrl.create({
          subTitle: 'You have to sign in before you can view your profile, would you like to sign in now?',
          cssClass: 'myAlert',
          buttons: [
            {
              text: 'Sign in',
              handler: data => {
                var opt = "profile";
                this.navCtrl.push('LoginPage', { option: opt })
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
