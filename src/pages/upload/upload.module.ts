import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { UploadPage } from './upload';

@NgModule({
  declarations: [UploadPage],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: UploadPage }])
  ]
})
export class UploadPageModule {}
