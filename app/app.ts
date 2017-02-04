//<reference path="../../typings/cordova/cordova.d.ts" />
///<reference path="../typings/globals/phonegap-nfc/index.d.ts" />

import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav} from 'ionic-angular';
import { Http, RequestOptions, XHRBackend } from '@angular/http';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {ContactListPage} from './pages/contact-list/contact-list';
import {ImportContactsMenuPage} from './pages/import-contacts-menu/import-contacts-menu';
import {ExportContactsPage} from './pages/export-contacts/export-contacts';
import { HttpService } from './shared/http.service';

declare var nfc: any;

@Component({
  templateUrl: 'build/app.html',
  providers: [
      {
          provide: Http,
          useFactory: (backend: XHRBackend, options: RequestOptions) => {
              return new HttpService(backend, options);
          },
          deps: [XHRBackend, RequestOptions]
      }
  ]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = ContactListPage;
    pages: any;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();

            //nfc.addMimeTypeListener("text/json", {}, {}, {});
        });


        this.pages = [
            {title: 'Contacts', component: ContactListPage },
            {title: 'Import', component: ImportContactsMenuPage},
            {title: 'Export', component: ExportContactsPage},
            {title: 'Settings', component: {}}
        ];
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}

ionicBootstrap(MyApp);
