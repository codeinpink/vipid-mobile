import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProfileService } from '../../providers/user-profile/user-profile';
import { ContactPermissions } from '../../shared/contact-permissions.model';
import { ShareableProfile } from '../../shared/shareable-profile.model';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';
import { ShareableProfileForm } from '../../components/shareable-profile-form/shareable-profile-form';


@Component({
    templateUrl: 'build/pages/shareable-profile-create/shareable-profile-create.html',
    directives: [ShareableProfileForm],
    providers: [UserProfileService, ShareableProfileService]
})
export class ShareableProfileCreatePage {
    profile: ShareableProfile;
    valid: boolean;

    constructor(private navCtrl: NavController, private userProfileService: UserProfileService, private shareableProfileService: ShareableProfileService) {

    }

    onChanged(ev) {
        this.profile = ev.data;
        this.valid = ev.valid;
    }

    onSave() {
        if (this.valid) {
            this.shareableProfileService.createProfile(this.profile).subscribe(_ => this.navCtrl.pop());
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
