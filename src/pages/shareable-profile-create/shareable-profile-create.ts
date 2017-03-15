import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProfileService } from '../../providers/user-profile/user-profile';
import { ContactPermissions } from '../../shared/contact-permissions.model';
import { ShareableProfile } from '../../shared/shareable-profile.model';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
    templateUrl: 'shareable-profile-create.html',
    providers: [UserProfileService, ShareableProfileService]
})
export class ShareableProfileCreatePage {
    profile: ShareableProfile;
    valid: boolean;

    constructor(private navCtrl: NavController, private userProfileService: UserProfileService, private shareableProfileService: ShareableProfileService,
    private nm: NotificationManager) {
    }

    onChanged(ev) {
        this.profile = ev.data;
        this.valid = ev.valid;
    }

    onSave() {
        if (this.valid) {
            this.shareableProfileService.createProfile(this.profile).subscribe(_ => {
                this.navCtrl.pop().then(_ => this.nm.showSuccessMessage('Profile created'));
            });
        }
    }

    ngOnInit() {
        this.userProfileService.getProfile(1).subscribe(userProfile => {
            this.profile = new ShareableProfile();
            this.profile.profile = userProfile;
            this.profile.id = -1;
        });

    }

}
