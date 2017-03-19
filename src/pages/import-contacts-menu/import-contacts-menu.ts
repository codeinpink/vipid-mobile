import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ImportPhoneContactsPage} from '../import-phone-contacts/import-phone-contacts';
import { ImportOutlookContactsPage } from '../import-outlook-contacts/import-outlook-contacts';
import { OAuthAccessTokenService } from '../../providers/oauth/oauth-access-token';

@Component({
    templateUrl: 'import-contacts-menu.html'
})
export class ImportContactsMenuPage {

    constructor(private nav: NavController, private accessTokenService: OAuthAccessTokenService) {

    }

    onOutlookContactsClick() {
        if (this.accessTokenService.isLoggedInWithOutlook()) {
            this.nav.push(ImportOutlookContactsPage);
        } else {
            this.accessTokenService.loginWithOutlook().then(token => {
                this.nav.push(ImportOutlookContactsPage);
            });
        }
    }

    onPhoneContactsClick() {
        this.nav.push(ImportPhoneContactsPage);
    }
}
