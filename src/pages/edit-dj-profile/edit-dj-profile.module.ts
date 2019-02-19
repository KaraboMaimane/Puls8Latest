import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDjProfilePage } from './edit-dj-profile';

@NgModule({
  declarations: [
    EditDjProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(EditDjProfilePage),
  ],
})
export class EditDjProfilePageModule {}
