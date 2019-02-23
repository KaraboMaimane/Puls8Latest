import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { NgForm } from '@angular/forms';
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
	constructor(public navCtrl: NavController, public navParams: NavParams, public PulsedbDatabase: DatabaseProvider) {
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
	UpdateImage(event: any) {
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (event: any) => {
				this.img = event.target.result;
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	}

	submit(form: NgForm) {
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
				this.navCtrl.pop();
					// this.navCtrl.push('DjProfilePage');
				// });
				this.loader = 'false';
			});
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
