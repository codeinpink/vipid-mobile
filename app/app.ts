//<reference path="../../typings/cordova/cordova.d.ts" />
///<reference path="../typings/globals/phonegap-nfc/index.d.ts" />

import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav, LoadingController, App} from 'ionic-angular';
import { Http, RequestOptions, XHRBackend } from '@angular/http';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {MyProfileEditPage} from './pages/my-profile-edit/my-profile-edit';
import {ContactListPage} from './pages/contact-list/contact-list';
import {GroupListPage} from './pages/group-list/group-list';
import {ImportContactsMenuPage} from './pages/import-contacts-menu/import-contacts-menu';
import {ExportContactsPage} from './pages/export-contacts/export-contacts';
import {UserSettingsPage} from './pages/user-settings/user-settings'
import {HttpService} from './shared/http.service';


@Component({
  templateUrl: 'build/app.html',
  providers: [
      {
          provide: HttpService,
          useFactory: (backend: XHRBackend, options: RequestOptions, loadingCtrl: LoadingController, app: App) => {
              return new HttpService(backend, options, loadingCtrl, app);
          },
          deps: [XHRBackend, RequestOptions, LoadingController, App]
      }
  ]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = ContactListPage;
    pages: any;
    profile: any;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });

        this.profile = {component: MyProfileEditPage};

        this.pages = [
            {title: 'Contacts', component: ContactListPage },
            {title: 'Groups', component: GroupListPage},
            {title: 'Import', component: ImportContactsMenuPage},
            {title: 'Export', component: ExportContactsPage},
            {title: 'Settings', component: UserSettingsPage}
        ];
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}

ionicBootstrap(MyApp);
