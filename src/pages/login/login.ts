import {Component, OnInit} from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import {FormBuilder, NgForm, Validators, FormGroup} from "@angular/forms";
import {DatabaseProvider} from "../../providers/database/database";
import firebase from "firebase";
import {LoadingController} from "ionic-angular";
import swal from 'sweetalert2';
import {ConfigurationsProvider, Pages, StringsAndMessages} from "../../providers/configurations/configurations";
import {RegistrationData} from "../../providers/models/models";

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
  onLoginWarning: string;
  onLoginFailure: string;
  onSuccessfulLogin: string;
  message: string = '';
  formGroup: FormGroup;
  strings = StringsAndMessages;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private PulsedbDatabase: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.logloader = 'false';
    this.onLoginWarning = 'false';
    this.onLoginFailure = 'false';
    this.onSuccessfulLogin = 'false';
    this.message = 'false';
  }

  createForm() {
    const passwordRegex = ConfigurationsProvider.PasswordValidator;
    const emailRegex = ConfigurationsProvider.RegularExpEmail;

    this.formGroup = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.pattern(emailRegex)]],
      'password': ['', [Validators.required, Validators.pattern(passwordRegex)]]
    })
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  login() {
    let userLogin = new RegistrationData();

    if (this.formGroup.status === 'VALID') {

      userLogin.email = this.formGroup.get('email').value;
      userLogin.password = this.formGroup.get('password').value;

      this.PulsedbDatabase.login(userLogin.email, userLogin.password).then((data) => {

        userLogin.uid = firebase.auth().currentUser.uid;

        if (data.user.emailVerified == true) {
          this.logloader = 'false';
          this.onSuccessfulLogin = 'true';

          this.navCtrl.setRoot('CategoriesPage');
        } else {
          this.message = 'You are not verified';
          this.logloader = 'false';
          this.onLoginFailure = 'true';
        }
      }).catch((error) => {
        this.message = error.message;
        this.logloader = 'false';
        this.onLoginFailure = 'true';
      })
    } else {
      this.onLoginWarning;
    }
  }


  cancelmodal() {
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

          }).catch((error) => {
            error.message
          })
        }
        return !value && 'You need to write something!';

      }

    })
  }

  nextpage(page: string) {
    this.navCtrl.setRoot(page);
  }

  GoToSignup() {
    this.navCtrl.push(Pages.PAGE_REGISTER);
  }

}
