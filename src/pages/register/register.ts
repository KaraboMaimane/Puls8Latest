
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public PulsedbDatabase: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  // ngOnInit(){
  //   if(this.navParams.get('role')){
  //     this.role = this.navParams.get('role');
  //     console.log(this.role);
  //   }else{
  //     console.log('nothing here')
  //   }

  // }
  register(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: `Registering ${form.value.email}...`,
      duration: 3000

    });
    loading.present();
    if (form.value.email == "" || form.value.email == undefined){
      const alert = this.alertCtrl.create({
        title: 'Reminder,',
        subTitle: 'Your email cannot be left empty',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      this.PulsedbDatabase.Register(form.value.fullname,form.value.email,form.value.password).then((data)=>{
        console.log("succesful")
        let user = firebase.auth().currentUser;
        user.sendEmailVerification().then((a)=>{
          const alert = this.alertCtrl.create({
            title: 'Thank you for Registering',
            subTitle: 'Please check emails for verification link',
            buttons: ['OK']
          });
          alert.present();
        }).catch((a)=>{
          // an error has occured
        })
        this.navCtrl.setRoot('LoginPage')
      }).catch((error)=>{
        console.log(error)
      })
    }

  }
}
