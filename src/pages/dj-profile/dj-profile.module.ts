import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DjProfilePage } from './dj-profile';

@NgModule({
  declarations: [DjProfilePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: DjProfilePage }])
  ]
})
export class DjProfilePageModule {}
