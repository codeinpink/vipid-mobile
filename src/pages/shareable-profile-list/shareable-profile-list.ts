import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';
import { ShareableProfile } from '../../shared/shareable-profile.model';
import { ShareableProfileCreatePage } from '../shareable-profile-create/shareable-profile-create';
import { ShareableProfileDetailPage } from '../shareable-profile-detail/shareable-profile-detail';


@Component({
    templateUrl: 'shareable-profile-list.html',
    providers: [ShareableProfileService]
})
export class ShareableProfileListPage {
    profiles: ShareableProfile[];

    constructor(private navCtrl: NavController, private shareableProfileService: ShareableProfileService) {

    }

    onAddClick() {
        this.navCtrl.push(ShareableProfileCreatePage);
    }

    onProfileSelect(profile) {
        this.navCtrl.push(ShareableProfileDetailPage, {profile: profile});
    }

    ngOnInit() {
        this.shareableProfileService.getProfiles().subscribe(profiles => this.profiles = profiles);
    }

}
