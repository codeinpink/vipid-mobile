import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactCreatePage } from '../contact-create/contact-create';
import { UserFindPage } from '../user-find/user-find';
import { NfcAddPage } from '../nfc-add/nfc-add';

/*
  Generated class for the ContactAddMenuPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/contact-add-menu/contact-add-menu.html',
})
export class ContactAddMenuPage {
    constructor(private nav: NavController) {}

    onFindContactClick() {
        this.nav.push(UserFindPage);
    }

    onCreateContactClick() {
        this.nav.push(ContactCreatePage);
    }

    onNFCAddClick() {
        this.nav.push(NfcAddPage);
    }
}
