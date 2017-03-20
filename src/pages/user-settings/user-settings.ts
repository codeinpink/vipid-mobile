import { Component, OnInit } from '@angular/core'
import { NavController, AlertController } from 'ionic-angular';
import { OAuthAccessTokenService } from '../../providers/oauth/oauth-access-token';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';
import { UserSettings } from '../../providers/user-settings';
import { AccountInformationPage } from './account-information/account-information';
import { ChangePasswordPage } from './change-password/change-password';


@Component({
    templateUrl: 'user-settings.html'
})
export class UserSettingsPage implements OnInit {
    isLoggedInWithLinkedIn: boolean;

    constructor(private nav: NavController, private alertCtrl: AlertController, private accessTokenService: OAuthAccessTokenService,
    private nm: NotificationManager, private settings: UserSettings){}

    onAccountInformationClick() {
        this.nav.push(AccountInformationPage);
    }

    onChangePasswordClick() {
        this.nav.push(ChangePasswordPage);
    }

    onLinkedInClick() {
        if (!this.isLoggedInWithLinkedIn) {
            let alert = this.alertCtrl.create({
                title: 'Connect Your LinkedIn Account',
                message: 'Connect your LinkedIn account to automatically keep your profile up-to-date with your latest information!',
                buttons: [
                    {
                        text: 'Cancel',
                        handler: () => {}
                    },
                    {
                        text: 'Connect LinkedIn',
                        handler: () => {
                            this.accessTokenService.loginWithLinkedIn().then(_ => {
                                this.nm.showSuccessMessage('LinkedIn connected')
                            });
                        }
                    }
                ]
            });

            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: 'LinkedIn Connected',
                subTitle: 'Your account is synced to your LinkedIn account, meaning your profile is automatically updated!',
                buttons: ['COOL']
            });

            alert.present();
        }
    }

    ngOnInit(){
        this.isLoggedInWithLinkedIn = this.settings.isLinkedInConnected();
    }
}
