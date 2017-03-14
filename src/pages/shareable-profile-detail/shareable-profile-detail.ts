import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { ShareableProfile } from '../../shared/shareable-profile.model';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';
import { ShareableProfileEditPage } from '../shareable-profile-edit/shareable-profile-edit';
import { PopoverPage } from './popover';


@Component({
    templateUrl: 'shareable-profile-detail.html',
    providers: [ShareableProfileService]
})
export class ShareableProfileDetailPage {
    profile: ShareableProfile;

    constructor(private navCtrl: NavController, private navParams: NavParams, private shareableProfileService: ShareableProfileService, private popoverCtrl: PopoverController) {

    }

    getProfileLink(profile) {
        return 'http://vipidapp.com/profiles/' + profile.unique_link + '/';
    }

    onMoreClick() {
        let popover = this.popoverCtrl.create(PopoverPage, {profile: this.profile});
        popover.present();
    }

    onEditClick() {
        this.navCtrl.push(ShareableProfileEditPage, {profile: this.profile });
    }

    onPageWillEnter() {
        this.profile = this.navParams.get('profile');
    }

}
