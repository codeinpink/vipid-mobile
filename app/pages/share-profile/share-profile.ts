import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProfileService } from '../../providers/user-profile/user-profile';
import { ContactPermissionsService } from '../../providers/contact-permissions/contact-permissions';
import { ContactPermissions } from '../../shared/contact-permissions.model';
import { ContactPermissionsForm } from '../../components/contact-permissions-form/contact-permissions-form';


@Component({
    templateUrl: 'build/pages/share-profile/share-profile.html',
    directives: [ContactPermissionsForm],
    providers: [UserProfileService, ContactPermissionsService]
})
export class ShareProfilePage {
    permissions: ContactPermissions;
    valid: boolean;

    constructor(private navCtrl: NavController, private userProfileService: UserProfileService,
    private contactPermissionsService: ContactPermissionsService) {

    }

    getContactPermissions() {
        this.contactPermissionsService.getContactPermissions(3).subscribe(permissions => this.permissions = permissions);
    }

    onChanged(ev) {
        this.permissions = ev.data;
        this.valid = ev.valid;
    }

    continue() {
        if (this.valid) {
            this.contactPermissionsService.updateContactPermissions(3, this.permissions).subscribe(_ => this.navCtrl.popToRoot());
        }
    }

    ngOnInit() {
        this.getContactPermissions();
    }

}
