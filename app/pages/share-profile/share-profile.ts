import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProfileService } from '../../providers/user-profile/user-profile';
import { Profile } from '../../shared/profile.model';


@Component({
    templateUrl: 'build/pages/share-profile/share-profile.html',
    providers: [UserProfileService]
})
export class ShareProfilePage {
    profile: Profile;

    constructor(private navCtrl: NavController, private userProfileService: UserProfileService) {

    }

    getProfile() {
        this.userProfileService.getProfile(1).subscribe(profile => this.profile = profile);
    }

    ngOnInit() {
        this.getProfile();
    }

}
