import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { UserprofilePage } from './userprofile';

@NgModule({
  declarations: [UserprofilePage],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: UserprofilePage }])
  ]
})
export class UserprofilePageModule {}
