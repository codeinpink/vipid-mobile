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
    refresher: any;

    contacts: Contact[];
    filteredContacts: Contact[];

    constructor(private nav: NavController, private navParams: NavParams, private appCtrl: App, private nm: NotificationManager,
    private contactService: ContactService) {

    }

    getContacts() {
        if (this.refresher && this.contactSubscription) {
            this.contactService.getContacts(true);

        } else {
            this.contactSubscription = this.contactService.getContacts().subscribe(contacts => {
                this.contacts = contacts;
                this.filteredContacts = contacts;

                if (this.refresher) {
                    this.refresher.complete();
                    this.nm.showSuccessMessage('Refreshed');
                }
            });
        }
    }

    resetContacts() {
        this.filteredContacts = this.contacts;
    }

    doRefresh(refresher) {
        this.refresher = refresher;
        this.getContacts();
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
        let search = this.navParams.data;

        search.subscribe(query => {
            if (query.trim() === '') {
                this.resetContacts();
            } else {
                this.filteredContacts = this.contacts.filter((contact) => {
                    return (contact.profile.first_name.toLowerCase().indexOf(query.toLowerCase()) > -1);
                })
            }
        });

        this.getContacts();
    }

    ngOnDestroy() {
        this.contactSubscription.unsubscribe();
    }
}
