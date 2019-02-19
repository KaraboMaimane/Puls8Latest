
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
// import swal from 'sweetalert2';

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

  // ngOnInit(){
  //   this.logloader = 'false';
  //   this.logwarn = 'false';
  //   this.logfail = 'false';
  //   this.logsucc = 'false';
  //   this.message = 'false';
  // }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }
  login(form: NgForm) {
    const loading = this.loadingCtrl.create({
       content: `Logging in ${form.value.email}...`
     });
     loading.present();
     this.PulsedbDatabase
       .login(form.value.email, form.value.password)
       .then(data => {
         console.log(data.user.emailVerified)
         // alert(data.user.emailVerified)
         let userID = firebase.auth().currentUser.uid;
         loading.dismiss();
        this.navCtrl.setRoot('CategoriesPage');           
       })
       .catch(error => {
         loading.dismiss();
         const alert = this.alertCtrl.create({
           title: 'Caution',
           subTitle: error.message,
           buttons: [
             {
               text: "Ok",
               handler: () => {      
               }
             }
           ]
         });
         alert.present();
       });
   }
   resetPassword() {
    const prompt = this.alertCtrl.create({
      title: "Reser Password",
      message: "Enter your email to reset your password",
      cssClass: '.background',
      inputs: [
        {
          name: "email",
          placeholder: "Example@gmail.com",
          type: "email"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
           
            this.navCtrl.push(LoginPage);
          }
        },
        {
          text: "Save",
          handler: data => {
            this.PulsedbDatabase.resetPassword(data.email).then(
              () => {
                const alert = this.alertCtrl.create({
                  title: "Caution",
                  message: "your request is been proccessed check your email ",
                  buttons: ["OK"]
                });
                alert.present();
              },
              error => {
                const alert = this.alertCtrl.create({
                  title: "Caution",
                  message: error.message,
                  buttons: ["OK"]
                });
                alert.present();
              }
            );
            console.log("Saved clicked");
          }
        }
      ]
    });
    prompt.present();
  }
  // nextpage(page: string){
  //   this.navCtrl.push(page);
  // }

  GoToSignup() {
    this.navCtrl.push('RegisterPage')
  }
}
