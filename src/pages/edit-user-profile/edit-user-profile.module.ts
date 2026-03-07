import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { EditUserProfilePage } from './edit-user-profile';

@NgModule({
  declarations: [EditUserProfilePage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: EditUserProfilePage }])
  ]
})
export class EditUserProfilePageModule {}
