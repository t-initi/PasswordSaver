import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public email : string = '';
  public password : string = '';
  public firstname : string = '';
  public lastname : string = '';

  constructor(public nav: NavController, public authservice: AuthServiceProvider, public storage: Storage) {
  }

  // register and go to home page
  register() {

    if(this.email && this.password){
      this.authservice.postSignup({"email" : this.email, "password" : this.password, "firstname" : this.firstname, "lastname" : this.lastname}).then((resolve) => {
        let result : any = resolve;
        let data : any = result.json();
        
        //TODO return user_id
        let userId : string = "1";
        let token = data.token;
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('userId', userId);

        this.nav.setRoot(HomePage);
      }, (error) => {

      });
      
    }


    this.nav.setRoot(HomePage);
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
