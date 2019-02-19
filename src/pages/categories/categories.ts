import { Component } from '@angular/core';
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
export class CategoriesPage {
  gender;
  genre;
  city;
  getprofileArr=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public PulsedbDatabase:DatabaseProvider,public alertCtrl: AlertController) {
   this.PulsedbDatabase.getAllDjs().then((data:any)=>{
    this.getprofileArr = data
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
  ViewProfile(i){
    console.log(i)
    let dj = i;
    console.log(dj)
    this.navCtrl.push('ViewProfilePage', {Djkey: dj})
  }

  GoToProfilePage() {
    this.PulsedbDatabase.checkAuthState().then(data => {
      if (data == false) {
        const swalWithBootstrapButtons = swal.mixin({
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false,
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Login Required?',
          text: "You cant access your profile without logging in!",
          type: 'info',
          showCancelButton: true,
          confirmButtonText: 'Yes, Login',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
        this.navCtrl.push('LoginPage');
          }else{

          } 
        })
      } else {
        this.navCtrl.push('ProfilePage');
      }

    })
  }


}