import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

import { DatabaseProvider } from '../providers/database/database';
import { ViewprofilePage } from '../pages/viewprofile/viewprofile';
import { ChatboxComponent } from '../components/chatbox/chatbox';

@NgModule({
  declarations: [
    MyApp,
    ViewprofilePage,
    ChatboxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ViewprofilePage,
    ChatboxComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
