import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import  {MyProfileEditPage } from '../pages/my-profile-edit/my-profile-edit';
import { ContactListPage } from '../pages/contact-list/contact-list';
import { GroupListPage } from '../pages/group-list/group-list';
import { ImportContactsMenuPage } from '../pages/import-contacts-menu/import-contacts-menu';
import { ExportContactsPage } from '../pages/export-contacts/export-contacts';
import { UserSettingsPage } from '../pages/user-settings/user-settings';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

  rootPage = ContactListPage;
  pages: any;
  profile: any;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
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
