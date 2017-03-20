import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MyProfileEditPage } from '../pages/my-profile-edit/my-profile-edit';
import { ContactListPage } from '../pages/contact-list/contact-list';
import { GroupListPage } from '../pages/group-list/group-list';
import { ImportContactsMenuPage } from '../pages/import-contacts-menu/import-contacts-menu';
import { ExportContactsPage } from '../pages/export-contacts/export-contacts';
import { ShareableProfileListPage } from '../pages/shareable-profile-list/shareable-profile-list';
import { UserSettingsPage } from '../pages/user-settings/user-settings';
import { LoginPage } from '../pages/login/login';
import { HttpService } from '../shared/http.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

  rootPage = ContactListPage;
  pages: any;
  profile: any;

  constructor(platform: Platform, http: HttpService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    http.isUnauthenticated.subscribe(_ => {
        if (!this.nav.isTransitioning()) {
            this.nav.setRoot(LoginPage);
        }
    });

    this.profile = {component: MyProfileEditPage};

    this.pages = [
        {title: 'Contacts', component: ContactListPage },
        {title: 'Groups', component: GroupListPage},
        {title: 'Import', component: ImportContactsMenuPage},
        //{title: 'Export', component: ExportContactsPage},
        {title: 'Shareable Profiles', component: ShareableProfileListPage},
        {title: 'Settings', component: UserSettingsPage}
    ];
  }

  openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
  }
}
