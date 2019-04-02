import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { AlertController,ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the EditDjProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-edit-dj-profile',
	templateUrl: 'edit-dj-profile.html'
})
export class EditDjProfilePage {
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
	stagename;
	downloadurl;
	userKey;
	EditProfileArr = [];
	loader: string;
	d = 1;
	constructor(public navCtrl: NavController, public navParams: NavParams, public PulsedbDatabase: DatabaseProvider, public loadingCtrl: LoadingController,  public alertCtrl :AlertController,public camera:Camera) {
		// this.retreivePics1();
	}

	ionViewDidLoad() {
		// this.retreivePics1();
		console.log('ionViewDidLoad EditDjProfilePage');
	}
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
			console.log(this.fullname);

			if (this.role != 'Dj') {
			}
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

	submit(form: NgForm) {
		let loading = this.loadingCtrl.create({
			spinner: 'bubbles',
			content: 'Loading....',
			duration: 1000
		});
		loading.present();
		this.loader = 'true';
		this.PulsedbDatabase
			.updateDjProfile(
				form.value.fullname,
				form.value.stagename,
                form.value.gender,
				form.value.genre,
				form.value.price,
				form.value.payment,
				form.value.city,
				form.value.bio,
				this.img
			)
			.then((data) => {
				console.log(data);
				loading.dismiss()
				this.navCtrl.pop();
				this.loader = 'false';
			});
  }
  

  remove() {
   
    this.img = "../../assets/imgs/user.png";
    this.PulsedbDatabase.removeProfilePicture(this.img).then(()=>{

    })
    
    
  }
}
