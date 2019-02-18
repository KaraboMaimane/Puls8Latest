import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
// import { ViewprofilePage } from '../viewprofile/viewprofile';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public PulsedbDatabase:DatabaseProvider) {
   this.PulsedbDatabase.getAllDjs().then((data:any)=>{
    this.getprofileArr =data
     console.log(this.getprofileArr);
   })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  ViewProfile(i){
    console.log(i)
    let dj = i;
    console.log(dj)
    this.navCtrl.push('ViewProfilePage', {Djkey: dj})
  }


}