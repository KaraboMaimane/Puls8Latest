import {HttpClient} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {AlertController, LoadingController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';

import moment from "moment";
import {ConfigurationsProvider} from "../configurations/configurations";
import {Observable} from "rxjs";
import {CitySearchResult, User} from "../models/models";

const DB_DATA_URL = 'assets/data/db.json';
const STORAGE_KEY_SESSION = 'puls8_session';
const STORAGE_KEY_USERS = 'puls8_users';
const STORAGE_KEY_COMMENTS = 'puls8_comments';
const STORAGE_KEY_BOOKINGS = 'puls8_bookings';
const STORAGE_KEY_INBOX = 'puls8_inbox';
const STORAGE_KEY_USER_INBOX = 'puls8_user_inbox';
const STORAGE_KEY_CHATROOM = 'puls8_chatroom';
const STORAGE_KEY_MUSIC = 'puls8_music';

@Injectable()
export class DatabaseProvider {

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

  private dbData: any = null;

  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController,
    private ngzone: NgZone,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    console.log('Hello DatabaseProvider Provider');
  }

  private loadDb(): Promise<any> {
    if (this.dbData) {
      return Promise.resolve(this.dbData);
    }
    return this.http.get(DB_DATA_URL).toPromise().then((data: any) => {
      this.dbData = data;
      // Seed localStorage with initial data if not already present
      if (!localStorage.getItem(STORAGE_KEY_USERS)) {
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(data.users || []));
      }
      if (!localStorage.getItem(STORAGE_KEY_COMMENTS)) {
        localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(data.comments || []));
      }
      if (!localStorage.getItem(STORAGE_KEY_BOOKINGS)) {
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(data.bookings || []));
      }
      if (!localStorage.getItem(STORAGE_KEY_INBOX)) {
        localStorage.setItem(STORAGE_KEY_INBOX, JSON.stringify(data.inbox || []));
      }
      if (!localStorage.getItem(STORAGE_KEY_USER_INBOX)) {
        localStorage.setItem(STORAGE_KEY_USER_INBOX, JSON.stringify(data.userInbox || []));
      }
      if (!localStorage.getItem(STORAGE_KEY_CHATROOM)) {
        localStorage.setItem(STORAGE_KEY_CHATROOM, JSON.stringify(data.chatroom || []));
      }
      if (!localStorage.getItem(STORAGE_KEY_MUSIC)) {
        localStorage.setItem(STORAGE_KEY_MUSIC, JSON.stringify(data.music || []));
      }
      return data;
    });
  }

  private getUsers(): any[] {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    return raw ? JSON.parse(raw) : [];
  }

  private saveUsers(users: any[]): void {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }

  private getCurrentSession(): any {
    const raw = localStorage.getItem(STORAGE_KEY_SESSION);
    return raw ? JSON.parse(raw) : null;
  }

  private saveSession(user: any): void {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
  }

  private clearSession(): void {
    localStorage.removeItem(STORAGE_KEY_SESSION);
  }

  getProfile() {
    return this.loadDb().then(() => {
      const session = this.getCurrentSession();
      if (!session) return [];
      const users = this.getUsers();
      const user = users.find(u => u.uid === session.uid);
      if (!user) return [];
      this.ProfileArr.length = 0;
      const obj = {
        bio: user.bio,
        location: user.location || user.city,
        email: user.email,
        fullname: user.fullname,
        gender: user.gender,
        genre: user.genre,
        payment: user.payment,
        price: user.price,
        role: user.role,
        img: user.img,
        stagename: user.stagename,
        key: user.key,
        user: user.uid
      };
      this.ProfileArr.push(obj);
      this.userKey = user.key;
      return this.ProfileArr;
    });
  }

  updateProfile(fullname, gender, location, bio, pic) {
    return this.loadDb().then(() => {
      const session = this.getCurrentSession();
      if (!session) return;
      const users = this.getUsers();
      const idx = users.findIndex(u => u.uid === session.uid);
      if (idx > -1) {
        users[idx].fullname = fullname;
        users[idx].gender = gender;
        users[idx].location = location;
        users[idx].bio = bio;
        if (pic) users[idx].img = pic;
        this.saveUsers(users);
        // Update session
        this.saveSession(users[idx]);
      }
      return 'successful';
    });
  }

  updateDjProfile(fullname, stagename, gender, genre, price, payment, city, bio, pic) {
    return this.loadDb().then(() => {
      const session = this.getCurrentSession();
      if (!session) return;
      const users = this.getUsers();
      const idx = users.findIndex(u => u.uid === session.uid);
      if (idx > -1) {
        users[idx].fullname = fullname;
        users[idx].stagename = stagename;
        users[idx].gender = gender;
        users[idx].genre = genre;
        users[idx].price = price;
        users[idx].payment = payment;
        users[idx].city = city;
        users[idx].bio = bio;
        users[idx].role = 'Dj';
        if (pic) users[idx].img = pic;
        this.saveUsers(users);
        this.saveSession(users[idx]);
      }
      return 'successful';
    });
  }

  getDjcomments() {
    return this.loadDb().then(() => {
      const session = this.getCurrentSession();
      if (!session) return [];
      const raw = localStorage.getItem(STORAGE_KEY_COMMENTS);
      const comments = raw ? JSON.parse(raw) : [];
      this.djCommentsArray = comments.filter(c => c.djKey === session.uid);
      return this.djCommentsArray;
    });
  }

  checkstate() {
    return this.loadDb().then(() => {
      const session = this.getCurrentSession();
      this.stayLoggedIn = session ? 1 : 0;
      return this.stayLoggedIn;
    });
  }

  login(email: string, password: string) {
    return this.loadDb().then(() => {
      const users = this.getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        return Promise.reject({ message: 'Invalid email or password. Please try again.' });
      }
      this.saveSession(user);
      // Return an object resembling Firebase auth result for compatibility
      return {
        user: {
          uid: user.uid,
          email: user.email,
          emailVerified: true
        }
      };
    });
  }

  resetPassword(email) {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        if (!email) {
          const alert = this.alertCtrl.create({
            subTitle: 'Please enter your Email.',
            buttons: ['OK']
          });
          alert.present();
          resolve(null);
        } else {
          const alert = this.alertCtrl.create({
            title: 'Password Reset',
            subTitle: 'In a real app, a password reset email would be sent to ' + email + '. For this demo, your password remains unchanged.',
            buttons: ['OK']
          });
          alert.present();
          resolve(null);
        }
      });
    });
  }

  loginx(email, password) {
    return this.login(email, password);
  }

  checkAuthState() {
    return this.loadDb().then(() => {
      const session = this.getCurrentSession();
      return !!session;
    });
  }

  searchedDJ = new Array();

  filertUsingCity(city, org) {
    return new Promise((pass, fail) => {
      this.ngzone.run(() => {
        this.searchedDJ = [];
        for (var x = 0; x < org.length; x++) {
          if (org[x].city === city) {
            this.searchedDJ.push(org[x]);
          }
        }
        pass(this.searchedDJ);
      });
    });
  }

  getAllDjs() {
    return this.loadDb().then(() => {
      const users = this.getUsers();
      this.allDjSArray.length = 0;
      users.forEach(u => {
        if (u.role === 'Dj') {
          this.allDjSArray.push({
            bio: u.bio,
            city: u.city || u.location,
            email: u.email,
            fullname: u.fullname,
            gender: u.gender,
            genre: u.genre,
            payment: u.payment,
            price: u.price,
            role: u.role,
            img: u.img,
            stagename: u.stagename,
            key: u.key,
            key2: u.uid
          });
        }
      });
      return this.allDjSArray;
    });
  }

  makeComment(key, username, userKey, userPic, userComment) {
    return this.loadDb().then(() => {
      const raw = localStorage.getItem(STORAGE_KEY_COMMENTS);
      const comments = raw ? JSON.parse(raw) : [];
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      comments.push({
        key: 'commentKey_' + Date.now(),
        djKey: key,
        comment: userComment,
        userKey: userKey,
        username: username,
        userImage: userPic,
        date: date
      });
      localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(comments));
      return 'Comment sent';
    });
  }

  getDjInbox(key) {
    return this.loadDb().then(() => {
      const raw = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      const bookings = raw ? JSON.parse(raw) : [];
      this.userInbox.length = 0;
      const filtered = bookings.filter(b => b.djKey === key);
      filtered.forEach(b => {
        this.userInbox.push({
          message: b.message,
          userImage: b.image,
          userKey: b.userKey,
          username: b.name,
          date: moment(b.date, "MMMM Do YYYY, h:mm:ss a").startOf('minutes').fromNow(),
          userEmail: b.email
        });
      });
      return this.userInbox;
    });
  }

  getComments(key) {
    return this.loadDb().then(() => {
      const raw = localStorage.getItem(STORAGE_KEY_COMMENTS);
      const comments = raw ? JSON.parse(raw) : [];
      this.userCommentsArray2.length = 0;
      const filtered = comments.filter(c => c.djKey === key);
      filtered.forEach(c => {
        this.userCommentsArray2.push({
          comment: c.comment,
          name: c.username,
          date: moment(c.date, "MMMM Do YYYY, h:mm:ss a").startOf('minutes').fromNow()
        });
      });
      return this.userCommentsArray2;
    });
  }

  getuser() {
    return this.loadDb().then(() => {
      const session = this.getCurrentSession();
      if (!session) return null;
      const users = this.getUsers();
      const user = users.find(u => u.uid === session.uid);
      if (!user) return null;
      return {
        fullname: user.fullname,
        img: user.img,
        key: user.uid,
        email: user.email,
        role: user.role
      };
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

  createRequest(djKey, userKey, userName, userEmail, message, image) {
    return this.loadDb().then(() => {
      const raw = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      const bookings = raw ? JSON.parse(raw) : [];
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      bookings.push({
        key: 'bookingKey_' + Date.now(),
        djKey: djKey,
        message: message,
        name: userName,
        email: userEmail,
        image: image,
        userKey: userKey,
        check: false,
        side: 'right',
        date: date
      });
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
      return 'Request sent';
    });
  }

  retrieveChats(key) {
    return this.loadDb().then(() => {
      return 'data Found';
    });
  }

  StartChat(djKey, key, userName, userEmail, message, image, userKey) {
    return this.loadDb().then(() => {
      const raw = localStorage.getItem(STORAGE_KEY_CHATROOM);
      const chatrooms = raw ? JSON.parse(raw) : [];
      const path = djKey + '/' + key;
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      let room = chatrooms.find(r => r.path === path);
      if (!room) {
        room = { path: path, messages: [] };
        chatrooms.push(room);
      }
      room.messages.push({
        key: 'msgKey_' + Date.now(),
        check: false,
        date: date,
        userkey: userKey,
        name: userName,
        image: image,
        email: userEmail,
        message: message,
        side: 'right'
      });
      localStorage.setItem(STORAGE_KEY_CHATROOM, JSON.stringify(chatrooms));
      return 'chat started';
    });
  }

  getChats(path) {
    return this.loadDb().then(() => {
      const raw = localStorage.getItem(STORAGE_KEY_CHATROOM);
      const chatrooms = raw ? JSON.parse(raw) : [];
      this.chatroomArray.length = 0;
      const room = chatrooms.find(r => r.path === path);
      if (room && room.messages) {
        room.messages.forEach(msg => {
          const obj = {
            name: msg.name,
            email: msg.email,
            message: msg.message,
            userKey: msg.userkey,
            djKey: msg.uid,
            date: moment(msg.date, "MMMM Do YYYY, h:mm:ss a").startOf('minutes').fromNow(),
            side: msg.side
          };
          if (obj.djKey !== undefined || obj.userKey !== undefined) {
            this.chatroomArray.push(obj);
          }
        });
      }
      return this.chatroomArray;
    });
  }

  createInbox(key, userName, userEmail) {
    return this.loadDb().then(() => {
      const raw = localStorage.getItem(STORAGE_KEY_INBOX);
      const inbox = raw ? JSON.parse(raw) : [];
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      inbox.push({
        key: 'inboxKey_' + Date.now(),
        djKey: key,
        name: userName,
        email: userEmail,
        date: date,
        check: false
      });
      localStorage.setItem(STORAGE_KEY_INBOX, JSON.stringify(inbox));
      return 'inbox sent';
    });
  }

  update(name, email, downloadurl, address, surname) {
    return this.loadDb().then(() => {
      const session = this.getCurrentSession();
      if (!session) return;
      const users = this.getUsers();
      const idx = users.findIndex(u => u.uid === session.uid);
      if (idx > -1) {
        users[idx].fullname = name;
        users[idx].email = email;
        if (downloadurl) users[idx].img = downloadurl;
        users[idx].location = address;
        this.saveUsers(users);
        this.saveSession(users[idx]);
      }
    });
  }

  replyMessage(path, message, side, name) {
    return this.loadDb().then(() => {
      const raw = localStorage.getItem(STORAGE_KEY_CHATROOM);
      const chatrooms = raw ? JSON.parse(raw) : [];
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      const session = this.getCurrentSession();
      const currentUser = session ? session.uid : null;
      let room = chatrooms.find(r => r.path === path);
      if (!room) {
        room = { path: path, messages: [] };
        chatrooms.push(room);
      }
      room.messages.push({
        key: 'msgKey_' + Date.now(),
        message: message,
        uid: currentUser,
        artKey: currentUser,
        date: date,
        side: side,
        name: name
      });
      localStorage.setItem(STORAGE_KEY_CHATROOM, JSON.stringify(chatrooms));
      return 'message sent';
    });
  }

  createUserInbox(key, message, djKey, djStageName, djImage, check) {
    return this.loadDb().then(() => {
      const raw = localStorage.getItem(STORAGE_KEY_USER_INBOX);
      const userInbox = raw ? JSON.parse(raw) : [];
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      userInbox.push({
        key: 'userInboxKey_' + Date.now(),
        userKey: key,
        date: date,
        message: message,
        djKey: djKey,
        djStageName: djStageName,
        djImg: djImage,
        check: check
      });
      localStorage.setItem(STORAGE_KEY_USER_INBOX, JSON.stringify(userInbox));
      return 'userInboxSent';
    });
  }

  getUserInbox(key) {
    return this.loadDb().then(() => {
      const raw = localStorage.getItem(STORAGE_KEY_USER_INBOX);
      const userInbox = raw ? JSON.parse(raw) : [];
      this.userInboxArray.length = 0;
      const filtered = userInbox.filter(item => item.userKey === key);
      filtered.forEach(item => {
        this.userInboxArray.push({
          message: item.message,
          userKey: item.djKey,
          date: moment(item.date, "MMMM Do YYYY, h:mm:ss a").startOf('minutes').fromNow(),
          name: item.djStageName,
          image: item.djImg,
          check: false
        });
      });
      return this.userInboxArray;
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        this.clearSession();
        resolve(null);
      });
    });
  }

  register(fullname, email: string, password: string) {
    return this.loadDb().then(() => {
      const users = this.getUsers();
      const existing = users.find(u => u.email === email);
      if (existing) {
        return Promise.reject({ message: 'The email address is already in use by another account.' });
      }
      const uid = 'uid_' + Date.now();
      const newUser = {
        uid: uid,
        email: email,
        password: password,
        fullname: fullname,
        role: 'Audience',
        userType: 'user',
        img: 'https://static1.squarespace.com/static/5adeaa0ff8370a5de0e90824/t/5b976ea440ec9af58bd0860b/1536650919208/blank-avatar.png?format=300w',
        key: uid,
        bio: '',
        location: '',
        city: '',
        gender: '',
        genre: '',
        payment: 0,
        price: 0,
        stagename: ''
      };
      users.push(newUser);
      this.saveUsers(users);
      return {
        user: {
          uid: uid,
          email: email,
          emailVerified: true,
          sendEmailVerification: () => Promise.resolve(null)
        }
      };
    });
  }

  resetpassword(email: string) {
    return this.resetPassword(email);
  }

  uploadMusic(trackLink, trackName) {
    return this.loadDb().then(() => {
      const raw = localStorage.getItem(STORAGE_KEY_MUSIC);
      const music = raw ? JSON.parse(raw) : [];
      const session = this.getCurrentSession();
      const uid = session ? session.uid : null;
      music.push({
        key: 'musicKey_' + Date.now(),
        MusicName: trackLink,
        name: trackName,
        uid: uid
      });
      localStorage.setItem(STORAGE_KEY_MUSIC, JSON.stringify(music));
      return 'music uploaded';
    });
  }

  retrieveMusic(us) {
    return this.loadDb().then(() => {
      const raw = localStorage.getItem(STORAGE_KEY_MUSIC);
      const music = raw ? JSON.parse(raw) : [];
      this.getTruckArray.length = 0;
      music.filter(m => m.uid === us).forEach(m => {
        this.getTruckArray.push({
          MusicName: m.MusicName,
          name: m.name,
          uid: m.uid
        });
      });
      return this.getTruckArray;
    });
  }

  removeProfilePicture(userImage) {
    return this.loadDb().then(() => {
      const session = this.getCurrentSession();
      if (!session) return;
      const users = this.getUsers();
      const idx = users.findIndex(u => u.uid === session.uid);
      if (idx > -1) {
        users[idx].img = userImage;
        this.saveUsers(users);
        this.saveSession(users[idx]);
      }
      return 'successful';
    });
  }

  cities = new Array();

  SignCities(city) {
    let found = false;
    for (var x = 0; x < this.cities.length; x++) {
      if (this.cities[x] === city) {
        found = true;
        break;
      }
    }
    if (!found) {
      this.cities.push(city);
    }
  }

  getAllcities() {
    return this.cities;
  }

  hereApiGetPlaceByCityName(city: string) {
    let response: Observable<CitySearchResult>;
    response = this.http.get<CitySearchResult>(ConfigurationsProvider.getCity(city));
    return response;
  }

}
