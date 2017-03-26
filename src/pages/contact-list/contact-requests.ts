import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactRequest } from '../../shared/contact-request.model';
import { ContactService } from '../../shared/contact.service';
import { ContactRequestService } from '../../shared/contact-request.service';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { ContactAddMenuPage } from '../contact-add-menu/contact-add-menu';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';

@Component({
    templateUrl: 'contact-requests.html'
})
export class ContactRequestsPage {
    contactRequests: Contact[];
    filteredContacts: Contact[];

    refresh: any;

    constructor(private nav: NavController, private navParams: NavParams, private appCtrl: App, private nm: NotificationManager,
    private alertCtrl: AlertController, private crService: ContactRequestService) {

    }

    doRefresh(refresher) {
        //this.refresher = refresher;
        this.refresh.next(refresher);
    }

    onRequestDelete(contact: ContactRequest) {
        let alert = this.alertCtrl.create({
            title: 'Delete Contact',
            message: 'Are you sure you want to delete this contact request?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {}
                },
                {
                    text: 'Delete',
                    handler: () => {
                        this.crService.delete(contact).subscribe(_ => {
                            this.nm.showSuccessMessage('Contact request deleted');
                        });
                    }
                }
            ]
        });

        alert.present();
    }

    onRequestAccept(contact: ContactRequest) {
        this.crService.accept({receiver: contact.sender}).subscribe(_ => {
            this.nm.showSuccessMessage('Contact request accepted');
        });
    }

    trackContact(index, contact) {
        return contact.id;
    }

    getAvatarData(first: string, last: string) {
        return first + ' ' + last;
    }

    ngOnInit() {
        console.log(this.navParams.data);
        this.contactRequests = this.navParams.data.requests;
        this.refresh = this.navParams.data.refresh;

        console.log(this.contactRequests);
        this.filteredContacts = this.contactRequests;
    }
}
