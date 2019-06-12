import {Component} from "@angular/core";
import {IonicPage, NavController, PopoverController, NavParams} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";
import {PasswordPage} from "../password/password";
import { AddPasswordPage } from "../add-password/add-password";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }
  public user = { "id" : "", "email" : "" , "firstname" : "", "lastname": "", "passwords" : [] };
  public userId : any;

  constructor(
    private storage: Storage, 
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController, 
    public navParams : NavParams, public provider : AuthServiceProvider) {
    this.userId = this.navParams.get("userId");
    console.log('userid A', this.userId);
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
    console.log('userId', this.userId);
    this.provider.postLoadPasswords(this.userId).then((result) => {

      let tmpData : any = result;
      let data  = tmpData.json();
      
      this.user.email = data.email;
      this.user.id = data.id;
      this.user.firstname = data.firstname;
      this.user.lastname = data.lastname;
      this.user.passwords = data.passwords;
    }, (error) => {
      console.log('error', error);
    })
  }

  getPasswordById(id): void{
    this.navCtrl.push(PasswordPage, {
      'id' : id,
      'userId' : this.user.id
    });
  }
  // Go to Add Password
  goToAddPassword() : void{
    this.navCtrl.setRoot(AddPasswordPage,  {
      'userId' : this.user.id
    });
  }

  // go to result page
  doSearch() {
    this.navCtrl.push(TripsPage);
  }

  // choose place
  choosePlace(from) {
    this.navCtrl.push(SearchLocationPage, from);
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
