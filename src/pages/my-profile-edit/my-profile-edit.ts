import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { UserSettings } from '../../providers/user-settings';
import { Profile } from '../../shared/profile.model';
import { PopoverPage } from './popover';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
    templateUrl: 'my-profile-edit.html'
})
export class MyProfileEditPage {
    profile: Profile;
    valid: boolean;

    constructor(private navCtrl: NavController, private settings: UserSettings, private popoverCtrl: PopoverController,
    private nm: NotificationManager) {

    }

    getProfile() {
        this.settings.getSettings().subscribe(profile => this.profile = profile);
    }

    doRefresh(refresher) {
        /*
        this.userProfileService.refreshProfileData(8).subscribe(data => {
            console.log(data);
            this.profile = data;
            refresher.complete();
        });
        */
    }

    ngOnInit() {
        this.getProfile();
    }

    onSave() {
        if (this.valid) {
            this.settings.updateSettings(this.profile).subscribe(_ => {
                this.nm.showSuccessMessage('Profile updated');
            });
        }
    }

    onMoreClick() {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present();
    }

    onChanged(ev) {
        this.profile = ev.data;
        this.valid = ev.valid;
    }

}
