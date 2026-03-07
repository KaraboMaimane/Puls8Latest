import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SplashPage } from './splash';

@NgModule({
  declarations: [SplashPage],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: SplashPage }])
  ]
})
export class SplashPageModule {}
