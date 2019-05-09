import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CategoriesPage} from "../categories/categories";
import {RegisterPage} from "../register/register";


/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  registerPage() {
    this.navCtrl.push(RegisterPage);
  }

  explorePage(){
    this.navCtrl.push(CategoriesPage);
  }

  ionViewDidEnter() {


  }

}
