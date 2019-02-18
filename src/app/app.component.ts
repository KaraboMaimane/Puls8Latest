import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'SplashPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyAYvrGMhnVRLP0j30xzzd-eNzd-Kn1ypvY",
      authDomain: "puls8-database.firebaseapp.com",
      databaseURL: "https://puls8-database.firebaseio.com",
      projectId: "puls8-database",
      storageBucket: "",
      messagingSenderId: "212472551538"
    })
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}