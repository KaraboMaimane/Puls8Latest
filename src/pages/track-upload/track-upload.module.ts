import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { TrackUploadPage } from './track-upload';

@NgModule({
  declarations: [TrackUploadPage],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TrackUploadPage }])
  ]
})
export class TrackUploadPageModule {}
