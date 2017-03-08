import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { UserProfileService } from '../../providers/user-profile/user-profile';
import { Profile } from '../../shared/profile.model';
import { ProfileForm } from '../../components/profile-form/profile-form';
import { PopoverPage } from './popover';
import { LinkedIn } from '../../providers/oauth/linkedin';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';

@Component({
    templateUrl: 'build/pages/my-profile-edit/my-profile-edit.html',
    directives: [ProfileForm],
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
