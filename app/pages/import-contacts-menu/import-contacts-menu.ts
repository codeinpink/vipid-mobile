import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ImportPhoneContactsPage} from '../import-phone-contacts/import-phone-contacts';

@Component({
    templateUrl: 'build/pages/import-contacts-menu/import-contacts-menu.html',
})
export class ImportContactsMenuPage {
    pages: any;

    constructor(private nav: NavController) {

    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    onPhoneContactsClick() {
        this.nav.push(ImportPhoneContactsPage);
    }
}
