import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HomePage} from '../home/home';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
	passwordDetails: any;
	idPassword : any;
	userId: any;
  showPassword : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: Http, public serviceProvider : AuthServiceProvider ) {
  	this.idPassword = navParams.get('id');
  	this.userId = navParams.get('userId');

  	serviceProvider.postLoadPassword(this.userId, this.idPassword).then((result) => {
  		let data : any = result;
  		this.passwordDetails = data.json();
  	});
  }

  ionViewWillEnter() {
    this.idPassword = this.navParams.get('id');
    this.userId = this.navParams.get('userId');

    this.serviceProvider.postLoadPassword(this.userId, this.idPassword).then((result) => {
      let data : any = result;
      this.passwordDetails = data.json();
    });
  }

  delete(): void {
  	this.serviceProvider.postDeletePassword(this.userId, this.idPassword).then((result) => {
  		console.log('res', result);

      // Return to home page
      this.navCtrl.setRoot(HomePage, {
        'userId' : this.userId
      });
  	}, (error) => {
  		console.log('err', error);
  	});
  	
  }

  revealPassword(){
    this.showPassword = true;
    
    setTimeout(()=>{  
      this.showPassword = false;
      },3000);

  }

}
