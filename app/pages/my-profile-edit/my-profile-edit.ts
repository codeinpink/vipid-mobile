import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProfileService } from '../../providers/user-profile/user-profile';
import { Profile } from '../../shared/profile.model';
import { ProfileForm } from '../../components/profile-form/profile-form';

@Component({
    templateUrl: 'build/pages/my-profile-edit/my-profile-edit.html',
    directives: [ProfileForm],
    providers: [UserProfileService]
})
export class MyProfileEditPage {
    profile: Profile;
    valid: boolean;

    constructor(private navCtrl: NavController, private userProfileService: UserProfileService) {

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

    onChanged(ev) {
        this.profile = ev.data;
        this.valid = ev.valid;
    }

}
