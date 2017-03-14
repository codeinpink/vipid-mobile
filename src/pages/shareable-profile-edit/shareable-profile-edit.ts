import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareableProfile } from '../../shared/shareable-profile.model';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';


@Component({
    templateUrl: 'shareable-profile-edit.html',
    providers: [ShareableProfileService]
})
export class ShareableProfileEditPage {
    profile: ShareableProfile;
    valid: boolean;

    constructor(private navCtrl: NavController, private navParams: NavParams, private shareableProfileService: ShareableProfileService) {

    }

    onSave() {
        if (this.valid) {
            this.shareableProfileService.updateProfile(this.profile.id, this.profile).subscribe(_ => this.navCtrl.pop());
        }
    }

    onChanged(ev) {
        this.profile = ev.data;
        this.valid = ev.valid;
    }

    onPageWillEnter() {
        this.profile = this.navParams.get('profile');
    }

}
