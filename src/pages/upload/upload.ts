import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-upload',
	templateUrl: 'upload.html'
})
export class UploadPage implements OnInit {
	artistName;
	albumName;
	trackName;
	trackLink;
	arrProfile = new Array();

	name;
	surname;
	files: number;
	filename: any;
	loader: string;
	succtoast: string;
	constructor(public navCtrl: NavController, public navParams: NavParams, public PulsedbDatabase: DatabaseProvider) {}

	ionViewDidLoad() {}

	ngOnInit() {
		this.loader = 'false';
	}

	UploadMusic(form: NgForm) {
		this.succtoast = 'true';
		let timer = setInterval(() => {
			clearInterval(timer);
			this.navCtrl.pop();
			this.succtoast = 'false';
		}, 2000);
		this.PulsedbDatabase.uploadMusic(form.value.trackName, form.value.trackLink).then((data) => {});
	}
}
