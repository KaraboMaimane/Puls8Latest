import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'page-identity',
  templateUrl: 'identity.html',
})
export class IdentityPage {
  role: string;

  constructor(private navCtrl: NavController) {}

  checkRole(role: string) {
    this.role = role;
  }

  nextPage() {
    if (this.role === 'Dj' || this.role === 'Audience') {
      this.navCtrl.navigateRoot(['/register'], { state: { role: this.role } });
    }
  }
}
