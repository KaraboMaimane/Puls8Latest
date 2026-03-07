import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { formatDistanceToNow } from 'date-fns';
import { ConfigurationsProvider } from '../configurations/configurations';
import { Observable, of } from 'rxjs';
import { CitySearchResult, ModelsProvider, User } from '../models/models';

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
  getTruckArray = new Array();
  userCommentsArray2 = new Array();
  userInbox = new Array();
  userInboxArray = new Array();

  // --- Dummy session & data ---
  mockCurrentUser: any = null;

  private dummyDJs = [
    {
      bio: 'High energy sets guaranteed.',
      city: 'Johannesburg',
      email: 'djspark@example.com',
      fullname: 'John Spark',
      gender: 'Male',
      genre: 'House',
      payment: 'EFT',
      price: 2000,
      role: 'Dj',
      img: 'https://i.pravatar.cc/150?img=11',
      stagename: 'DJ Spark',
      key: 'dummy-key-1',
      key2: 'dummy-uid-1'
    },
    {
      bio: 'Afro beats specialist.',
      city: 'Cape Town',
      email: 'djafro@example.com',
      fullname: 'Amara Beats',
      gender: 'Female',
      genre: 'Afrobeats',
      payment: 'Cash',
      price: 1500,
      role: 'Dj',
      img: 'https://i.pravatar.cc/150?img=20',
      stagename: 'DJ Afro',
      key: 'dummy-key-2',
      key2: 'dummy-uid-2'
    },
    {
      bio: 'Hip Hop & RnB all night.',
      city: 'Johannesburg',
      email: 'djflow@example.com',
      fullname: 'Mike Flow',
      gender: 'Male',
      genre: 'Hip Hop',
      payment: 'EFT',
      price: 1800,
      role: 'Dj',
      img: 'https://i.pravatar.cc/150?img=33',
      stagename: 'DJ Flow',
      key: 'dummy-key-3',
      key2: 'dummy-uid-3'
    }
  ];

  private dummyProfile = {
    bio: 'Music lover.',
    location: 'Johannesburg',
    email: 'user@example.com',
    fullname: 'Demo User',
    gender: 'Male',
    genre: '',
    payment: '',
    price: 0,
    role: 'Audience',
    img: 'https://static1.squarespace.com/static/5adeaa0ff8370a5de0e90824/t/5b976ea440ec9af58bd0860b/1536650919208/blank-avatar.png?format=300w',
    stagename: '',
    key: 'dummy-profile-key',
    user: 'dummy-current-user-uid'
  };
  // --- End dummy data ---

  constructor(
    public http: HttpClient,
    private ngzone: NgZone
  ) {
    console.log('Hello DatabaseProvider Provider');
  }

  getProfile() {
    return new Promise((resolve, reject) => {
      this.ProfileArr.length = 0;
      const profile = Object.assign({}, this.dummyProfile);
      if (this.mockCurrentUser) {
        profile.email = this.mockCurrentUser.email;
        profile.fullname = this.mockCurrentUser.fullname || this.dummyProfile.fullname;
        profile.user = this.mockCurrentUser.uid;
      }
      this.ProfileArr.push(profile);
      this.userKey = profile.key;
      resolve(this.ProfileArr);
    });
  }

  updateProfile(fullname, gender, location, bio, pic) {
    return new Promise((accpt, rej) => {
      // Dummy: update local profile
      Object.assign(this.dummyProfile, { fullname, gender, location, bio, img: pic });
      accpt('successful');
    });
  }

  updateDjProfile(fullname, stagename, gender, genre, price, payment, city, bio, pic) {
    return new Promise((accpt, rej) => {
      // Dummy: update local profile
      Object.assign(this.dummyProfile, { fullname, stagename, gender, genre, price, payment, city, bio, img: pic, role: 'Dj' });
      accpt('successful');
    });
  }

  getDjcomments() {
    return new Promise((accpt, rej) => {
      this.djCommentsArray.length = 0;
      this.djCommentsArray.push({ comment: 'Great DJ!', username: 'Fan1', date: 'a moment ago' });
      accpt(this.djCommentsArray);
    });
  }

  checkstate() {
    return new Promise((resolve, reject) => {
      // Dummy: return 1 if a mock session exists, otherwise 0
      this.stayLoggedIn = this.mockCurrentUser ? 1 : 0;
      resolve(this.stayLoggedIn);
    });
  }

  login(email: string, password: string) {
    // Dummy login: accept any credentials
    return new Promise<any>((resolve, reject) => {
      const dummyUser = {
        uid: 'dummy-current-user-uid',
        email: email,
        emailVerified: true,
        fullname: 'Demo User'
      };
      this.mockCurrentUser = dummyUser;
      resolve({ user: dummyUser });
    });
  }

  resetPassword(email) {
    return new Promise(async (resolve, reject) => {
      if (email == null || email == undefined) {
        await Dialog.alert({ title: 'Reset Password', message: 'Please enter your Email.' });
        resolve(null);
      } else {
        await Dialog.alert({
          title: 'Password Request Sent',
          message: "We've sent you an email with a reset link (demo mode — no email is actually sent)."
        });
        resolve(null);
      }
    });
  }

  loginx(email, password) {
    return this.login(email, password);
  }

  checkAuthState() {
    return new Promise((accpt, rej) => {
      accpt(this.mockCurrentUser != null);
    });
  }


  searchedDJ = new Array()

  filertUsingCity(city, org) {
    return new Promise((pass, fail) => {
      this.ngzone.run(() => {
        this.searchedDJ = [];
        for (var x = 0; x < org.length; x++) {
          console.log(org[x].city);
          if (org[x].city == city) {
            this.searchedDJ.push(org[x])
            console.log(this.searchedDJ)
          }
        }
        pass(this.searchedDJ);
      })
    })
  }


  getAllDjs() {
    return new Promise((accpt, rej) => {
      this.allDjSArray.length = 0;
      this.dummyDJs.forEach(dj => this.allDjSArray.push(Object.assign({}, dj)));
      accpt(this.allDjSArray);
    });
  }


  makeComment(key, username, userKey, userPic, userComment) {
    return new Promise((accpt, rej) => {
      console.log('Dummy comment stored', { key, username, userComment });
      accpt('Comment sent');
    });
  }

  getDjInbox(key) {
    return new Promise((accpt, rej) => {
      this.userInbox.length = 0;
      const dummyBookings = [
        {
          message: 'Hey, I would like to book you for my event!',
          userImage: 'https://i.pravatar.cc/150?img=5',
          userKey: 'user-key-abc',
          username: 'Jane Doe',
          date: 'a few minutes ago',
          userEmail: 'jane@example.com'
        }
      ];
      dummyBookings.forEach(b => this.userInbox.push(b));
      accpt(this.userInbox);
    });
  }

  getComments(key) {
    return new Promise((accpt, rej) => {
      this.userCommentsArray2.length = 0;
      const dummyComments = [
        { comment: 'Amazing performance!', name: 'Alice', date: '2 hours ago' },
        { comment: 'Would definitely book again.', name: 'Bob', date: '1 day ago' }
      ];
      dummyComments.forEach(c => this.userCommentsArray2.push(c));
      accpt(this.userCommentsArray2);
    });
  }

  getuser() {
    return new Promise((accpt, rej) => {
      const user = this.mockCurrentUser || { uid: 'dummy-current-user-uid', email: 'user@example.com', fullname: 'Demo User' };
      this.storeCurrentUserImage(this.dummyProfile.img);
      this.storeCurrentUsername(user.fullname || 'Demo User');
      this.storeUserKey('dummy-profile-key');
      this.storeCurrentUserPath(user.uid);
      accpt(user);
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

  createRequest(key, Userkey, userName, userEmail, message, userKey) {
    return new Promise((accpt, rej) => {
      console.log('Dummy booking request sent', { key, userName, message });
      accpt('Request sent');
    });
  }

  retrieveChats(key) {
    return new Promise((accpt, rej) => {
      accpt('data Found');
    });
  }

  StartChat(djKey, key, userName, userEmail, message, image, userKey) {
    return new Promise((accpt, rej) => {
      console.log('Dummy chat started', { djKey, userName, message });
      accpt('chat started');
    });
  }

  getChats(path) {
    return new Promise((accpt, rej) => {
      this.chatroomArray.length = 0;
      const dummyChats = [
        { name: 'Demo User', email: 'user@example.com', message: 'Hi, are you available?', userKey: 'dummy-current-user-uid', djKey: undefined, date: 'a few seconds ago', side: 'right' },
        { name: 'DJ Spark', email: 'djspark@example.com', message: 'Yes, I am!', userKey: undefined, djKey: 'dummy-uid-1', date: 'just now', side: 'left' }
      ];
      dummyChats.forEach(c => this.chatroomArray.push(c));
      accpt(this.chatroomArray);
    });
  }

  createInbox(key, userName, userEmail) {
    return new Promise((accpt, rej) => {
      console.log('Dummy inbox created', { key, userName });
      accpt('inbox sent');
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
      Object.assign(this.dummyProfile, { fullname: name, email, img: downloadurl, location: address });
      pass(null);
    });
  }

  replyMessage(path, message, side, name) {
    return new Promise((accpt, rej) => {
      console.log('Dummy reply sent', { path, message, side, name });
      accpt('message sent');
    });
  }

  createUserInbox(key, message, djKey, djStageName, djImage, check) {
    return new Promise((accpt, rej) => {
      console.log('Dummy user inbox created', { key, message });
      accpt('userInboxSent');
    });
  }

  getUserInbox(key) {
    this.userInboxArray.length = 0;
    return new Promise((accpt, rej) => {
      const dummyInbox = [
        {
          message: 'Your booking request has been received.',
          userKey: 'dummy-key-1',
          date: 'a moment ago',
          name: 'DJ Spark',
          image: 'https://i.pravatar.cc/150?img=11',
          check: false
        }
      ];
      this.userInboxArray.length = 0;
      dummyInbox.forEach(i => this.userInboxArray.push(i));
      accpt(this.userInboxArray);
    });
  }


  logout() {
    return new Promise((resolve, reject) => {
      this.mockCurrentUser = null;
      resolve(null);
    });
  }

  register(fullname, email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      const dummyUser = {
        uid: 'dummy-reg-uid-' + Date.now(),
        email: email,
        emailVerified: false,
        fullname: fullname,
        sendEmailVerification: () => Promise.resolve()
      };
      this.mockCurrentUser = dummyUser;
      resolve({ user: dummyUser });
    });
  }

  resetpassword(email: string) {
    return this.resetPassword(email);
  }

  uploadMusic(trackLink, trackName) {
    return new Promise((resolve, reject) => {
      console.log('Dummy music upload', { trackLink, trackName });
      resolve(null);
    });
  }

  retrieveMusic(us) {
    console.log(us);
    return new Promise((resolve, reject) => {
      this.getTruckArray.length = 0;
      const dummyTracks = [
        { MusicName: 'https://example.com/track1.mp3', name: 'Demo Track 1', uid: us },
        { MusicName: 'https://example.com/track2.mp3', name: 'Demo Track 2', uid: us }
      ];
      dummyTracks.forEach(t => this.getTruckArray.push(t));
      resolve(this.getTruckArray);
    });
  }


  removeProfilePicture(userImage) {
    return new Promise((accpt, rej) => {
      this.dummyProfile.img = userImage;
      accpt('successful');
      console.log('success');
    });
  }

  cities = new Array();

  SignCities(city) {
    var results = "";
    for (var x = 0; x < this.cities.length; x++) {
      if (this.cities[x] == city) {
        results = "found";
        break
      }
    }
    if (results != "found") {
      this.cities.push(city);
    }
  }

  getAllcities() {
    return this.cities;
  }

  hereApiGetPlaceByCityName(city: string) {
    let response: Observable<CitySearchResult>;
    response = this.http.get<CitySearchResult>(ConfigurationsProvider.getCity(city));
    // .pipe(
    //   map(SolidApiService.extractData)
    // );
    return response;
  }

  firebaseGettingUserData() {
    const dummyUser: User = Object.assign(new User(), this.dummyProfile);
    return of(dummyUser);
  }

}
