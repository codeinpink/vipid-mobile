import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareableProfile } from '../../shared/shareable-profile.model';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
    templateUrl: 'shareable-profile-edit.html',
    providers: [ShareableProfileService]
})
export class ShareableProfileEditPage {
    profile: ShareableProfile;
    valid: boolean;

    constructor(private navCtrl: NavController, private navParams: NavParams, private shareableProfileService: ShareableProfileService,
    private nm: NotificationManager) {

    }

    onSave() {
        if (this.valid) {
            this.shareableProfileService.updateProfile(this.profile.id, this.profile).subscribe(_ => {
                this.navCtrl.pop().then(_ => this.nm.showSuccessMessage('Profile updated'));
            });
        }
    }

    onChanged(ev) {
        this.profile = ev.data;
        this.valid = ev.valid;
    }

    ngOnInit() {
        this.profile = this.navParams.get('profile');
    }

}
