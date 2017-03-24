import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';
import { ShareableProfile } from '../../shared/shareable-profile.model';
import { ShareableProfileCreatePage } from '../shareable-profile-create/shareable-profile-create';
import { ShareableProfileDetailPage } from '../shareable-profile-detail/shareable-profile-detail';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
    templateUrl: 'shareable-profile-list.html'
})
export class ShareableProfileListPage {
    profileSubscription: any;
    refresher: any;

    profiles: ShareableProfile[];

    constructor(private navCtrl: NavController, private shareableProfileService: ShareableProfileService, private nm: NotificationManager) {

    }

    getProfiles() {
        if (this.refresher && this.profileSubscription) {
            this.shareableProfileService.getProfiles(true);

        } else {
            this.profileSubscription = this.shareableProfileService.getProfiles().subscribe(profiles => {
                this.profiles = profiles;

                if (this.refresher) {
                    this.refresher.complete();
                    this.nm.showSuccessMessage('Refreshed');
                }
            });
        }
    }
    doRefresh(refresher) {
        this.refresher = refresher;
        this.getProfiles();
    }

    onAddClick() {
        this.navCtrl.push(ShareableProfileCreatePage);
    }

    onProfileSelect(profile) {
        this.navCtrl.push(ShareableProfileDetailPage, {id: profile.id});
    }

    ngOnInit() {
        this.getProfiles();
    }

}
