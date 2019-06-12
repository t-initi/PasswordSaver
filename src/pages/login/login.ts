import {Component} from "@angular/core";
import {IonicPage, NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public email : string = "tiescoboss@inity.com";
  public password : string = "1234567";

  constructor(public nav: NavController, public forgotCtrl: AlertController, 
    public menu: MenuController, 
    public toastCtrl: ToastController,
    public authservice: AuthServiceProvider,
    private storage: Storage) {
    this.menu.swipeEnable(false);
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {

    if(this.email && this.password){
      this.authservice.postLogin({"email" : this.email, "password" : this.password}).then((resolve) => {
        let result : any = resolve;
        let data : any = result.json();
        this.storage.set("userId", data.id);
        this.nav.setRoot(HomePage, {
          'userId' : data.id
        });
      }, (error) => {

      });
      
    }
  }

  signup() {
    this.nav.setRoot(RegisterPage)
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
