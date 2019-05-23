import { Component, OnInit, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { AlertController } from 'ionic-angular';
// import * as $ from "jquery";
// import { ViewProfilePage } from '../view-profile/view-profile';
import swal from 'sweetalert2';
/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var $: any;


@IonicPage()
@Component({
	selector: 'page-categories',
	templateUrl: 'categories.html'
})
export class CategoriesPage implements OnInit {
	gender;
	genre;
	city;
	getprofileArr2 = [];
	categoryArr = new Array();
	getprofileArr = [];
	tempArray = [];
	logsucc: string;
	logwarn: string;
	searchDj: string = '';
	role;
	storeAllOrgs = [];
	stateSearch = "search";
	filtereditems: any;
	state;
	items: any;
	isSet: boolean;
	searchState = 0;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public PulsedbDatabase: DatabaseProvider,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public ngzone: NgZone
	) {
		this.PulsedbDatabase.getAllDjs().then((data: any) => {
			this.ngzone.run(() => {
				this.getprofileArr = data;
				this.getprofileArr2 = data;
				console.log(this.getprofileArr);
				console.log(this.getprofileArr2);

				this.storeCatData(data)
				this.storeCities(this.PulsedbDatabase.getAllcities())
				this.initializeItems();
			})
		});
		this.filtereditems = [];
	}

	fadeOut() {
		var filters = document.getElementsByClassName("dropdown") as HTMLCollectionOf<HTMLElement>;
		var searcher = document.getElementsByClassName("searching") as HTMLCollectionOf<HTMLElement>;
		var icon1 = document.getElementsByClassName("ico") as HTMLCollectionOf<HTMLElement>;
		var icon2 = document.getElementsByClassName("ico2") as HTMLCollectionOf<HTMLElement>;


		if (this.searchState == 0) {
			this.searchState = 1;
			searcher[0].style.display = "block";
			filters[0].style.display = "none";
			icon2[0].style.display = "block";
			icon1[0].style.display = "none";

			this.filtereditems = [];
			this, this.searchDj = "";
			this.initializeItems();
			this.setArrayBack(this.tempArray)
		}
		else {
			this.searchState = 0;
			searcher[0].style.display = "none";
			filters[0].style.display = "block";
			icon2[0].style.display = "none";
			icon1[0].style.display = "block";
			this.filtereditems = [];
		}
		console.log(this.searchState);

	}

	ionViewDidEnter() {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CategoriesPage');
	}

	ngOnInit() {
		this.logsucc = 'false';
		this.logwarn = 'false';
		this.PulsedbDatabase.checkstate().then((data: any) => {
			if (data == 1) {
				this.logsucc = 'true';
				let timer = setInterval(() => {
					clearInterval(timer);
					this.logsucc = 'false';
				}, 3000);
			} else {
				this.logwarn = 'true';
				let timer = setInterval(() => {
					clearInterval(timer);
					this.logwarn = 'false';
				}, 3000);
			}
		});
	}

	call() {
		this.getprofileArr2 = [];
		for (var x = 0; x < this.getprofileArr.length; x++) {
			if (this.role == this.getprofileArr[x].role) {
				this.getprofileArr2.push(this.getprofileArr[x]);
				console.log(this.getprofileArr[x]);
			}
		}

		this.getprofileArr2 = this.getprofileArr;
	}

	selectGenre() {
		this.getprofileArr2 = [];
		for (var x = 0; x < this.getprofileArr.length; x++) {
			if (this.genre == this.getprofileArr[x].genre) {
				this.getprofileArr2.push(this.getprofileArr[x]);
				console.log(this.getprofileArr[x]);
			}
		}
		if (this.genre == 'Genre') {
			this.PulsedbDatabase.getAllDjs().then((data: any) => {
				this.getprofileArr = data;
				this.getprofileArr2 = data;
				console.log(this.getprofileArr);
				console.log(this.getprofileArr2);
			});
		}
	}

	selectGender() {
		this.getprofileArr2 = [];
		for (var x = 0; x < this.getprofileArr.length; x++) {
			if (this.gender == this.getprofileArr[x].gender) {
				this.getprofileArr2.push(this.getprofileArr[x]);
				console.log(this.getprofileArr[x]);
			}
		}
		if (this.gender == 'Gender') {
			this.PulsedbDatabase.getAllDjs().then((data: any) => {
				this.getprofileArr = data;
				this.getprofileArr2 = data;
				console.log(this.getprofileArr);
				console.log(this.getprofileArr2);
			});
		}
	}
	selectcity() {
		this.getprofileArr2 = [];
		for (var x = 0; x < this.getprofileArr.length; x++) {
			if (this.city == this.getprofileArr[x].city) {
				this.getprofileArr2.push(this.getprofileArr[x]);
				console.log(this.getprofileArr[x]);
			}
		}
		if (this.city == 'City') {
			this.PulsedbDatabase.getAllDjs().then((data: any) => {
				this.getprofileArr = data;
				this.getprofileArr2 = data;
				console.log(this.getprofileArr);
				console.log(this.getprofileArr2);
			});
		}
	}
	ViewProfile(i) {
		console.log(i);
		let dj = i;
		console.log(dj);
		this.navCtrl.push('ViewProfilePage', { Djkey: dj });
	}

	profilePage() {
		this.PulsedbDatabase.getuser().then((data) => {
			console.log(data);
		});
		console.log('in');
		this.PulsedbDatabase.checkstate().then((state: any) => {
			console.log(state);
			this.state = state;
			console.log(this.state);
			if (this.state == 1) {
				this.PulsedbDatabase.getProfile().then((data: any) => {
					console.log(data);
					let profile = [];
					profile = data;
					this.role = profile[0].role;
					console.log(this.role);
					if (this.role == 'Audience') {
						console.log(this.role);
						this.navCtrl.push('UserprofilePage');
					} else if (this.role == 'Dj') {
						this.navCtrl.push('DjProfilePage');
						console.log(this.role);
					}
				});
			} else if (this.state == 0) {
				console.log('user is offline');
				swal.fire({
					title: 'Sign In Required!',
					text: "You have to sign in before you can view your profile. Would you like to Sign in now?",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, Log In?'
				}).then((result) => {
					if (result.value) {

						this.navCtrl.push('LoginPage');
					}
				});
			}
		});
	}
	assignName(name) {
		this.PulsedbDatabase.filertUsingCity(name, this.tempArray).then((data: any) => {
			this.getprofileArr = [];
			this.getprofileArr = data;
			console.log(this.getprofileArr)
		})
		console.log(name)
		this.searchDj = name;
		this.filtereditems = [];
		this.initializeItems();
	}
	   cities = new Array()
	   storeCities(cities) {
		this.cities = cities;
		console.log(this.cities);

	}
	initializeItems() {
		this.items = null;
		this.items = this.cities;
		console.log(this.items);
	}



	filterItems() {
		console.log(this.searchDj);
		this.initializeItems();
		if (this.searchDj != "") {
			this.filtereditems = this.items.filter((item) => {
				return item.toLowerCase().indexOf(this.searchDj.toLowerCase()) > -1;
			});
		} else if (this.searchDj == "" || this.searchDj == null) {
			this.filtereditems = [];
		}
		console.log(this.filtereditems)
	}


	getItems(ev: any) {
		// Reset items back to all of the items
		this.initializeItems();
		this.setArrayBack(this.tempArray)
		// set val to the value of the searchbar
		const val = ev.target.value;
		// if the value is an empty string don't filter the items
		if (val && val.trim() != "") {
			this.items = this.items.filter((item) => {

				return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})

		}
	}





	storeCatData(data) {
		this.getprofileArr2 = data;
		console.log(this.getprofileArr)
		this.tempArray = this.getprofileArr;
		this.getprofileArr2 = data;
	}


	setArrayBack(data) {
		this.getprofileArr = data;
		console.log(this.getprofileArr)
	}






}
