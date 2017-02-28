import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareableProfile } from '../../shared/shareable-profile.model';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';
import { ShareableProfileForm } from '../../components/shareable-profile-form/shareable-profile-form';
import { ShareableProfileEditPage } from '../shareable-profile-edit/shareable-profile-edit';


@Component({
    templateUrl: 'build/pages/shareable-profile-detail/shareable-profile-detail.html',
    directives: [ShareableProfileForm],
    providers: [ShareableProfileService]
})
export class ShareableProfileDetailPage {
    profile: ShareableProfile;

    constructor(private navCtrl: NavController, private navParams: NavParams, private shareableProfileService: ShareableProfileService) {

    }

    onEditClick() {
        this.navCtrl.push(ShareableProfileEditPage, {profile: this.profile });
    }

    onPageWillEnter() {
        this.profile = this.navParams.get('profile');
    }

}
