import { Component } from '@angular/core';
import { App, PopoverController, ViewController } from 'ionic-angular';
import { ShareableProfileListPage } from '../shareable-profile-list/shareable-profile-list';
import { LinkedIn } from '../../providers/oauth/linkedin';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { OAuthAccessTokenService } from '../../providers/oauth/oauth-access-token';


@Component({
    template: `
        <ion-list>
            <button ion-item (click)="openShareableProfilesList()">Shareable Profiles</button>
        </ion-list>
    `,
    providers: [OAuthAccessTokenService]
})
export class PopoverPage {
    private oauth: OauthCordova = new OauthCordova();
    private linkedinProvider: LinkedIn = new LinkedIn({
        clientId: "78701vytcosrbk",
        appScope: ["r_emailaddress", "r_basicprofile"],
        redirectUri: "http://localhost/callback",
        state: "aaaaaaaaaaaaa"
    });

    constructor(public viewCtrl: ViewController, private appCtrl: App, private accessTokenService: OAuthAccessTokenService) {}

    openShareableProfilesList() {
        this.appCtrl.getRootNav().push(ShareableProfileListPage).then(_ => this.close());
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
