import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the ViewProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {
  commentsArray = [];
  userKey: any;
  userImage: void;
  UserName: any;
  profile;
  messagestate: string;
  userstatus: any;
  DjProfile;
  djName;
  djGenre;
  djBio;
  djStagename;
  djEmail;
  djImage;
  djCity;
  djKey;
  userDetails;
  constructor(public navCtrl: NavController, public navParams: NavParams,public database: DatabaseProvider) {
    this.profile = this.navParams.get("Djkey")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewprofilePage');
    this.profile = this.navParams.get("Djkey")
    console.log(this.profile)
    this.DjProfile = this.profile

    this.djName = this.DjProfile.fullname;
    this.djBio = this.DjProfile.bio;
    this.djGenre = this.DjProfile.genre;
    this.djEmail = this.DjProfile.email;
    this.djImage = this.DjProfile.img;
    this.djStagename = this.DjProfile.stagename;
    this.djCity = this.DjProfile.city;
    this.djKey = this.DjProfile.key2;
    console.log(this.djKey)

    this.database.getuser().then((data:any)=>{
      console.log(data)
      this.userDetails = data;
      this.UserName = this.userDetails.fullname;
      this.userImage = this.userDetails.img;
      this.userKey = this.userDetails.key;

      console.log(this.UserName)
    })

    console.log(this.djKey)
    this.database.getComments(this.djKey).then((data:any)=>{
      console.log(data)
      this.commentsArray.length =0;
      this.commentsArray = data;
      this.commentsArray.reverse();
    })
  }
  

  onMessageAdded(message){
    alert("ive been clicked")
    let profile = this.navParams.get("Djkey")
    let DjProfile;
     DjProfile = profile
    let djKey =  DjProfile.key2;
    console.log(profile.key)
    console.log(djKey)
    this.database.makeComment(djKey,this.UserName,this.userKey,this.userImage,message).then((data:any)=>{
      console.log(data)
      console.log("data saved")
    })
  }

  booking(){
    let Obj = {
      djName: this.djName,
      djEmail:  this.djEmail,
      djKey: this.djKey,
    }
    console.log(Obj)
    this.navCtrl.push('ChatRequestPage', { Djkey:Obj})
  }

}
