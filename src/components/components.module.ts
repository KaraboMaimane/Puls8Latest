import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatboxComponent } from './chatbox/chatbox';

@NgModule({
	declarations: [ChatboxComponent],
	imports: [CommonModule, FormsModule, IonicModule],
	exports: [ChatboxComponent]
})
export class ComponentsModule {}
