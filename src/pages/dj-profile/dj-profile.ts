import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
	standalone: false,
	selector: 'page-dj-profile',
	templateUrl: 'dj-profile.html',
})
export class DjProfilePage implements OnInit {
	commentsArray = [];
	inboxArray = [];
	musicArr=[];
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
	getcomments=0;
	state;
	profile = 'infor'
	constructor(public navCtrl: NavController,
		public actionSheetCtrl: ActionSheetController,
		public PulsedbDatabase: DatabaseProvider) {
	}



	ionViewDidEnter() {
		this.PulsedbDatabase.getProfile().then((data: any) => {
			console.log(data);
			this.profileArr = data;
			console.log(this.profileArr);
			this.bio = this.profileArr[0].bio;
			this.city = this.profileArr[0].city;
				this.email = this.profileArr[0].email;
				this.fullname = this.profileArr[0].fullname;
				this.gender = this.profileArr[0].gender;
				this.genre = this.profileArr[0].genre;
				this.payment = this.profileArr[0].payment;
				this.price = this.profileArr[0].price;
				this.role = this.profileArr[0].role;
				this.img = this.profileArr[0].img;
				this.stagename = this.profileArr[0].stagename;
				this.userKey = this.profileArr[0].user;
			console.log(this.userKey);

			this.PulsedbDatabase.retrieveMusic(this.userKey).then((data:any) => {
				this.musicArr=[];		
				this.musicArr =data
				console.log(this.musicArr)
			})


			this.PulsedbDatabase.getDjInbox(this.userKey).then((data: any) => {
				console.log(data);
				this.inboxArray = data;
			});
			this.PulsedbDatabase.getComments(this.userKey).then((data: any) => {
				console.log(data);
				this.commentsArray = data;
			});

	
			if (this.role != 'Dj') {
			}
		});

		
	
	}

	ngOnInit(){
		
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad DjProfilePage');
		console.log(this.userKey);
		this.PulsedbDatabase.getDjInbox(this.userKey).then((data: any) => {
			console.log(data);
			this.inboxArray = data;
		});
		this.PulsedbDatabase.getComments(this.userKey).then((data: any) => {
			console.log(data);
			this.commentsArray = data;
		})	
	}

	viewBooking(i) {
		console.log(i);
		let dj = this.userKey;
		console.log(dj);
		let userInfo = i;
		this.navCtrl.navigateForward(['/view-chat-request'], { state: { userObj: userInfo, djObj: dj } });
	}
	edit() {
		this.navCtrl.navigateForward(['/edit-dj-profile']);
	}
	logout() {
		this.PulsedbDatabase.logout().then(
			() => {
				this.navCtrl.navigateRoot(['/login']);
			},
			(error) => {
				console.log(error.message);
			}
		);
	}

	upload() {
		this.navCtrl.navigateForward(['/upload']);
	}

	openLink(link){
		window.open(link);
	  }
}
