
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
  }
  login(form: NgForm) {
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
          this.navCtrl.setRoot('ProfilePage');
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

  // resetPassword() {
  //   const prompt = this.alertCtrl.create({
  //     title: "Auth",
  //     message: "Enter your email to reset your password",
  //     inputs: [
  //       {
  //         name: "email",
  //         placeholder: "Example@gmail.com"
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: "Cancel",
  //         handler: data => {
  //           console.log("Cancel clicked");
  //           this.navCtrl.setRoot('LoginPage');
  //         }
  //       },
  //       {
  //         text: "Save",
  //         handler: data => {
  //           this.db.resetPassword(data.email).then(
  //             () => {
  //               const alert = this.alertCtrl.create({
  //                 title: "Caution",
  //                 message: "your request is been proccessed check your email ",
  //                 buttons: ["OK"]
  //               });
  //               alert.present();
  //             },
  //             error => {
  //               const alert = this.alertCtrl.create({
  //                 title: "Caution",
  //                 message: error.message,
  //                 buttons: ["OK"]
  //               });
  //               alert.present();
  //             }
  //           );
  //           console.log("Saved clicked");
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }
}
