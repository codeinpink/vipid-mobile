import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactRequest } from '../../shared/contact-request.model';
import { ContactService } from '../../shared/contact.service';
import { ContactRequestService } from '../../shared/contact-request.service';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { ContactAddMenuPage } from '../contact-add-menu/contact-add-menu';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';
import { AllContactsPage } from './all-contacts';
import { ContactRequestsPage } from './contact-requests';
import {Observable} from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/Rx';


@Component({
  templateUrl: 'contact-list.html'
})
export class ContactListPage {
    contactSubscription: any;
    contactRequestSubscription: any;

    contactList: ReplaySubject<Contact[]> = new ReplaySubject<Contact[]>(1);
    contactRequestList: ReplaySubject<ContactRequest[]> = new ReplaySubject<ContactRequest[]>(1);

    refresher: any;
    numOutstanding = 0;

    contacts: Contact[];
    filteredContacts: Contact[];
    contactRequests: any;
    filteredContactRequests: ContactRequest[];

    numContactRequests = 0;
    showSearch: Boolean;

    allContactsPage = AllContactsPage;
    contactRequestsPage = ContactRequestsPage;

    search: any;
    searchObserver: any;
    isSearching: boolean = false;

    refresh: any;
    refreshObserver: any;

    constructor(private nav: NavController, private contactService: ContactService, private crService: ContactRequestService,
    private nm: NotificationManager) {
        this.search = Observable.create(observer => {
            this.searchObserver = observer;
        });

        this.refresh = Observable.create(observer => {
            this.refreshObserver = observer;
        });
    }

    getContacts() {
        this.numOutstanding += 1;
        this.contactSubscription = this.contactService.getContacts().subscribe(contacts => {
            this.contacts = contacts.sort((a, b) => {
                if (a.profile.first_name > b.profile.first_name) {
                    return 1;
                } else if (a.profile.first_name < b.profile.first_name) {
                    return -1;
                } else {
                    return 0;
                }
            });
            this.filteredContacts = this.contacts;
            this.contactList.next(this.filteredContacts);

            this.updateRefreshStatus();
        });
    }

    getContactRequests() {
        this.numOutstanding += 1;
        this.contactRequestSubscription = this.crService.getContactRequests().subscribe(requests => {
            this.contactRequests = requests;
            this.filteredContactRequests = requests;
            this.numContactRequests = requests.length;
            this.contactRequestList.next(this.filteredContactRequests);

            this.updateRefreshStatus();
        });
    }

    getData() {
        if (this.refresher && this.contactSubscription) {
            this.contactService.getContacts(true);
            this.numOutstanding += 1;
        } else {
            this.getContacts();
        }

        if (this.refresher && this.contactRequestSubscription) {
            this.crService.getContactRequests(true);
            this.numOutstanding += 1;
        } else {
            this.getContactRequests();
        }
    }

    updateRefreshStatus() {
        this.numOutstanding -= 1;

        if (this.refresher && this.numOutstanding == 0) {
            this.refresher.complete();
            this.nm.showSuccessMessage('Refreshed');
        }
    }

    onPersonAddClick() {
        this.nav.push(ContactAddMenuPage);
    }

    resetContacts() {
        this.filteredContacts = this.contacts;
    }

    resetContactRequests() {
        this.filteredContactRequests = this.contactRequests;
    }

    filterContacts(ev: any) {
        let val = ev.target.value;
        val = val ? val: '';

        if (!val || val === '') {
            this.resetContacts();
            this.resetContactRequests();
            this.isSearching = false;
        } else {
            this.isSearching = true;

            this.filteredContacts = this.contacts.filter((contact) => {
                return (contact.profile.first_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });

            this.filteredContactRequests = this.contactRequests.filter((contact) => {
                return (contact.profile.first_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }

        this.contactList.next(this.filteredContacts);
        this.contactRequestList.next(this.filteredContactRequests);

        this.searchObserver.next(this.isSearching);
    }

    toggleSearch() {
        this.showSearch = !this.showSearch;
    }

    clearSearch() {
        this.searchObserver.next('');
        this.toggleSearch();
    }

    ngOnInit() {
        this.showSearch = false;
        console.log('ngOnInit');
        this.refresh.subscribe(refresher => {
            this.refresher = refresher;
            this.getData();
        });

        this.getData();
    }

    ngOnDestroy() {
        this.contactSubscription.unsubscribe();
        this.contactRequestSubscription.unsubscribe();
    }
}
