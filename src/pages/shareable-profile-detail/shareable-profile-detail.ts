import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { ShareableProfile } from '../../shared/shareable-profile.model';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';
import { ShareableProfileEditPage } from '../shareable-profile-edit/shareable-profile-edit';
import { PopoverPage } from './popover';


@Component({
    templateUrl: 'shareable-profile-detail.html'
})
export class ShareableProfileDetailPage {
    profileSubscription: any;
    profile: ShareableProfile;

    constructor(private navCtrl: NavController, private navParams: NavParams, private shareableProfileService: ShareableProfileService, private popoverCtrl: PopoverController) {

    }

    getProfileLink(profile) {
        return 'http://vipidapp.com/profiles/' + profile.unique_link + '/';
    }

    onMoreClick(event) {
        let popover = this.popoverCtrl.create(PopoverPage, {profile: this.profile});
        popover.present({ev: event});
    }

    onEditClick() {
        this.navCtrl.push(ShareableProfileEditPage, {profile: this.profile});
    }

    onChanged() {}

    ngOnInit() {
        let id = +this.navParams.get('id');
        this.profileSubscription = this.shareableProfileService.getProfiles().subscribe(profiles => {
            this.profile = profiles.filter(profile => profile.id === id)[0];
        });
    }

    ngOnDestroy() {
        this.profileSubscription.unsubscribe();
    }
}
