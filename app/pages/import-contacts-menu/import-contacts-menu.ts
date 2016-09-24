import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ImportPhoneContactsPage} from '../import-phone-contacts/import-phone-contacts';

@Component({
    templateUrl: 'build/pages/import-contacts-menu/import-contacts-menu.html',
})
export class ImportContactsMenuPage {
    constructor(private nav: NavController) {

    }

    onPhoneContactsClick() {
        this.nav.push(ImportPhoneContactsPage);
    }
}
