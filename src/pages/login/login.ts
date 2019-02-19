
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
export class LoginPage implements OnInit{
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
    // swal.fire('Karabo');
  }
  login(form: NgForm) {
    this.logloader = 'true';
    console.log('yellow')
    if(form.valid){
      this.PulsedbDatabase.loginx(form.value.email, form.value.password).then((user) => {
        console.log(user);
        this.logloader = 'false';
        this.logsucc = 'true';
      }).catch((error) => {
        this.message = error.message;
        this.logloader = 'false';
        this.logfail = 'true';
      })
    }else{
      this.logwarn;
    }

  }

  resetpassword() {
     swal.fire({
      title: 'Enter your email address',
      input: 'email',
      showCancelButton: true,
      inputValidator: (value) => {
          console.log(value)
          this.PulsedbDatabase.resetpassword(value).then((email) => {
            console.log(email);
            swal.fire({
              position: 'center',
              type: 'success',
              title: `A Password Reset Email Has Been Sent to ${value}`,
              showConfirmButton: false,
              timer: 2500
            }).catch((error)=>{
              swal.fire({
                type: 'error',
                title: 'Oh Snap!',
                text: `${error.message}`
              })
            })
          })
        return !value && 'Please enter a valid email address!';
      }

    })
  }

  nextpage(page: string){
    this.navCtrl.push(page);
  }
}
