import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewChatRequestPage } from './view-chat-request';

@NgModule({
  declarations: [
    ViewChatRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewChatRequestPage),
  ],
})
export class ViewChatRequestPageModule {}
