import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { ContactService } from '../../shared/contact.service';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
    templateUrl: 'contact-profile-detail.html',
})
export class ContactProfileDetailPage {
    contact: Contact;

    constructor(private navCtrl: NavController, private navParams: NavParams, private appCtrl: App, private alertCtrl: AlertController,
    private contactService: ContactService, private nm: NotificationManager) {

    }

    goBack() {
        this.appCtrl.getRootNav().pop();
    }

    onEditClick() {
        this.appCtrl.getRootNav().push(ContactEditPage, {
            id: this.contact.id,
            editingProfile: true
        });
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
    }

}
