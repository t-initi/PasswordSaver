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
	public userData = {"userId" : "", "siteName" : "", "sitePass" : "", "description" : "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceProvider : AuthServiceProvider) {
  	let userId = this.navParams.get('userId');
    console.log(userId);
  	this.userData.userId = userId;
    console.log(this.userData.userId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPasswordPage');
  }

  addPassword():void{
  	if(this.userData.siteName.length && this.userData.sitePass.length){
      let that = this;
      let userId = this.navParams.get('userId');
      console.log(userId);

  		this.serviceProvider.postAddPassword({
  			'idUser' : userId,
  			'siteName' : this.userData.siteName,
  			'sitePass' : this.userData.sitePass,
  			'description' : this.userData.description
  		}).then((result) => {
  			console.log('result', result);
        //console.log(this.userData.userId);
        
        console.log(userId);
        this.navCtrl.setRoot(HomePage, {
          "userId" : userId
        });
  		}, (error) => {
  			console.log('error', error);
  		});
  	
  	}else{
  		console.log("undefined params");
  	}

  }

}
