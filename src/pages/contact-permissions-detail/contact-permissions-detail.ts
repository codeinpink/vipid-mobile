import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { ContactPermissionsService } from '../../providers/contact-permissions/contact-permissions';
import { Contact } from '../../shared/contact.model';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
    selector: 'page-contact-permissions-detail',
    templateUrl: 'contact-permissions-detail.html'
})
export class ContactPermissionsDetailPage {
    contact: Contact;
    permissions: any;
    valid: boolean = true;
    dirty: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private appCtrl: App,
    private cpService: ContactPermissionsService, private nm: NotificationManager) {}

    goBack() {
        this.appCtrl.getRootNav().pop();
    }

    onSaveClick() {
        if (this.valid && this.dirty) {
            this.cpService.updateContactPermissions(this.contact.profile.id, this.permissions).subscribe(permissions => {
                this.permissions = permissions;
                this.nm.showSuccessMessage('Permissions updated');
            });
        }
    }

    onChanged(ev) {
        this.permissions = ev.data;
        this.valid = ev.valid;
        this.dirty = ev.dirty;
    }

    ngOnInit() {
        this.contact = this.navParams.data;
        this.cpService.getContactPermissions(this.contact.profile.id).subscribe(permissions => {
            this.permissions = permissions;
        });
    }

}
