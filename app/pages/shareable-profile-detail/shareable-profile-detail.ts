import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { ShareableProfile } from '../../shared/shareable-profile.model';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';
import { ShareableProfileForm } from '../../components/shareable-profile-form/shareable-profile-form';
import { ShareableProfileEditPage } from '../shareable-profile-edit/shareable-profile-edit';
import { PopoverPage } from './popover';
import { QRCodeComponent } from 'angular2-qrcode';


@Component({
    templateUrl: 'build/pages/shareable-profile-detail/shareable-profile-detail.html',
    directives: [ShareableProfileForm, QRCodeComponent],
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
