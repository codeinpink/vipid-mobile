import { Component } from '@angular/core';
import { App, PopoverController, ViewController } from 'ionic-angular';
import { ShareableProfileListPage } from '../shareable-profile-list/shareable-profile-list';
import { LinkedIn } from '../../providers/oauth/linkedin';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { OAuthAccessTokenService } from '../../providers/oauth/oauth-access-token';
import { UserProfileService } from '../../providers/user-profile/user-profile';
import 'rxjs/add/operator/finally';


@Component({
    template: `
        <ion-list>
            <button ion-item (click)="refresh()">Refresh</button>
            <button ion-item (click)="connectLinkedIn()">Connect LinkedIn</button>
            <button ion-item (click)="openShareableProfilesList()">Shareable Profiles</button>
        </ion-list>
    `,
    providers: [OAuthAccessTokenService, UserProfileService]
})
export class PopoverPage {
    private oauth: OauthCordova = new OauthCordova();
    private linkedinProvider: LinkedIn = new LinkedIn({
        clientId: "78701vytcosrbk",
        appScope: ["r_basicprofile"],
        redirectUri: "http://localhost/callback",
        state: "aaaaaaaaaaaaa"
    });

    constructor(public viewCtrl: ViewController, private appCtrl: App, private accessTokenService: OAuthAccessTokenService, private userProfileService: UserProfileService) {}

    refresh() {
        // TODO: figure out why this doesn't close the popover and why the popover's closing
        // causes the page behind it to no longer function
        this.userProfileService.refreshProfileData(3).finally(() => this.close()).subscribe(data => {
            console.log(data);
        });
    }

    connectLinkedIn() {
        this.oauth.logInVia(this.linkedinProvider).then((success) => {
            console.log(success);
            if (success['state'] != this.linkedinProvider.state) {
                // maybe log out?
                //return;
            }

            this.accessTokenService.getLinkedInToken(success['code'], success['state']).subscribe(key => {
                console.log(key);
            });
        }, (error) => {
            console.log(error);
        });
    }

    openShareableProfilesList() {
        this.appCtrl.getRootNav().push(ShareableProfileListPage).then(_ => this.close());
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
