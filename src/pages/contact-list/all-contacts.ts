import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { ContactRequestService } from '../../shared/contact-request.service';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';

@Component({
    templateUrl: 'all-contacts.html'
})
export class AllContactsPage {
    contactSubscription: any;

    contacts: Contact[];
    filteredContacts: Contact[];

    refresh: any;

    isSearching = false;

    constructor(private nav: NavController, private navParams: NavParams, private appCtrl: App, private nm: NotificationManager,
    private contactService: ContactService) {

    }

    doRefresh(refresher) {
        this.refresh.next(refresher);
    }

    onContactSelect(contact: Contact) {
        console.log('contact selected');
        this.appCtrl.getRootNav().push(ContactDetailPage, {
            id: contact.id
        });
    }

    trackContact(index, contact) {
        return contact.id;
    }

    getAvatarData(first: string, last: string) {
        return first + ' ' + last;
    }

    ngOnInit() {
        let contacts = this.navParams.data.contacts;

        this.contactSubscription = contacts.subscribe(filtered => {
            this.filteredContacts = filtered;
        });

        let search = this.navParams.data.search;

        search.subscribe(isSearching => {
            this.isSearching = isSearching;
        });

        this.refresh = this.navParams.data.refresh;
    }

    ngOnDestroy() {
        this.contactSubscription.unsubscribe();
    }
}
