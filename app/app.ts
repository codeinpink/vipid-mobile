//<reference path="../../typings/cordova/cordova.d.ts" />
///<reference path="../typings/globals/phonegap-nfc/index.d.ts" />

import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {ContactListPage} from './pages/contact-list/contact-list';


declare var nfc: any;

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = ContactListPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      //nfc.addMimeTypeListener("text/json", {}, {}, {});
    });
  }
}

ionicBootstrap(MyApp);
