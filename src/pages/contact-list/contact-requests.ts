import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
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

    constructor(private nav: NavController, private navParams: NavParams, private appCtrl: App, private nm: NotificationManager) {

    }

    onContactSelect(contact: Contact) {

    }

    trackContact(index, contact) {
        return contact.id;
    }

    getAvatarData(first: string, last: string) {
        return first + ' ' + last;
    }

    ngOnInit() {
        this.contactRequests = this.navParams.data;
        console.log(this.contactRequests);
        this.filteredContacts = this.contactRequests;
    }
}
