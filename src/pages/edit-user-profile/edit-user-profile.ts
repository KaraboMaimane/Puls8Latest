import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
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
	constructor(public navCtrl: NavController, public navParams: NavParams, public PulsedbDatabase: DatabaseProvider) {}

	ngOnInit() {
		this.loader = 'false';
		this.PulsedbDatabase.getProfile().then((data: any) => {
			console.log(data);
			this.profileArr = data;
			console.log(this.profileArr);
			this.bio = this.profileArr[0].bio;
			(this.city = this.profileArr[0].city),
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

	ionViewDidLoad() {
		console.log('ionViewDidLoad EditUserProfilePage');
	}

	submit(form: NgForm) {
		this.loader = 'true';
		this.PulsedbDatabase
			.updateProfile(form.value.fullname, form.value.gender, form.value.city, form.value.bio, this.img)
			.then((data) => {
				console.log(data);
				this.loader = 'false';
				this.navCtrl.pop();
			});
	}

	UpdateImage(event: any) {
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (event: any) => {
				this.img = event.target.result;
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	}


	remove() {
		// const loader = this.loadingCtrl.create({
		//   content: "Deleteing Picture...",
		//   duration: 800
		// });
		// loader.present();
		this.img = "../../assets/imgs/user.png";
		this.PulsedbDatabase.removeProfilePicture(this.img).then(()=>{
		  // loader.dismiss();
		})
		
		
	  }
}
