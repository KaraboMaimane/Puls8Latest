import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import {BehaviorSubject} from "rxjs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'SplashPage';
  stateBehaviourSubject = new BehaviorSubject(false);

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public pulsedbDatabase:DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
    });

    pulsedbDatabase.checkstate().then((data:number)=>{
      if (data == 1){
        this.rootPage = 'CategoriesPage';
        this.stateBehaviourSubject.next(true);
      }
      else {
        this.rootPage = 'StartPage';
        this.stateBehaviourSubject.next(false);
      }
     })
  }
}
