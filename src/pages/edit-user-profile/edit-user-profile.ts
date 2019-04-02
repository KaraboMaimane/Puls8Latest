import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController,ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
	constructor(public navCtrl: NavController, public navParams: NavParams, public PulsedbDatabase: DatabaseProvider,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController,
	    public alertCtrl :AlertController,public camera:Camera) {}

	ngOnInit() {
		this.loader = 'false';
		this.PulsedbDatabase.getProfile().then((data: any) => {
			console.log(data);
			this.profileArr = data;
			console.log(this.profileArr);
			this.bio = this.profileArr[0].bio;
			(this.city = this.profileArr[0].location),
				(this.email = this.profileArr[0].email),
				(this.fullname = this.profileArr[0].fullname),
				(this.gender = this.profileArr[0].gender),
				(this.genre = this.profileArr[0].genre),
				(this.payment = this.profileArr[0].payment),
				(this.price = this.profileArr[0].price),
				(this.role = this.profileArr[0].role),
				(this.img = this.profileArr[0].img),
				(this.stagename = this.profileArr[0].stagename),
				(this.userKey = this.profileArr[0].user);
			console.log(this.city);

			if (this.role != 'Dj') {
			}
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EditUserProfilePage');
	}

	submit(form: NgForm) {
		let loading = this.loadingCtrl.create({
			spinner: 'bubbles',
			content: 'Loading....',
			duration: 1000
		});
		loading.present();
		this.upsucc = 'true';
		this.PulsedbDatabase
			.updateProfile(form.value.fullname, form.value.gender, form.value.city, form.value.bio, this.img)
			.then((data) => {
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
   saveToPhotoAlbum:false
 }

 this.camera.getPicture(options).then((imageData) => {

  this.img = 'data:image/jpeg;base64,' + imageData;
 }, (err) => {
 console.log(err);
 });
	}


	remove() {
		this.img = "https://static1.squarespace.com/static/5adeaa0ff8370a5de0e90824/t/5b976ea440ec9af58bd0860b/1536650919208/blank-avatar.png?format=300w";
		this.PulsedbDatabase.removeProfilePicture(this.img).then(()=>{
		})
		}
		


		// careers.emh@lifehealthcare.co.za
}