import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  standalone: false,
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage implements OnInit {
  commentsArray = [];
  userKey: any;
  musicArr = [];
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

  getcomments = 0;
  warntoast: string;
  warntoast2: string;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    public database: DatabaseProvider
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state || {};
    this.profile = state['Djkey'] || window.history.state?.['Djkey'];
    console.log(this.profile);
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
    const djkey = this.profile || window.history.state?.['Djkey'];
    this.profile = djkey;
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
  
  presentImage(myImage) {
    // Image viewer removed (ionic-img-viewer not compatible with Ionic 8)
    console.log('presentImage', myImage);
  }

  onMessageAdded(message) {
    if (message != '' && message != null && message != undefined) {
      const djkeyState = this.profile || window.history.state?.['Djkey'];
      let DjProfile = djkeyState;
      let djKey = DjProfile.key2;
    let dateObj = new Date
    let time = dateObj.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
    let date = dateObj.toDateString();
    console.log(this.djKey)
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
    if (this.userKey != Obj.djKey) {
      this.navCtrl.navigateForward(['/chat-request'], { state: { Djkey: Obj } });
    console.log('true');
    } else {
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
