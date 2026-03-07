import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { IdentityPage } from './identity';

@NgModule({
  declarations: [IdentityPage],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: IdentityPage }])
  ]
})
export class IdentityPageModule {}
