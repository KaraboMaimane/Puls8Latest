import { Component,Output, EventEmitter } from '@angular/core';
import { AlertController } from 'ionic-angular';

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
@Output() messageCreate = new EventEmitter<any>();
 

  constructor(public alertCtrl: AlertController) {
    console.log('Hello ChatboxComponent Component');
  }

  onMessageAdded(MessageText){
    if(MessageText != undefined && MessageText != ''){
      this.messageCreate.emit(MessageText)
    }
    else{
      const alert = this.alertCtrl.create({
        title: 'Please note, Empty Input',
        message: 'Please type a message before sending',
        buttons: ['OK']
      })
      alert.present();
    }
    console.log(MessageText)
  }

}
