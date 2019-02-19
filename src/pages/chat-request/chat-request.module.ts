import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatRequestPage } from './chat-request';

@NgModule({
  declarations: [
    ChatRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatRequestPage),
  ],
})
export class ChatRequestPageModule {}
