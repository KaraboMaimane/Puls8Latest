import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { EditDjProfilePage } from './edit-dj-profile';

@NgModule({
  declarations: [EditDjProfilePage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: EditDjProfilePage }])
  ]
})
export class EditDjProfilePageModule {}
