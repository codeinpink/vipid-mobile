import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { ContactPermissionsService } from '../../providers/contact-permissions/contact-permissions';
import { Contact } from '../../shared/contact.model';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { ContactService } from '../../shared/contact.service';
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
    private cpService: ContactPermissionsService, private nm: NotificationManager, private contactService: ContactService,
    private alertCtrl: AlertController) {}

    goBack() {
        this.appCtrl.getRootNav().pop();
    }

    onSaveClick() {
        if (this.valid && this.dirty) {
            this.cpService.updateContactPermissions(this.contact.shared_permissions.id, this.permissions).subscribe(permissions => {
                this.permissions = permissions;
                this.contact.shared_permissions = permissions;
                this.nm.showSuccessMessage('Permissions updated');
            });
        }
    }

    onChanged(ev) {
        this.permissions = ev.data;
        this.valid = ev.valid;
        this.dirty = ev.dirty;
    }

    onDeleteClick() {
        let alert = this.alertCtrl.create({
            title: 'Delete Contact',
            message: 'Are you sure you want to delete this contact?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {}
                },
                {
                    text: 'Delete',
                    handler: () => {
                        this.contactService.deleteContact(this.contact).subscribe(_ => {
                            this.appCtrl.getRootNav().pop().then(_ => this.nm.showSuccessMessage('Contact deleted'));
                        });
                    }
                }
            ]
        });

        alert.present();
    }

    ngOnInit() {
        this.contact = this.navParams.data;
        this.permissions = this.contact.shared_permissions;
    }

}
