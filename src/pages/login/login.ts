
import { Component } from "@angular/core";
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
import { ProfilePage } from "../profile/profile";
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private PulsedbDatabase: DatabaseProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
    // swal.fire('Karabo');
  }
  login(form: NgForm) {
    console.log('yellow')
    if(form.valid){
      this.PulsedbDatabase.loginx(form.value.email, form.value.password).then((user) => {
        console.log(user);
        if (user.user.emailVerified == true) {
          if (form.value.email == undefined
            || form.value.password == undefined) {
            const alert = this.alertCtrl.create({
              // title: "Oh no! ",
              subTitle: "Please enter your valid email and password to login.",
              buttons: ['OK'],
            });
          } else if (this.email == "") {
            const alert = this.alertCtrl.create({
              // title: "No Email",
              subTitle: "Your email can't be blank.",
              buttons: ['OK'],
            });
            alert.present();
          }
          else if (form.value.password  == "") {
            const alert = this.alertCtrl.create({
              // title: "No Password",
              subTitle: "Your password can't be blank",
              buttons: ['OK'],
            });
            alert.present();
          }
          this.navCtrl.setRoot(ProfilePage);
        }
      }).catch((error) => {
        const alert = this.alertCtrl.create({
          // title: "No Password",
          subTitle: error.message,
          buttons: ['OK'],
        });
        alert.present();
      })
    }else{
      console.log('error');
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
