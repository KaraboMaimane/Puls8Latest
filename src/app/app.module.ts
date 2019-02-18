import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

import { DatabaseProvider } from '../providers/database/database';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import {  ViewProfilePage } from '../pages/view-profile/view-profile';
import { ChatboxComponent } from '../components/chatbox/chatbox';
import { CategoriesPage } from '../pages/categories/categories';
 
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ProfilePage,
    ViewProfilePage,
    ChatboxComponent,
    CategoriesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ProfilePage,
    ViewProfilePage,
    ChatboxComponent,
    CategoriesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
