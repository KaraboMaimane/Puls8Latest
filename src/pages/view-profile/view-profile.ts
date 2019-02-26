import { Component, OnInit } from '@angular/core';
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
export class ViewProfilePage implements OnInit{
  commentsArray = [];
  userKey: any;
  musicArr=[];
  userImage: void;
  UserName: any;
  profile: string;
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

  getcomments=0;
  warntoast: string;
  warntoast2: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public database: DatabaseProvider) {
    this.profile = this.navParams.get("Djkey")
    console.log(this.profile)
    // this.profile = 'infor';

     

  }

  ionViewDidEnter(){
    this.profile = 'infor';
  }
  ngOnInit(){
    this.profile = 'infor';
    console.log(this.profile);
	
	
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
    console.log(this.djKey)

    
    this.database.getComments(this.djKey).then((data:any)=>{
      console.log(data)
      // this.commentsArray.length = 0;
      this.commentsArray = data;
      this.getcomments = this.commentsArray.length
      this.commentsArray.reverse();
      console.log(this.getcomments)
    })

    this.database.retrieveMusic(this.djKey).then((data:any) => {
			this.musicArr=[];		
			this.musicArr =data
			console.log(this.musicArr)
		})

    this.database.getuser().then((data:any)=>{
      console.log(data)
      this.userDetails = data;
      this.UserName = this.userDetails.fullname;
      this.userImage = this.userDetails.img;
      this.userKey = this.userDetails.key;
      console.log(this.userKey);
      console.log(this.UserName)
    })

   

  }
  
  

  onMessageAdded(message){
    if(message != "" && message != null && message != undefined){
      let profile = this.navParams.get("Djkey")
    let DjProfile;
     DjProfile = profile
    let djKey =  DjProfile.key2;
    let dateObj = new Date
    let time = dateObj.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
    let date = dateObj.toDateString();
    console.log(profile.key)
    console.log(djKey)

    this.database.makeComment(djKey,this.UserName,this.userKey,this.userImage,message).then((data:any)=>{
      console.log(data)
      console.log("data saved")
    })
    }
    else{
      // alert("comments cannot be left empty")
      this.warntoast2 = 'true';
      let timer = setInterval(()=>{
        this.warntoast = 'false';
      }, 4000);
    }
    
  }
  booking(){
    let Obj = {
      djName: this.djName,
      djEmail:  this.djEmail,
      djKey: this.djKey,
      djImage: this.djImage
    }
    console.log(Obj.djKey)
    if(this.userKey != Obj.djKey){
      this.navCtrl.push('ChatRequestPage', { Djkey:Obj})
    console.log('true')
    }else{ 
      this.warntoast = 'true';
      let timer = setInterval(()=>{
        clearInterval(timer);
        this.warntoast = 'false';
      },3000)
    }
    // this.navCtrl.push('ChatRequestPage', { Djkey:Obj})
  }

  openLink(link){
    window.open(link);
  }

}
