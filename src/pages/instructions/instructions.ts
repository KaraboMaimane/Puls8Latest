import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'page-instructions',
  templateUrl: 'instructions.html',
})
export class InstructionsPage {

  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstructionsPage');
  }

  ready() {
    this.modalCtrl.dismiss().catch(() => {});
    this.navCtrl.navigateForward(['/edit-dj-profile']);
  }
}
