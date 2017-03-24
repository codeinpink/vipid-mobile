import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserSettings } from '../../providers/user-settings';
import { ContactPermissions } from '../../shared/contact-permissions.model';
import { ShareableProfile } from '../../shared/shareable-profile.model';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
    templateUrl: 'shareable-profile-create.html'
})
export class ShareableProfileCreatePage {
    profile: ShareableProfile;
    valid: boolean;

    constructor(private navCtrl: NavController, private settings: UserSettings, private shareableProfileService: ShareableProfileService,
    private nm: NotificationManager) {
    }

    onChanged(ev) {
        this.profile = ev.data;
        this.valid = ev.valid;
    }

    onSave() {
        if (this.valid) {
            this.shareableProfileService.createProfile(this.profile).subscribe(_ => {
                this.navCtrl.popToRoot().then(_ => this.nm.showSuccessMessage('Profile created'));
            });
        }
    }

    ngOnInit() {
        this.settings.getSettings().subscribe(settings => {
            this.profile = new ShareableProfile();
            this.profile.profile = settings;
        });
    }

}
