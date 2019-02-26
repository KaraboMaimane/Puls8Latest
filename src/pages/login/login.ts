
import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { NgForm } from "@angular/forms";
import { DatabaseProvider } from "../../providers/database/database";
import firebase from "firebase";
import { LoadingController } from "ionic-angular";
import swal from 'sweetalert2';

/**
* Generated class for the LoginPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({

  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  email;
  password;
  logloader: string;
  logwarn: string;
  logfail: string;
  logsucc: string;
  message: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private PulsedbDatabase: DatabaseProvider,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit(){
    this.logloader = 'false';
    this.logwarn = 'false';
    this.logfail = 'false';
    this.logsucc = 'false';
    this.message = 'false';
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }


   login(form: NgForm) {
    this.logloader = 'true';
    console.log('yellow')
    if(form.valid){
      this.PulsedbDatabase.login(form.value.email, form.value.password).then((data) => {
        console.log(data);
        let userID = firebase.auth().currentUser.uid;
        if (data.user.emailVerified == true) {
        this.logloader = 'false';
        this.logsucc = 'true';
        // this.navCtrl.setRoot('CategoriesPage');
        } else {
          this.message = 'You are not verified';
          this.logloader = 'false';
          this.logfail = 'true';
        }
      }).catch((error) => {
        this.message = error.message;
        this.logloader = 'false';
        this.logfail = 'true';
      })
    }else{
      this.logwarn;
    }

  }



  

  cancelmodal(){
    // this.navCtrl.setRoot('CategoriesPage');      
  }
  passwordReset() {
    swal.fire({
      title: 'Enter your email address',
      input: 'email',
      showCancelButton: true,
      inputValidator: (value) => {
        if (value) {
          console.log(value)
          this.PulsedbDatabase.resetPassword(value).then((email) => {
            console.log(email);
         
          }).catch((error)=>{
             error.message
          })
        }
        return !value && 'You need to write something!';

      }

    })
  }
  nextpage(page: string){
    this.navCtrl.push(page);
  }

  GoToSignup() {
    this.navCtrl.push('RegisterPage')
  }
}
