import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  name;
  email;
  surname;
  pic;
  track;
  profileArr = new Array();
  trackarray = [];
  bio;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public PulsedbDatabase: DatabaseProvider) {
    this.PulsedbDatabase.getProfile().then((data:any) => {
      console.log(data.key)
      this.profileArr=data
      console.log(this.profileArr)
    this.bio = this.profileArr[0].bio
  console.log(this.bio)
    })

    this.PulsedbDatabase.getDjcomments().then((data:any)=>{
      console.log(data)
    })
  }

logout(){
  firebase.auth().signOut().then(()=>{
    console.log("sign out succesful");
    this.navCtrl.setRoot(LoginPage);
  })
}



  edit() {

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Edit Profile',
          role: 'Edit Profile',
          handler: () => {
            console.log('Edit Profile clicked');

            this.navCtrl.push('EditPage');
          }
        }, {
          text: 'Upload Track',
          handler: () => {
            console.log('Upload Track clicked');
            this.navCtrl.push('UploadPage');
          }
        }, {

          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
