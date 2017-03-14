import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProfileService } from '../../providers/user-profile/user-profile';
import { ContactPermissionsService } from '../../providers/contact-permissions/contact-permissions';
import { ContactPermissions } from '../../shared/contact-permissions.model';
import { ContactService } from '../../shared/contact.service';


@Component({
    templateUrl: 'share-profile.html',
    providers: [UserProfileService, ContactPermissionsService, ContactService]
})
export class ShareProfilePage {
    isCreating: boolean = false;
    permissions: ContactPermissions;
    referral: string;
    valid: boolean;

    constructor(private navCtrl: NavController, private userProfileService: UserProfileService,
    private contactPermissionsService: ContactPermissionsService, private navParams: NavParams,
    private contactService: ContactService) {

    }

    getContactPermissions() {
        this.contactPermissionsService.getContactPermissions(3).subscribe(permissions => this.permissions = permissions);
    }

    onChanged(ev) {
        this.permissions = ev.data;
        this.valid = ev.valid;
    }

    continue() {
        console.log(this.valid);
        if (this.valid && this.isCreating) {
            let data: any = this.permissions;
            data.referral = this.referral;
            this.contactService.addContact(data).subscribe(_ => this.navCtrl.popToRoot());
        } else if (this.valid && !this.isCreating) {
            this.contactPermissionsService.updateContactPermissions(3, this.permissions).subscribe(_ => this.navCtrl.popToRoot());
        }
    }

    ngOnInit() {
        console.log('bye');
        if (this.navParams.data.isCreating) {
            this.userProfileService.getProfile(1).subscribe(profile => {
                this.permissions = new ContactPermissions();
                this.permissions.profile = profile;
                this.isCreating = true;
                this.referral = this.navParams.data.referral;
            }, errors => {
                console.log(errors);
            });
        } else {
            this.getContactPermissions();
        }
    }

}
