
import { Component, OnInit} from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { DatabaseProvider } from "../../providers/database/database";
import { NgForm } from "@angular/forms";
import firebase from "firebase";
// import swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  role: any;
  name;
  email;
  surname;
  pic;
  track;
  profileArr = new Array();
  trackarray = [];
  bio;
  city
  fullname
  gender
  genre
  payment
  price
  img
  stagename
  loader: string;
  regwarn: string;
  regsucc: string;
  regfail: string;
  message: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public PulsedbDatabase: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  ngOnInit(){
    // if(this.navParams.get('role')){
    //   this.role = this.navParams.get('role');
    //   console.log(this.role);
    // }else{
    //   console.log('nothing here')
    // }

    this.loader = 'false';
    this.regwarn = 'false';
    this.regfail = 'false';
    this.regsucc = 'false';
    this.message = 'false';
  }


  register(form:NgForm){
    if(form.valid){
      this.loader = 'true';
      console.log('enter');
      this.PulsedbDatabase.register(form.value.fullname,form.value.email, form.value.password).then((data)=>{
        let user = firebase.auth().currentUser;
        user.sendEmailVerification().then((data)=>{
          //add user node to the database 
          firebase.database().ref("Registration/" + user.uid).push({
            fullname: form.value.fullname,
            email: form.value.email,
            role: "Audience",
            userType: "user",
            img: 'https://static1.squarespace.com/static/5adeaa0ff8370a5de0e90824/t/5b976ea440ec9af58bd0860b/1536650919208/blank-avatar.png?format=300w',
            key: user.uid
          })
          console.log(data);
          this.loader ='false';
          this.regsucc = 'true';
        }).catch((error)=>{
          this.loader = 'false';
          this.regfail = 'true';
          this.message =  error.message;
        })
        
      }).catch((error)=>{
        console.log(error); 
        this.loader = 'false';
        this.regfail = 'true';
        this.message = error.message;
      });
    }else{
      this.regwarn = 'true';
    }

  }

  nextpage(page: string){
    this.navCtrl.push(page)
  }


}
