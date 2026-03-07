import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';
import { ConfigurationsProvider, StringsAndMessages } from '../../providers/configurations/configurations';
import { RegistrationData } from '../../providers/models/models';

@Component({
  standalone: false,
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
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
    private alertCtrl: AlertController,
    private PulsedbDatabase: DatabaseProvider,
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
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    const userLogin = new RegistrationData();

    if (this.formGroup.status === 'VALID') {
      userLogin.email = this.formGroup.get('email').value;
      userLogin.password = this.formGroup.get('password').value;

      this.PulsedbDatabase.login(userLogin.email, userLogin.password).then((data) => {
        userLogin.uid = this.PulsedbDatabase.mockCurrentUser
          ? this.PulsedbDatabase.mockCurrentUser.uid
          : 'dummy-current-user-uid';

        if (data.user.emailVerified === true) {
          this.logloader = 'false';
          this.onSuccessfulLogin = 'true';
          this.navCtrl.navigateRoot(['/categories']);
        } else {
          this.message = 'You are not verified';
          this.logloader = 'false';
          this.onLoginFailure = 'true';
        }
      }).catch((error) => {
        this.message = error.message;
        this.logloader = 'false';
        this.onLoginFailure = 'true';
      });
    }
  }

  async passwordReset() {
    const alert = await this.alertCtrl.create({
      header: 'Reset Password',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email address'
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Send',
          handler: (data) => {
            if (data.email) {
              this.PulsedbDatabase.resetPassword(data.email);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  nextpage(page: string) {
    this.navCtrl.navigateRoot(['/' + page.replace('Page', '').toLowerCase()]);
  }

  GoToSignup() {
    this.navCtrl.navigateForward(['/register']);
  }
}
