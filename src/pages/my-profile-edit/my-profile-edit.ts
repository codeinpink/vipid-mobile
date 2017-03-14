import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { UserProfileService } from '../../providers/user-profile/user-profile';
import { Profile } from '../../shared/profile.model';
import { PopoverPage } from './popover';


@Component({
    templateUrl: 'my-profile-edit.html',
    providers: [UserProfileService]
})
export class MyProfileEditPage {
    profile: Profile;
    valid: boolean;

    constructor(private navCtrl: NavController, private userProfileService: UserProfileService, private popoverCtrl: PopoverController) {

    }

    getProfile() {
        this.userProfileService.getProfile(1).subscribe(profile => this.profile = profile);
    }

    doRefresh(refresher) {
        this.userProfileService.refreshProfileData(3).subscribe(data => {
            console.log(data);
            this.profile = data;
            refresher.complete();
        });
    }

    ngOnInit() {
        this.getProfile();
    }

    onSave() {
        if (this.valid) {
            this.userProfileService.updateProfile(1, this.profile).subscribe();
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
