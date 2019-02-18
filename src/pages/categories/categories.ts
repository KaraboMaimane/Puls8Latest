import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { AlertController } from 'ionic-angular';
import Swal from 'sweetalert2';
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
        const swalWithBootstrapButtons = Swal.mixin({
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false,
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          } else if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            )
          }
        })
      } else {
        this.navCtrl.push('ProfilePage');
      }

    })
  }


}
