import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseProvider } from '../../providers/database/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigurationsProvider, StringsAndMessages } from '../../providers/configurations/configurations';
import { RegistrationData } from '../../providers/models/models';

@Component({
  standalone: false,
  selector: 'page-register',
  templateUrl: 'register.html'
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
    public PulsedbDatabase: DatabaseProvider,
    public formBuilder: FormBuilder
  ) {
    this.role = window.history.state?.role;
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
        // Dummy: skip email verification and DB write, just show success
        this.loader = 'false';
        this.onRegisterSuccess = 'true';
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
    this.navCtrl.navigateRoot(['/' + page.replace('Page', '').toLowerCase()]);
  }
}
