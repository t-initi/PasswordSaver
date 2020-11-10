//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController, Loading } from 'ionic-angular';

//let apiUrl = 'http://localhost:8000/api';
let apiUrl = 'https://initi-tech.com/api';

@Injectable()
export class AuthServiceProvider {
  public loading : Loading;

  constructor(public http: Http, public alertCtrl : AlertController, public loadingCtrl: LoadingController) {
  
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
      let headers = new Headers();  
      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({ headers: headers });

      let postData = { "username": credentials.email, "password": credentials.password};

      console.log("POSTED = "+postData);
      
      this.http.post(apiUrl+'/login', postData, requestOptions).subscribe(res => {
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
      let headers = new Headers();
      
      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({ headers: headers });

      let postData = {
        "email" : credentials.email,
        "username" : credentials.email,
        "password": credentials.password,
        "firstname": credentials.firstname,
        "lastname": credentials.lastname
      };
      

      this.http.post(apiUrl+'/signup', postData, requestOptions).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });

  }

  postAddPassword(credentials, token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', "Bearer " + token);

      const requestOptions = new RequestOptions({ headers: headers });
  
      let postData = {
        "siteName": credentials.siteName,
        "sitePass": credentials.sitePass,
        "description": credentials.description
      };

      this.http.post(apiUrl+'/password/add', postData, requestOptions).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  postEditPassword(passwordId, credentials, token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', "Bearer " + token);

      const requestOptions = new RequestOptions({ headers: headers });

      let postData = {
        "siteName": credentials.siteName,
        "sitePass": credentials.sitePass,
        "description": credentials.description
      };

      
      this.http.post(apiUrl + '/password/edit/' + passwordId , postData, requestOptions).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  postDeletePassword(idPassword, token){

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', "Bearer " + token);
      const requestOptions = new RequestOptions({ headers: headers });

      this.http.post(apiUrl+'/password/delete/'+idPassword, {}, requestOptions).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  


  postLoadPasswords(token){

      return new Promise((resolve, reject) => {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + token);
        const requestOptions = new RequestOptions({ headers: headers });

        this.http.get(apiUrl+'/passwords/', requestOptions).subscribe(data => {
        console.log(data)   
          resolve(data) ;
          
        }, error => {
          console.log('error', error);
          reject(error);
        }, () =>{
         
        });
      });
    }

    postLoadPassword(idPassword, token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', "Bearer " + token);
      const requestOptions = new RequestOptions({ headers: headers });

      this.http.get(apiUrl+'/password/' + idPassword, requestOptions).subscribe(data => {
        console.log('my data: ', data);
        resolve(data) ;
      }, error => {
        console.log('error', error);
        reject(error);
      });
    });
  }

}
