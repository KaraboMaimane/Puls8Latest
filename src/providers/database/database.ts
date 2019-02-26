import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import firebase from 'firebase';

import swal from 'sweetalert2';
import moment from "moment";
import { EmailValidator } from '@angular/forms';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DatabaseProvider {
	commentsArray(arg0: any): any {
		throw new Error('Method not implemented.');
	}
	currentUserID: any;
	chatroomArray = new Array();
	userKey: any;
	currentUserPath: any;
	currentUserImage: any;
	currentUserName: any;
	allDjSArray = new Array();
	DjCategoryArray = new Array();
	ProfileArr = new Array();
	uploadmusic = new Array();
	pic2;
	stayLoggedIn;
	djCommentsArray = new Array();
  djInboxArray = new Array();
  getTruckArray= new Array();
	userCommentsArray2 = new Array();
	userInbox = new Array();
	userInboxArray = new Array();
	constructor(
		public http: HttpClient,
		public alertCtrl: AlertController,
		private ngzone: NgZone,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController
	) {
		console.log('Hello DatabaseProvider Provider');
	}

	getProfile() {
		return new Promise((resolve, reject) => {
			let userID = firebase.auth().currentUser;
			firebase.database().ref('Registration/' + userID.uid).on('value', (data: any) => {
        let details = data.val();
        console.log(details)
				this.ProfileArr.length = 0;
				let keys = Object.keys(details);
				let k = keys[0];
				console.log(details[k].bio);
				let obj = {
					bio: details[k].bio,
					city: details[k].city,
					email: details[k].email,
					fullname: details[k].fullname,
					gender: details[k].gender,
					genre: details[k].genre,
					payment: details[k].payment,
					price: details[k].price,
					role: details[k].role,
					img: details[k].img,
					stagename: details[k].stagename,
					key: k,
					user: userID.uid
				};
				this.ProfileArr.push(obj);

				console.log(this.ProfileArr);
				this.userKey = this.ProfileArr[0].key;
				console.log(this.userKey);
			});
			resolve(this.ProfileArr);
		});
	}
	updateProfile(fullname, gender, location, bio, pic) {
		var user = firebase.auth().currentUser.uid;
		console.log(this.userKey);
		return new Promise((accpt, rej) => {
			firebase.database().ref('Registration/' + user + '/' + this.userKey).update({
				fullname: fullname,
				gender: gender,
				location: location,
				bio: bio,
				img: pic
			});
			accpt('scccessful');
		});
	}

	updateDjProfile(fullname, stagename, gender,genre, price, payment, city, bio, pic) {
		var user = firebase.auth().currentUser.uid;
		console.log(this.userKey);
		return new Promise((accpt, rej) => {
			firebase.database().ref('Registration/' + user + '/' + this.userKey).update({
				fullname: fullname,
				stagename: stagename,
        gender: gender,
				genre: genre,
				price: price,
				payment: payment,
				city: city,
				bio: bio,
				img: pic,
				role: 'Dj'
			});
			accpt('scccessful');
		});
	}

	getDjcomments() {
		return new Promise((accpt, rej) => {
			this.ngzone.run(() => {
			let userID = firebase.auth().currentUser;
			firebase.database().ref('Comments/' + userID).on('value', (data: any) => {
				let details = data.val();
				this.djCommentsArray.length = 0;
				console.log(details);
				this.djCommentsArray.push(details);
				console.log(this.djCommentsArray);
			});
			accpt(this.djCommentsArray);
		})
		});
	}

	checkstate() {
		return new Promise((resolve, reject) => {
			this.ngzone.run(() => {
				firebase.auth().onAuthStateChanged((user) => {
					if (user != null) {
						this.stayLoggedIn = 1;
					} else {
						this.stayLoggedIn = 0;
					}
					resolve(this.stayLoggedIn);
				});
			});
		});
	}
	login(email: string, password: string) {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	resetPassword(email) {
		return new Promise((resolve, reject) => {
			this.ngzone.run(() => {
				if (email == null || email == undefined) {
					const alert = this.alertCtrl.create({
						subTitle: 'Please enter your Email.',
						buttons: [ 'OK' ]
					});
					alert.present();
				} else if (email != null || email != undefined) {
					firebase.auth().sendPasswordResetEmail(email)
					.then(
						() => {
							const alert = this.alertCtrl.create({
								title: 'Password request Sent',
								subTitle:
									"We've sent you and email with a reset link, go to your email to recover your account.",
								buttons: [ 'OK' ]
							});
							alert.present();
							resolve();
						},
						(Error) => {
							const alert = this.alertCtrl.create({
								subTitle: Error.message,
								buttons: [ 'OK' ]
							});
							alert.present();
							resolve();
						}
					);
				}
			});
		}).catch((error) => {
			const alert = this.alertCtrl.create({
				subTitle: error.message,
				buttons: [
					{
						text: 'ok',
						handler: (data) => {
							console.log('Cancel clicked');
						}
					}
				]
			});
			alert.present();
		});
	}

	loginx(email, password) {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	checkAuthState() {
		return new Promise((accpt, rej) => {
			this.ngzone.run(() => {
				firebase.auth().onAuthStateChanged(function(user) {
					if (user) {
						accpt(true);
					} else {
						accpt(false);
					}
				});
			});
		});
	}
	

	getAllDjs() {
		let loading = this.loadingCtrl.create({
			spinner: 'bubbles',
			content: 'Loading....',
			duration: 1000
		});
		loading.present();
		return new Promise((accpt, rej) => {
			this.ngzone.run(() => {
			this.allDjSArray.length = 0;
			firebase.database().ref('Registration/').on('value', (data: any) => {
				this.allDjSArray.length = 0;
				var Djs = data.val();
				var keys: any = Object.keys(Djs);
				console.log(keys);
				for (var i = 0; i < keys.length; i++) {
					var x = keys[i];
					var y = 'Registration/' + x;
					firebase.database().ref(y).on('value', (data2: any) => {
						var djInfomation = data2.val();
						if (data2.val() != null || data2.val() != undefined) {
							var keys2: any = Object.keys(djInfomation);
							console.log(djInfomation);
							console.log(keys2);
							for (var j = 0; j < keys2.length; j++) {
								var k = keys2[j];
								console.log(k);
								let obj = {
									bio: djInfomation[k].bio,
									city: djInfomation[k].city,
									email: djInfomation[k].email,
									fullname: djInfomation[k].fullname,
									gender: djInfomation[k].gender,
									genre: djInfomation[k].genre,
									payment: djInfomation[k].payment,
									price: djInfomation[k].price,
									role: djInfomation[k].role,
									img: djInfomation[k].img,
									stagename: djInfomation[k].stagename,
									key: k,
									key2: x
								};
								loading.dismiss();
								if (obj.role == 'Dj') {
									this.allDjSArray.push(obj);
									console.log(obj);
								}
							}          
						} else {
							this.allDjSArray = null;
							console.log(null);
						}
					});
					accpt(this.allDjSArray);
				}
			});
		})
		});
	}


	makeComment(key, username, userKey, userPic, userComment) {
		return new Promise((accpt, rej) => {
			this.ngzone.run(() => {
			var date = moment().format("MMMM Do YYYY, h:mm:ss a");
			firebase.database().ref('Comments/' + key).push({
				comment: userComment,
				userKey: userKey,
				username: username,
				userImage: userPic,
				date: date
			});
			accpt('Comment sent');
		})
		});
	}
	getDjInbox(key) {
		return new Promise((accpt, rej) => {
			this.ngzone.run(() => {
			this.userInbox.length = 0;
			firebase.database().ref('Bookings/' + key).on('value', (data: any) => {
				console.log(data.val());
				this.userInbox.length = 0;
				var djComments = data.val();
        if(data.val() !=null || data.val() !=null){
          var k = Object.keys(djComments);
          console.log(k);
					console.log(key);
					for (var x = 0; x < k.length; x++) {
						var keys = k[x];
						let obj = {
							message: djComments[keys].message,
							userImage: djComments[keys].image,
							userKey: djComments[keys].key,
							username: djComments[keys].name,
							date: moment(djComments[keys].date, "MMMM Do YYYY, h:mm:ss a").startOf("minutes").fromNow(),
							userEmail: djComments[keys].email
						}
						console.log(obj);
						this.userInbox.push(obj);
					}
         
        }
			});
			accpt(this.userInbox);
		})
		});
	}

	getComments(key) {
		return new Promise((accpt, rej) => {
			this.ngzone.run(() => {
			firebase.database().ref('Comments/' + key).on('value', (data: any) => {
				this.userCommentsArray2.length = 0;
				console.log(data.val());
        var djComments = data.val();
        if (data.val() != null || data.val() != undefined) {
				var k = Object.keys(djComments)
					console.log(k);
					console.log(key);
					for (var x = 0; x < k.length; x++) {
						var keys = k[x];
						console.log(keys);
						let obj2 = {
							comment: djComments[keys].comment,
							name: djComments[keys].username,
							date: moment(djComments[keys].date, "MMMM Do YYYY, h:mm:ss a").startOf("minutes").fromNow()
						};
						this.userCommentsArray2.push(obj2);
						console.log(this.userCommentsArray2);
					}
				}
			});
			accpt(this.userCommentsArray2);
		})
		});
	}

	getuser() {
		return new Promise((accpt, rej) => {
			this.ngzone.run(() => {
			firebase.database().ref('Registration').on('value', (data: any) => {
				var users = data.val();
				var user = firebase.auth().currentUser;
				var userIDs = Object.keys(users);
				for (var x = 0; x < userIDs.length; x++) {
					var str1 = new String(userIDs[x]);
					var index = str1.indexOf(':');
					var currentUserID = userIDs[x].substr(index + 1);
					if (user.uid == currentUserID) {
						this.storeUsername(userIDs[x].substr(0, index));
						firebase.database().ref('Registration/' + userIDs[x]).on('value', (data: any) => {
							var Userdetails = data.val();
							this.storeUserID(userIDs[x]);
							var keys2: any = Object.keys(Userdetails);
							var user = firebase.auth().currentUser;
							this.storeCurrentUserImage(Userdetails[keys2[0]].img);
							this.storeCurrentUsername(Userdetails[keys2[0]].Username);
							this.storeUserKey(keys2[0]);
							this.storeCurrentUserPath(userIDs[x]);
							accpt(Userdetails[keys2]);
						});

						break;
					}
				}
			});
		})
		});
	}

	storeUsername(username) {
		console.log(username);
	}

	storeCurrentUsername(username) {
		this.currentUserName = username;
	}

	storeCurrentUserImage(img) {
		this.currentUserImage = img;
	}

	storeCurrentUserPath(path) {
		this.currentUserPath = path;
	}

	storeUserKey(key) {
		this.userKey = key;
	}

	storeUserID(uid) {
		this.currentUserID = uid;
	}

	createRequest(key,Userkey,userName,userEmail,message,userKey){
    return new Promise((accpt,rej)=>{
			this.ngzone.run(() => {
			var date = moment().format("MMMM Do YYYY, h:mm:ss a");
      firebase.database().ref('Bookings/' + key).push({
        name: userName,
        email: userEmail,
        key: Userkey,
        date: date,
        message: message,
        image: userKey,
        check: false,
        side: "right"
      })
			accpt("Request sent")
		})
    })
  }

	retrieveChats(key) {
		return new Promise((accpt, rej) => {
			this.ngzone.run(() => {
			firebase.database().ref('Chatroom/' + key).on('value', (data: any) => {
				console.log(data);
			});
			accpt('data Found');
		})
		});
	}

	StartChat(djKey,key,userName,userEmail,message,image,userKey){
    return new Promise((accpt,rej)=>{
			this.ngzone.run(() => {
			var date = moment().format("MMMM Do YYYY, h:mm:ss a");
      firebase.database().ref('Chatroom/' + djKey).child(key).push({
        check: false,
        date: date,
        userkey: userKey,
        name: userName,
        image: image,
        email: userEmail,
        message: message,
        side: "right"
      })
			accpt("chat started") 
		})
    })
  }

	getChats(path){
    return new Promise((accpt,rej)=>{
			this.ngzone.run(() => {
      firebase.database().ref('Chatroom/' + path).on('value',(data)=>{
        this.chatroomArray.length = 0;
        console.log(data.val())
        var chatDetails = data.val()
        var key = Object.keys(chatDetails);
      for(var x = 0; x < key.length;x++){
        var k =key[x]
        let obj = {
          name: chatDetails[k].name,
          email: chatDetails[k].email,
          message: chatDetails[k].message,
          userKey: chatDetails[k].userkey,
          djKey: chatDetails[k].uid,
					date: moment(chatDetails[k].date, "MMMM Do YYYY, h:mm:ss a").startOf("minutes").fromNow(),
          side: chatDetails[k].side
        }
        this.chatroomArray.length;
        if(obj.djKey != undefined || obj.userKey != undefined){
          this.chatroomArray.push(obj)
        console.log(this.chatroomArray)
        }
      }
      })
			accpt(this.chatroomArray)
		})
    })
  }
	createInbox(key, userName, userEmail) {
		return new Promise((accpt, rej) => {
			this.ngzone.run(() => {
			var date = moment().format("MMMM Do YYYY, h:mm:ss a");
			firebase.database().ref('inbox/' + key).push({
				name: userName,
				email: userEmail,
				date: date,
				check: false
			});
			accpt('inbox sent');
		})
		});
	}

	// createChatRoom(key,djKey){
	//   return new Promise((accpt,rej)=>{
	//     firebase.database().ref('Chatroom/' + key).push({
	//       key: djKey
	//     })
	//     accpt("chatroom created")
	//   })
	// }

	update(name, email, downloadurl, address, surname) {
		this.ProfileArr.length = 0;
		return new Promise((pass, fail) => {
			this.ngzone.run(() => {
				var user = firebase.auth().currentUser;
				firebase.database().ref('Registration/' + user.uid).update({
					name: name,
					email: email,
					downloadurl: downloadurl,
					address: address,
					surname: surname
				});
			});
		});
	}

	replyMessage(path,message,side,name){
    return new Promise((accpt,rej)=>{
			this.ngzone.run(() => {
			var date = moment().format("MMMM Do YYYY, h:mm:ss a");
      let currentUser = firebase.auth().currentUser.uid;
      firebase.database().ref('Chatroom/' + path).push({
        message:message,
        uid: currentUser,
        artKey: currentUser,
        date: date,
        side: side,
        name: name
      })
			accpt("message sent")
		})
    })
  }
	createUserInbox(key, message, djKey,djStageName,djImage,check) {
		return new Promise((accpt, rej) => {
			this.ngzone.run(() => {
			var date = moment().format("MMMM Do YYYY, h:mm:ss a");
			firebase.database().ref('userInbox/' + key).push({
				date: date,
				message: message,
				djKey: djKey,
				djStageName: djStageName,
				djImg: djImage,
				check: check
			});
			accpt('userInboxSent');
		})
		});
	}

	getUserInbox(key) {
		this.userInboxArray.length = 0;
		return new Promise((accpt, rej) => {
			this.ngzone.run(() => {
			this.userInboxArray.length = 0;
			firebase.database().ref('userInbox/' + key).on('value', (data: any) => {
				console.log(data.val());
				this.userInboxArray.length = 0;
				var userInbox = data.val();
				var k = Object.keys(userInbox);
				console.log(k);
				console.log(key);
				for (var x = 0; x < k.length; x++) {
					var keys = k[x];
					console.log(keys);
					let obj = {
						message: userInbox[keys].message,
						userKey: userInbox[keys].djKey,
						date: moment(userInbox[keys].date, "MMMM Do YYYY, h:mm:ss a").startOf("minutes").fromNow(),
						name: userInbox[keys].djStageName,
						image: userInbox[keys].djImg,
						check: false
					};
					this.userInboxArray.length = 0;
					this.userInboxArray.push(obj);
				}
			});
			accpt(this.userInboxArray);
		})
		});
	}



	logout() {
		return new Promise((resolve, reject) => {
			this.ngzone.run(() => {
				firebase.auth().signOut().then(
					() => {
						resolve();
					},
					(error) => {
						reject(error);
					}
				);
			});
		});
	}

	register(fullname, email: string, password: string) {
		return firebase.auth().createUserWithEmailAndPassword(email, password);
	}

	resetpassword(email: string) {
		return firebase.auth().sendPasswordResetEmail(email);
	}

	uploadMusic(trackLink, trackName) {
		return new Promise((resolve, reject) => {
			this.ngzone.run(() => {
			var user = firebase.auth().currentUser;
			firebase.database().ref('uploadLink/').push({
				MusicName: trackLink,
				name: trackName,
				uid: user.uid
			});
		})
		});
	}
	retrieveMusic(us) {	
		console.log(us);
		return new Promise((resolve, reject) => {
			this.ngzone.run(() => {
			// this.getTruckArray.length =0;
			var user = firebase.auth().currentUser.uid;
			firebase.database().ref('uploadLink/').on('value', (data: any) => {
				this.getTruckArray.length =0;
				var UploadDetails = data.val();
				console.log(UploadDetails);
				var k2 = Object.keys(UploadDetails);
				for(var i =0 ;i<k2.length;i++){
					var key2 = k2[i];
					if (UploadDetails[key2].uid == us) {
						let obj = {
							MusicName: UploadDetails[key2].MusicName,
							name: UploadDetails[key2].name,
							uid: UploadDetails[key2].uid
						};
						console.log(obj);
						this.getTruckArray.push(obj);
						console.log(this.getTruckArray);
					}
				}
			});
			resolve(this.getTruckArray);
		});
		});
	}
	

	removeProfilePicture(userImage) {
		var user = firebase.auth().currentUser.uid;
		console.log(this.userKey);
		return new Promise((accpt, rej) => {
			this.ngzone.run(() => {
			firebase.database().ref('Registration/' + user + '/' + this.userKey).set({
				img: userImage
			});
			accpt('scccessful');
			console.log('success');
		})
		});
	}
}
