import {Component} from "@angular/core";
import {IonicPage, NavController, PopoverController, NavParams} from "ionic-angular";
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {PasswordPage} from "../password/password";
import { AddPasswordPage } from "../add-password/add-password";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  public user = {"email" : "" , "firstname" : "", "lastname": "", "passwords" : [] };
  public token : any;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController, 
    public navParams : NavParams, public provider : AuthServiceProvider) {
    
    
  }

  ionViewWillEnter() {
    this.loadUserPasswords();
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    /*this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Rio de Janeiro, Brazil"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });*/
  }

  loadUserPasswords(){
    this.token = window.localStorage.getItem('token');
  
    this.provider.postLoadPasswords(this.token).then((result) => {
      let tmpData : any = result;
      let data  = tmpData.json();
      
      this.user.email = data.email;
      this.user.firstname = data.firstname;
      this.user.lastname = data.lastname;
      this.user.passwords = data.passwords;

      console.log("user", this.user);
    }, (error) => {
      console.log('error', error);
    })
  }

  getPasswordById(id): void{
    this.navCtrl.push(PasswordPage, {'id' : id});
  }
  // Go to Add Password
  goToAddPassword() : void{
    this.navCtrl.push(AddPasswordPage);
  }

  // to go account page
  goToAccount() {
    this.navCtrl.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}

//
