import { Component } from '@angular/core';

/**
 * Generated class for the ChatboxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chatbox',
  templateUrl: 'chatbox.html'
})
export class ChatboxComponent {

  text: string;

  constructor() {
    console.log('Hello ChatboxComponent Component');
    this.text = 'Hello World';
  }

}
