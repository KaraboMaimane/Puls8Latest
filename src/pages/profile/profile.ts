import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
	standalone: false,
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
		public actionSheetCtrl: ActionSheetController,
		public PulsedbDatabase: DatabaseProvider
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
	edit(page?: string) {
		this.navCtrl.navigateForward(['/edit-user-profile']);
	}
	ionViewDidLoad() {}

	viewBooking(i) {
		console.log(i);
		let dj = this.userKey;
		console.log(dj);
		let userInfo = i;
		this.navCtrl.navigateForward(['/view-chat-request'], { state: { userObj: userInfo, djObj: dj } });
	}

	viewMessage(k) {
		console.log(k);
		let djInfo = k;
		this.navCtrl.navigateForward(['/chatroom'], { state: { objKey: djInfo } });
	}

	nextpage(page: string) {
		this.navCtrl.navigateForward(['/' + page.replace('Page', '').toLowerCase()]);
	}

	logout() {
		this.PulsedbDatabase.logout().then(
			() => {
				this.navCtrl.navigateRoot(['/categories']);
			},
			(error) => {
				console.log(error.message);
			}
		);
	}

	upload() {
		this.navCtrl.navigateForward(['/track-upload']);
	}

	changeRole() {
		this.navCtrl.navigateForward(['/instructions']);
	}
}