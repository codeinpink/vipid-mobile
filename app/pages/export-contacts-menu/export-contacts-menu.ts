import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ExportContactsToPhonePage} from '../export-contacts-to-phone/export-contacts-to-phone';


@Component({
    templateUrl: 'build/pages/export-contacts-menu/export-contacts-menu.html',
})
export class ExportContactsMenuPage {
    constructor(private nav: NavController) {}

    onPhoneContactsClick() {
        this.nav.push(ExportContactsToPhonePage);
    }
}
