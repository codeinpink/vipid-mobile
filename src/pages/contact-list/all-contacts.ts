import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { ContactRequestService } from '../../shared/contact-request.service';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { ContactAddMenuPage } from '../contact-add-menu/contact-add-menu';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';

@Component({
    templateUrl: 'all-contacts.html'
})
export class AllContactsPage {
    contactSubscription: any;

    contacts: Contact[];
    filteredContacts: Contact[];

    refresh: any;

    constructor(private nav: NavController, private navParams: NavParams, private appCtrl: App, private nm: NotificationManager,
    private contactService: ContactService) {

    }

    resetContacts() {
        this.filteredContacts = this.contacts;
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

        this.contactSubscription = contacts.subscribe(data => {
            this.contacts = data;
            this.filteredContacts = data;
        });

        let search = this.navParams.data.search;

        search.subscribe(query => {
            if (query.trim() === '') {
                this.resetContacts();
            } else {
                this.filteredContacts = this.contacts.filter((contact) => {
                    return (contact.profile.first_name.toLowerCase().indexOf(query.toLowerCase()) > -1);
                })
            }
        });

        this.refresh = this.navParams.data.refresh;
    }

    ngOnDestroy() {
        this.contactSubscription.unsubscribe();
    }
}
