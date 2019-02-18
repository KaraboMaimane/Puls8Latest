
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
import swal from 'sweetalert2';

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
    console.log(form.value)
    this.db.register(form.value.fullnameform.value.email, form.value.password).then((data)=>{
      let user = firebase.auth().currentUser;
        firebase.database().ref('Registration/' + user.uid).push({
          fullname: form.value.fullname,
          email: form.value.email,
          role: "Audience",
          userType: "user",
          img: 'https://static1.squarespace.com/static/5adeaa0ff8370a5de0e90824/t/5b976ea440ec9af58bd0860b/1536650919208/blank-avatar.png?format=300w',
          key: user.uid
        })
        console.log(data);
    }).catch((error)=>{
      console.log(error);
    });
  }
}
