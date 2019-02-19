import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { AlertController } from 'ionic-angular';
// import { ViewProfilePage } from '../view-profile/view-profile';
import swal from 'sweetalert2';
/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage implements OnInit{
  gender;
  genre;
  city;
  getprofileArr = [];
  getcategoryArr = []; 
  logsucc: string;
  logwarn: string;
  role
  state
  constructor(public navCtrl: NavController, public navParams: NavParams, public PulsedbDatabase: DatabaseProvider, public alertCtrl: AlertController) {
    this.displayDj();
  }

  ionViewDidLoad() {
    // this.displayDj();
    console.log('ionViewDidLoad CategoriesPage');
  } 

  displayDj(){
    this.PulsedbDatabase.getAllDjs().then((data: any) => {
      this.getprofileArr.length =0;
      this.getprofileArr=[];
      this.getprofileArr = data
      console.log(this.getprofileArr)
      
    })
  }

  ngOnInit(){
    this.logsucc = 'false';
    this.logwarn = 'false';
    this.PulsedbDatabase.checkstate().then((data:any)=>{
      if (data == 1){
        this.logsucc = 'true';
        let timer = setInterval(()=>{
          clearInterval(timer);
          this.logsucc = 'false';
        },3000)
      }
      else {
        this.logwarn = 'true';
        let timer = setInterval(()=>{
          clearInterval(timer);
          this.logwarn = 'false';
        },3000)
      }
     })
  }

  refreshs() {
    this.genre = null;
    this.gender = null;
    this.city = null;

  }

  selectGenre() {
    this.PulsedbDatabase.SelectDj(this.genre).then((data:any) => {
      this.getprofileArr.length = 0;
      var keys: any = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (this.genre == data[k].genre) {
          let obj = {
            bio: data[k].bio,
            city: data[k].city,
            email: data[k].email,
            fullname: data[k].fullname,
            gender: data[k].gender,
            genre: data[k].genre,
            payment: data[k].payment,
            price: data[k].price,
            role: data[k].role,
            img: data[k].img,
            stagename: data[k].stagename,
            key: k
          }
          this.getprofileArr.push(obj);
          this.getprofileArr.length = 0;
          this.getprofileArr=[];
          this.getprofileArr = data
          console.log(this.getprofileArr);
          this.getprofileArr.reverse();
        }
      }
    })
  }
  ViewProfile(i){
    console.log(i)
    let dj = i;
    console.log(dj)
    this.navCtrl.push('ViewProfilePage', {Djkey: dj})
  }

  profilePage() {
    this.PulsedbDatabase.getuser().then(data => {
      console.log(data);
    })
    console.log("in");
    this.PulsedbDatabase.checkstate().then((state: any) => {
      console.log(state)
      this.state = state
      console.log(this.state) 
      if (this.state == 1) {
        this.PulsedbDatabase.getProfile().then((data: any) => {
          console.log(data)
          let profile = [];
          profile = data
          this.role = profile[0].role
          console.log(this.role)
          if (this.role == "Audience") {
            this.navCtrl.push('ProfilePage');
          }
          else if (this.role == "Dj") {
            this, this.navCtrl.push('DjProfilePage')
          }
          else {
            this.navCtrl.push('CatergoriesPage');
          }
        })
      }
      else if (this.state == 0) {
        console.log('user is offline')
        this.navCtrl.push(LoginPage)
      }
    })
  }


}