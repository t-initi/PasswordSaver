import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from "../home/home";

/**
 * Generated class for the EditPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-password',
  templateUrl: 'edit-password.html',
})
export class EditPasswordPage {
  userData = {"userId" : "", "siteName" : "", "sitePass" : "", "description" : "" };
  public userId : any;
  public token : any;
  passwordId : any;
  passwordDetails: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceProvider : AuthServiceProvider) {
    this.userId = window.localStorage.getItem('userId');
    this.token = window.localStorage.getItem('token');

    this.passwordId = navParams.get('id');

    serviceProvider.postLoadPassword(this.passwordId, this.token).then((result) => {
  		let data : any = result;
      this.passwordDetails = data.json();

      this.userData.siteName = this.passwordDetails.site_name;
      this.userData.sitePass = this.passwordDetails.site_pass;
      this.userData.description = this.passwordDetails.description;
    
      
      console.log(this.passwordDetails);
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPasswordPage');
  }

  editPassword():void{
  	if(this.userData.siteName.length && this.userData.sitePass.length){
      
      let credentials = {
  			'siteName' : this.userData.siteName,
  			'sitePass' : this.userData.sitePass,
  			'description' : this.userData.description
  		};
      
  		this.serviceProvider.postEditPassword(this.passwordId, credentials, this.token).then((result) => {
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
