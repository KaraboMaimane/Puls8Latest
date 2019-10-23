import {Component, OnInit} from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import {DatabaseProvider} from "../../providers/database/database";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import firebase from "firebase";
import {ConfigurationsProvider, StringsAndMessages} from "../../providers/configurations/configurations";
import {RegistrationData, User} from "../../providers/models/models";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage implements OnInit {
  role: any;
  name;
  email;
  surname;
  pic;
  track;
  profileArr = new Array();
  trackarray = [];
  bio;
  city;
  fullname;
  stagename;
  loader: string;
  onRegisterWarn: string;
  onRegisterSuccess: string;
  onRegisterFail: string;
  message: string;
  formGroup: FormGroup;
  strings = StringsAndMessages;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public PulsedbDatabase: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loader = 'false';
    this.onRegisterWarn = 'false';
    this.onRegisterFail = 'false';
    this.onRegisterSuccess = 'false';
    this.message = 'false';

  }

  createForm() {
    const passwordRegex = ConfigurationsProvider.PasswordValidator;
    const emailRegex = ConfigurationsProvider.RegularExpEmail;
    const nameRegex = ConfigurationsProvider.RegularExpName;

    this.formGroup = this.formBuilder.group({
      'fullname': ['', [Validators.required, Validators.pattern(nameRegex)]],
      'email': ['', [Validators.required, Validators.pattern(emailRegex)]],
      'password': ['', [Validators.required, Validators.pattern(passwordRegex)]]
    })
  }


  register() {
    let newUser = new RegistrationData();

    if (this.formGroup.status === 'VALID') {

      newUser.fullname = this.formGroup.get('fullname').value;
      newUser.email = this.formGroup.get('email').value;
      newUser.password = this.formGroup.get('password').value;
      this.loader = 'true';
      console.log({registerUser: newUser, formgroup: this.formGroup});

      this.PulsedbDatabase.register(newUser.fullname, newUser.email, newUser.password).then((data) => {
        let user = firebase.auth().currentUser;


        user.sendEmailVerification().then((data) => {
          firebase.database().ref("Registration/" + user.uid).push({
            fullname: newUser.fullname,
            email: newUser.email,
            role: "Audience",
            userType: "user",
            img: 'https://static1.squarespace.com/static/5adeaa0ff8370a5de0e90824/t/5b976ea440ec9af58bd0860b/1536650919208/blank-avatar.png?format=300w',
            key: user.uid
          });
          console.log(data);
          this.loader = 'false';
          this.onRegisterSuccess = 'true';
        })

      }).catch((error) => {
        console.log(error);
        this.loader = 'false';
        this.onRegisterFail = 'true';
        this.message = error.message;
      });
    } else {
      this.onRegisterWarn = 'true';
    }

  }

  nextpage(page: string) {
    this.navCtrl.setRoot(page)
  }


}
