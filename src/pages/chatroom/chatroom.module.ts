import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ChatroomPage } from './chatroom';

@NgModule({
  declarations: [ChatroomPage],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ChatroomPage }])
  ]
})
export class ChatroomPageModule {}
