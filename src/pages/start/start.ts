import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  constructor(public navCtrl: NavController) {}

  registerPage() {
    this.navCtrl.navigateForward(['/register']);
  }

  explorePage() {
    this.navCtrl.navigateRoot(['/categories']);
  }

  ionViewDidEnter() {}
}
