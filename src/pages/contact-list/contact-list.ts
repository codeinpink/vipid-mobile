import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
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
    refresher: any;

    listType: string;
    contacts: Contact[];
    filteredContacts: Contact[];
    contactRequests: any;
    showSearch: Boolean;

    allContactsPage = AllContactsPage;
    contactRequestsPage = ContactRequestsPage;

    search: any;
    searchObserver: any;

    constructor(private nav: NavController, private contactService: ContactService, private crService: ContactRequestService,
    private nm: NotificationManager) {
        this.search = Observable.create(observer => {
            this.searchObserver = observer;
        });
    }

    doRefresh(refresher) {
        this.refresher = refresher;
        this.getContactRequests();
    }

    // Should probably change this in the future to update whenever contacts gets updated
    getContactRequests() {
        //this.contactRequests = [];
        this.crService.getContactRequests().subscribe(requests => {
            this.contactRequests = requests;
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

    ionViewDidEnter() {
        console.log('entered contact list');
    }

    ngOnInit() {
        this.showSearch = false;
        console.log('ngOnInit');
        this.getContactRequests();
    }
}
