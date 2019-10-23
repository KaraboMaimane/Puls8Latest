import {Component, OnInit} from '@angular/core';
import {NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertController, LoadingController, ToastController} from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {ConfigurationsProvider} from "../../providers/configurations/configurations";
import {debounceTime} from "rxjs/operators";
import {CitySearchResult} from "../../providers/models/models";
import {BehaviorSubject} from "rxjs";

/**
 * Generated class for the EditUserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-user-profile',
  templateUrl: 'edit-user-profile.html'
})
export class EditUserProfilePage implements OnInit {
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
  gender;
  genre;
  payment;
  price;
  role;
  img;
  uid;
  userKey;
  stagename;
  downloadurl;
  EditProfileArr = [];
  loader: string;
  upsucc: string;
  d = 1;
  location: any;
  items;
  searchbar;
  formGroup: FormGroup;
  locationList: CitySearchResult[];

  profileSubject = new BehaviorSubject<any>({});
  isSearching: boolean;
  cityOnSet: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public PulsedbDatabase: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public camera: Camera) {
    this.createForm();
  }

  ngOnInit() {
    this.loader = 'false';
    this.PulsedbDatabase.getProfile().then((data: any) => {

      console.log({responseData: data});
      this.profileArr = data;
      console.log(this.profileArr);
      this.bio = this.profileArr[0].bio || '';
      this.city = this.profileArr[0].city || '';
      this.email = this.profileArr[0].email || '';
      this.fullname = this.profileArr[0].fullname || '';
      this.gender = this.profileArr[0].gender || '';
      this.genre = this.profileArr[0].genre || '';
      this.payment = this.profileArr[0].payment || '';
      this.price = this.profileArr[0].price || '';
      this.role = this.profileArr[0].role || '';
      this.img = this.profileArr[0].img || '';
      this.stagename = this.profileArr[0].stagename || '';
      this.userKey = this.profileArr[0].user || '';


      this.formGroup.controls['fullname'].setValue(this.fullname);
      this.formGroup.controls['stagename'].setValue(this.stagename);
      this.formGroup.controls['email'].setValue(this.email);
      this.formGroup.controls['gender'].setValue(this.gender);
      this.formGroup.controls['genre'].setValue(this.genre);
      this.formGroup.controls['payment'].setValue(this.payment);
      this.formGroup.controls['price'].setValue(this.price);
      this.formGroup.controls['location'].setValue(this.location);
      this.formGroup.controls['bio'].setValue(this.profileArr[0].bio);
    });

  }

  createForm() {
    const passwordRegex = ConfigurationsProvider.PasswordValidator;
    const emailRegex = ConfigurationsProvider.RegularExpEmail;
    const nameRegex = ConfigurationsProvider.RegularExpName;
    const numberRegex = ConfigurationsProvider.NumericRegex4

    this.formGroup = this.formBuilder.group({
      'fullname': [this.fullname, [Validators.required, Validators.pattern(nameRegex)]],
      'bio': [this.bio, [Validators.required, Validators.minLength(10), Validators.maxLength(120)]],
      'email': [this.email],
      'gender': [this.gender, [Validators.required, Validators.pattern(nameRegex)]],
      'genre': [this.genre, [Validators.required]],
      'location': [this.location, [Validators.required]],
      'select': [''],
      'payment': [this.payment, [Validators.required]],
      'price': [this.price, [Validators.required, Validators]],
      'stagename': [this.stagename, [Validators.required]]
    });

    this.generateAutocomplete();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserProfilePage');
  }

  initializeItems() {


    this.items = [
      'Bela-Bela', 'Bloemfontein', 'Cape Town', 'Durban', 'East london', 'Free State', 'Germiston', 'Johannesburg', 'Kimberley', 'Limpopo', 'Mafikeng', 'Mahikeng', 'Mpumalanga', 'Nelspruit', 'Randfontein', 'Roodepoort', 'Rustenburg', 'Pietermaritzburg', 'Polokwane', 'Portcherstroom', 'Port Elizabeth', 'Soweto', 'Sandton City',
      'Thohoyandou',
      'Western Cape',
      'Vryburg',
      'Welkom',
    ];
  }

  search(item) {
    this.city = item
    console.log("Ive been clicked", this.city);
    this.items = [];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log(val);
      if (val == "") {
        this.searchbar = null;
        console.log("true");
      }
    }
  }

  test() {
    //this is where the array of cities should be hidden
    //if there has been a selection or no text has been entered
    console.log(this.getItems);
    this.searchbar = this.getItems

    if (this.searchbar == "") {

      console.log("nothing");
      //document.getElementById("hide") = "none";
    } else {
      console.log("something");
      // document.getElementById("hide") = "block";
      console.log(this.searchbar);
    }
    console.log(this.searchbar);
  }

  submit() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading....',
      duration: 1000
    });
    loading.present();
    this.upsucc = 'true';
    this.PulsedbDatabase
      .updateProfile(
        this.formGroup.get('fullname').value,
        this.formGroup.get('gender').value,
        this.formGroup.get('location').value,
        this.formGroup.get('bio').value,
        this.img
      ).then((data) => {
        loading.dismiss()
        console.log(data);
        this.upsucc = 'false';
        this.navCtrl.pop();
      });
  }


  uploadImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,

      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {

      this.img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }


  remove() {
    this.img = "https://static1.squarespace.com/static/5adeaa0ff8370a5de0e90824/t/5b976ea440ec9af58bd0860b/1536650919208/blank-avatar.png?format=300w";
    this.PulsedbDatabase.removeProfilePicture(this.img).then(() => {
    })
  }


  // careers.emh@lifehealthcare.co.za
  setLocation(location: string) {
    console.log('location');
    this.city = location;
    this.location = location;
    this.cityOnSet = true;

    this.formGroup.controls['location'].setValue(location);
  }

  generateAutocomplete() {
    this.formGroup
      .get('location')
      .valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe((location) => {
        this.isSearching = true;
        if(location){
          this.PulsedbDatabase.hereApiGetPlaceByCityName(location).subscribe(
            (locationGetResults: CitySearchResult) => {
              this.isSearching = false;

              this.locationList = locationGetResults.results;
              this.locationList = this.locationList.slice(0, 5);
              console.log({resultSearchData: locationGetResults, locationList: this.locationList})
            }
          )
        } else {
          this.isSearching = false;
          this.locationList = [];
        }
      });
  }
}
