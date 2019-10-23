import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
// import * as $ from "jquery";
import { CategoriesPage } from '../pages/categories/categories';
import { DatabaseProvider } from '../providers/database/database';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'SplashPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public PulsedbDatabase:DatabaseProvider) {
    firebase.initializeApp({
      apiKey: "AIzaSyCI9c63kFGLwA6obewlXKUgaYuJa-dIyp8",
      authDomain: "newpuls8database.firebaseapp.com",
      databaseURL: "https://newpuls8database.firebaseio.com",
      projectId: "newpuls8database",
      storageBucket: "newpuls8database.appspot.com",
      messagingSenderId: "649926660397"
    })
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
    });

    PulsedbDatabase.checkstate().then((data:any)=>{
      if (data == 1){
        this.rootPage =  'CategoriesPage'
      }
      else {
        this.rootPage = 'StartPage'
      }
     })
  }
}