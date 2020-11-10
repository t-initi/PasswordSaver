import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

/*import {SettingsPage} from "../pages/settings/settings";*/
import {ActivityService} from "../services/activity-service";

/* pages */
import { RegisterPage } from "../pages/register/register";
import { LoginPage } from "../pages/login/login";
import { HomePage } from '../pages/home/home';
import { PasswordPage } from "../pages/password/password";
import { NotificationsPage } from "../pages/notifications/notifications";
import { SettingsPage } from '../pages/settings/settings';
import { AddPasswordPage } from '../pages/add-password/add-password';
import { EditPasswordPage } from '../pages/edit-password/edit-password';


@NgModule({
  declarations: [
    MyApp,
    RegisterPage,
    LoginPage,
    HomePage,
    PasswordPage,
    NotificationsPage,
    SettingsPage,
    AddPasswordPage,
    EditPasswordPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    LoginPage,
    HomePage,
    PasswordPage,
    NotificationsPage,
    SettingsPage,
    AddPasswordPage,
    EditPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ActivityService,
  ]
})
export class AppModule {}
