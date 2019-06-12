import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController, Loading } from 'ionic-angular';



let loginUrl = 'http://127.0.0.1:8000/api/login';
let signupUrl = 'http://127.0.0.1:8000/api/signup';
let apiUrl = 'http://127.0.0.1:8000/api';

@Injectable()
export class AuthServiceProvider {
  public loading : Loading;

  constructor(public http: Http, public alertCtrl : AlertController, public loadingCtrl: LoadingController) {
    console.log('Hello AuthServiceProvider Provider');
  }

  /*showAlert() {
    const alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }*/

  presentLoadingDefault() {
  this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  this.loading.present();
  }

  dismissLoading(){
    this.loading.dismiss();
  }

  postLogin(credentials){
  	return new Promise((resolve, reject) => {
  		let headers = new Headers({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin" : "*" });
  		let postData = new FormData();
  		postData.append("email", credentials.email);
  		postData.append("password", credentials.password);

  		this.http.post(apiUrl+'/login', postData).subscribe(res => {
        this.presentLoadingDefault();
  			resolve(res);
  		}, (err) => {
  			reject(err);
  		}, () => {
        this.dismissLoading();
      });

  	});
  }

  postSignup(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin" : "*" });
      let postData = new FormData();
      postData.append("email", credentials.email);
      postData.append("password", credentials.password);
      postData.append("firstname", credentials.firstname);
      postData.append("lastname", credentials.lastname);

      this.http.post(apiUrl+'/signup', postData).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });

  }

  postAddPassword(credentials){
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin" : "*" });
      let postData = new FormData();
      postData.append("idUser", credentials.idUser);
      postData.append("siteName", credentials.siteName);
      postData.append("sitePass", credentials.sitePass);
      postData.append("description", credentials.description);

      this.http.post(apiUrl+'/password/add', postData).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  postDeletePassword(idUser, idPassword){

    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin" : "*" });

      this.http.post(apiUrl+'/password/delete/'+idUser+'/'+idPassword, null).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  postEditPassword(credentials){
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin" : "*" });
      let postData = new FormData();
      postData.append("idUser", credentials.idUser);
      postData.append("siteName", credentials.siteName);
      postData.append("sitePass", credentials.sitePass);
      postData.append("idPassword", credentials.sitePass);
      postData.append("description", credentials.description);

      this.http.post(apiUrl+'/password/edit', postData).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  postLoadPasswords(idUser){

      return new Promise((resolve, reject) => {
        let postData = new FormData();

        this.http.post(apiUrl+'/passwords/'+idUser, postData).subscribe(data => {
        console.log(data)   
          resolve(data) ;
          
        }, error => {
          console.log('error', error);
          reject(error);
        }, () =>{
         
        });
      });
    }

    postLoadPassword(idUser, idPassword){
    return new Promise((resolve, reject) => {
      let postData = new FormData();
      postData.append("idUser", idUser);
      postData.append("idPassword", idPassword);

      this.http.post(apiUrl+'/password',postData).subscribe(data => {
        console.log('my data: ', data);
        resolve(data) ;
      }, error => {
        console.log('error', error);
        reject(error);
      });
    });
  }

}
