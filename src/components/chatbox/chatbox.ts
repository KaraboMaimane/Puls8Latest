import { Component, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'chatbox',
  templateUrl: 'chatbox.html'
})
export class ChatboxComponent {
  @Output() messageCreate = new EventEmitter<any>();

  constructor(public alertCtrl: AlertController) {
    console.log('Hello ChatboxComponent Component');
  }

  async onMessageAdded(MessageText) {
    if (MessageText != undefined && MessageText != '') {
      this.messageCreate.emit(MessageText);
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Please note, Empty Input',
        message: 'Please type a message before sending',
        buttons: ['OK']
      });
      await alert.present();
    }
    console.log(MessageText);
  }
}
