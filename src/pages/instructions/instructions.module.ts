import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { InstructionsPage } from './instructions';

@NgModule({
  declarations: [InstructionsPage],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: InstructionsPage }])
  ]
})
export class InstructionsPageModule {}
