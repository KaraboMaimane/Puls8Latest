import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ViewProfilePage } from './view-profile';

@NgModule({
  declarations: [ViewProfilePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ViewProfilePage }])
  ]
})
export class ViewProfilePageModule {}
