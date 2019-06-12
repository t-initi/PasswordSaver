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
import {TripService} from "../services/trip-service";
import {WeatherProvider} from "../services/weather";

/* pages */
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { RegisterPage } from "../pages/register/register";
import { LoginPage } from "../pages/login/login";
import { HomePage } from '../pages/home/home';
import { PasswordPage } from "../pages/password/password";
import { NotificationsPage } from "../pages/notifications/notifications";
import { SettingsPage } from '../pages/settings/settings';
import { AddPasswordPage } from '../pages/add-password/add-password';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { SignupPage } from '../pages/signup/signup';
import { SearchLocationPage } from "../pages/search-location/search-location";
import { TripDetailPage } from "../pages/trip-detail/trip-detail";
import { TripsPage } from "../pages/trips/trips";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import { CheckoutTripPage } from "../pages/checkout-trip/checkout-trip";


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    RegisterPage,
    LoginPage,
    HomePage,
    PasswordPage,
    NotificationsPage,
    SettingsPage,
    AddPasswordPage,

    ItemDetailsPage,
    ListPage,
    SignupPage,
    CheckoutTripPage,
    LocalWeatherPage,
   
    SearchLocationPage,
    TripDetailPage,
    TripsPage
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
    HelloIonicPage,
    RegisterPage,
    LoginPage,
    HomePage,
    PasswordPage,
    NotificationsPage,
    SettingsPage,
    AddPasswordPage,

    ItemDetailsPage,
    ListPage,
    SignupPage,
    CheckoutTripPage,
    LocalWeatherPage,
    SearchLocationPage,
    TripDetailPage,
    TripsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    TripService,
    ActivityService,
    TripService,
    WeatherProvider
  ]
})
export class AppModule {}
