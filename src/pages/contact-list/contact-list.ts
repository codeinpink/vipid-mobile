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


@Component({
  templateUrl: 'contact-list.html'
})
export class ContactListPage {
    contactSubscription: any;
    contactRequestSubscription: any;

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
        if (this.refresher && this.contactSubscription) {
            this.contactService.getContacts(true);
            this.numOutstanding += 1;
        } else {
            this.numOutstanding += 1;
            this.contactSubscription = this.contactService.getContacts().subscribe(contacts => {
                this.contacts = contacts;
                this.filteredContacts = contacts;

                this.numOutstanding -= 1;
                console.log(this.numOutstanding);
                if (this.refresher && this.numOutstanding == 0) {
                    this.refresher.complete();
                    this.nm.showSuccessMessage('Refreshed');
                }
            });
        }

        if (this.refresher && this.contactRequestSubscription) {
            this.crService.getContactRequests(true);
            this.numOutstanding += 1;
        } else {
            this.numOutstanding += 1;
            this.contactRequestSubscription = this.crService.getContactRequests().subscribe(requests => {
                this.contactRequests = requests;
                this.filteredContactRequests = requests;
                this.numContactRequests = this.contactRequests.length;

                this.numOutstanding -= 1;
                console.log(this.numOutstanding);
                if (this.refresher && this.numOutstanding == 0) {
                    this.refresher.complete();
                    this.nm.showSuccessMessage('Refreshed');
                }
            });
        }
    }

    getContactRequests() {
        this.contactRequestSubscription = this.crService.getContactRequests().subscribe(requests => {
            this.contactRequests = requests;
            this.numContactRequests = this.contactRequests.length;
        });
    }

    onPersonAddClick() {
        this.nav.push(ContactAddMenuPage);
    }

    filterContacts(ev: any) {
        let val = ev.target.value;
        this.searchObserver.next(val);
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
            this.getContacts();
            console.log('i should refresh');
        });

        this.getContacts();
    }
}
