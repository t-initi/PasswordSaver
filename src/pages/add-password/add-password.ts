import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-add-password',
  templateUrl: 'add-password.html',
})
export class AddPasswordPage {
  userData = {"userId" : "", "siteName" : "", "sitePass" : "", "description" : "" };
  public userId : any;
  public token : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceProvider : AuthServiceProvider) {

    this.userId = window.localStorage.getItem('userId');
    this.token = window.localStorage.getItem('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPasswordPage');
  }

  addPassword():void{
  	if(this.userData.siteName.length && this.userData.sitePass.length){
      
      let credentials = {
  			'idUser' : this.userId,
  			'siteName' : this.userData.siteName,
  			'sitePass' : this.userData.sitePass,
  			'description' : this.userData.description
  		};
      
  		this.serviceProvider.postAddPassword(credentials, this.token).then((result) => {
  			console.log('postAddPassword', result);
        this.navCtrl.setRoot(HomePage);
  		}, (error) => {
  			console.log('error', error);
  		});
  	
  	}else{
  		console.log("undefined params");
  	}

  }

  goBack() : void {
    this.navCtrl.setRoot(HomePage);
  }

}
