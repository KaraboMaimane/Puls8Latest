import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
	commentsArray = [];
	inboxArray = [];
	userinboxArray = [];
	userKey: void;
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
	stagename;
	profile: string;
	state;
	inbox
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public actionSheetCtrl: ActionSheetController,
		public PulsedbDatabase: DatabaseProvider,
		public modalCtrl: ModalController
	) {}

	ngOnInit() {
		this.profile = 'infor';
	}
	ionViewDidEnter() {
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
			console.log(this.userKey);

			
			if(this.role == "Dj"){
				this.PulsedbDatabase.getComments(this.userKey).then((data: any) => {
					console.log(data);
					this.commentsArray = data;
				});
				this.PulsedbDatabase.getDjInbox(this.userKey).then((data: any) => {
					console.log(data);
					this.inboxArray = data;
				});
			}
			else{
				 this.PulsedbDatabase.getUserInbox(this.userKey).then((data:any)=>{
					 console.log(data)
					 this.userinboxArray = data;
				 })
			}
			

			if (this.role != 'Dj') {
			}
		});
	}
	edit(page: string) {
		this.navCtrl.push('EditUserProfilePage');
	}
	ionViewDidLoad() {}

	viewBooking(i) {
		console.log(i);
		let dj = this.userKey;
		console.log(dj);
		let userInfo = i;
		this.navCtrl.push('ViewChatRequestPage', { userObj: userInfo, djObj: dj });
	}

	viewMessage(k){
		console.log(k)
		let djInfo = k
		this.navCtrl.push('ChatroomPage',{ objKey: djInfo})
	}

	nextpage(page: string) {
		this.navCtrl.push(page);
	}

	logout() {
		this.PulsedbDatabase.logout().then(
			() => {
				this.navCtrl.setRoot('CategoriesPage');
			},
			(error) => {
				console.log(error.message);
			}
		);
	}

	upload() {
		this.navCtrl.push('TrackUploadPage');
	}
	changeRole() {
		const modal = this.modalCtrl.create('InstructionsPage');
		modal.present();
	}
}