import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { DatabaseProvider } from '../providers/database/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ConfigurationsProvider } from '../providers/configurations/configurations';
import { ModelsProvider } from '../providers/models/models';

 
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    ConfigurationsProvider,
    ModelsProvider
  ]
})
export class AppModule {}
