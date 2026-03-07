import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { BehaviorSubject } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class AppComponent {
  stateBehaviourSubject = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private pulsedbDatabase: DatabaseProvider,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    try {
      await StatusBar.setStyle({ style: Style.Light });
      await SplashScreen.hide();
    } catch (e) {
      // Not running on a native device
    }

    this.pulsedbDatabase.checkstate().then((data: number) => {
      if (data === 1) {
        this.navCtrl.navigateRoot(['/categories']);
        this.stateBehaviourSubject.next(true);
      } else {
        this.navCtrl.navigateRoot(['/start']);
        this.stateBehaviourSubject.next(false);
      }
    });
  }
}

