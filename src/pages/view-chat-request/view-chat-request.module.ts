import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ViewChatRequestPage } from './view-chat-request';

@NgModule({
  declarations: [ViewChatRequestPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ViewChatRequestPage }])
  ]
})
export class ViewChatRequestPageModule {}
