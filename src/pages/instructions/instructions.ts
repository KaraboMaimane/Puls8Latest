import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the InstructionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-instructions',
  templateUrl: 'instructions.html',
})
export class InstructionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstructionsPage');
  }

  ready(){
    this.navCtrl.push('EditDjProfilePage');
    this.viewCtrl.dismiss();
  }

}
