import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseProvider } from '../../providers/database/database';
import { NgForm } from '@angular/forms';

@Component({
	standalone: false,
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

	constructor(public navCtrl: NavController, public PulsedbDatabase: DatabaseProvider) {}

	ionViewDidLoad() {}

	ngOnInit() {
		this.loader = 'false';
	}

	UploadMusic(form: NgForm) {
		this.succtoast = 'true';
		let timer = setInterval(() => {
			clearInterval(timer);
			this.navCtrl.back();
			this.succtoast = 'false';
		}, 2000);
		this.PulsedbDatabase.uploadMusic(form.value.trackName, form.value.trackLink).then((data) => {});
	}
}

