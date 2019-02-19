import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DjProfilePage } from './dj-profile';

@NgModule({
  declarations: [
    DjProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(DjProfilePage),
  ],
})
export class DjProfilePageModule {}
