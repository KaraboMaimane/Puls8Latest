
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

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage implements OnInit{
  role: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  ngOnInit(){
    if(this.navParams.get('role')){
      this.role = this.navParams.get('role');
      console.log(this.role);
    }else{
      console.log('nothing here')
    }
  }

  register(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: `Registering ${form.value.email}...`
    });
    loading.present();

    // this.db.registerUser(form.value.email, form.value.password).then(data => {
    //   let userID = firebase.auth().currentUser.uid;
    //   let registrationObj = {
    //     name: form.value.name,
    //     surname: form.value.surname,
    //     password: form.value.password,
    //     email: form.value.email,
    //     phone: form.value.phone
    //   };
    // }).catch((error)=>{
    //   console.log(error);
    //   loading.dismiss();
    //   //check if the email already exists
    //   if(error.code == 'auth/email-already-in-use'){
    //     this.navCtrl.push('LoginPage');
    //   }
    //   const alert = this.alertCtrl.create({
    //     title: error.code,
    //     subTitle: error.message,
    //     buttons: [{
    //       text: 'Okay',
    //       handler: ()=>{
    //       }
    //     }]
    //   })
    //   alert.present();
    // })
  }
}
