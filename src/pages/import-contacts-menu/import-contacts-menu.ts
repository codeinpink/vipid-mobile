import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Outlook } from '../../providers/oauth/outlook';
import {ImportPhoneContactsPage} from '../import-phone-contacts/import-phone-contacts';
import { ImportOutlookContactsPage } from '../import-outlook-contacts/import-outlook-contacts';
import { OAuthAccessTokenService } from '../../providers/oauth/oauth-access-token';

@Component({
    templateUrl: 'import-contacts-menu.html',
    providers: [OAuthAccessTokenService]
})
export class ImportContactsMenuPage {
    private oauth: OauthCordova = new OauthCordova();
    private outlookProvider: Outlook = new Outlook({
        clientId: "0b7b78f8-792d-4bce-8a90-fe1a346ccc45",
        appScope: ["https://graph.microsoft.com/contacts.readwrite", "https://graph.microsoft.com/user.read"],
        redirectUri: "http://localhost/callback"
    });

    constructor(private nav: NavController, private accessTokenService: OAuthAccessTokenService) {

    }

    onOutlookContactsClick() {
        if (!localStorage.getItem('outlook')) {
            this.oauth.logInVia(this.outlookProvider).then((data: any) => {
                console.log(data);
                this.accessTokenService.getOutlookToken(data.code).subscribe(key => {
                    console.log(key);
                    this.nav.push(ImportOutlookContactsPage);
                });
            }, (error) => {
                console.log(error);
                this.nav.push(ImportOutlookContactsPage);
            });
        }
    }

    onPhoneContactsClick() {
        this.nav.push(ImportPhoneContactsPage);
    }
}
