import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Http } from '@angular/http';
import { HomePage} from '../home/home';
import { EditPasswordPage} from '../edit-password/edit-password';
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
  token : any;
  showPassword : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: Http, public serviceProvider : AuthServiceProvider ) {
  	this.idPassword = navParams.get('id');
    this.userId = window.localStorage.getItem('userId');
    this.token = window.localStorage.getItem('token');

  	serviceProvider.postLoadPassword(this.idPassword, this.token).then((result) => {
  		let data : any = result;
  		this.passwordDetails = data.json();
  	});
  }

  ionViewWillEnter() {
    this.idPassword = this.navParams.get('id');
    this.serviceProvider.postLoadPassword(this.idPassword, this.token).then((result) => {
      let data : any = result;
      this.passwordDetails = data.json();
    });
  }

  delete(): void {
  	this.serviceProvider.postDeletePassword(this.idPassword, this.token).then((result) => {
  		console.log('res', result);

      // Return to home page
      this.navCtrl.setRoot(HomePage);
  	}, (error) => {
  		console.log('err', error);
  	});
  	
  }

  edit(): void{

  }

  getToEditPasswordPage(): void{
    this.navCtrl.push(EditPasswordPage, {'id' : this.idPassword });
  }

  revealPassword(){
    this.showPassword = true;
    
    setTimeout(()=>{  
      this.showPassword = false;
      },3000);

  }

}
