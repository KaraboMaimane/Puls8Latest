import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ChatRequestPage } from './chat-request';

@NgModule({
  declarations: [ChatRequestPage],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ChatRequestPage }])
  ]
})
export class ChatRequestPageModule {}
