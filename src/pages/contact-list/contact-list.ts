import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { ContactRequestService } from '../../shared/contact-request.service';
import { Group } from '../../shared/group.model';
import { GroupService } from '../../shared/group.service';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { ContactAddMenuPage } from '../contact-add-menu/contact-add-menu';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';

/*
  Generated class for the ContactListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'contact-list.html',
    providers: [ContactService, GroupService]
})
export class ContactListPage {
    contactSubscription: any;
    refresher: any;

    listType: string;
    contacts: Contact[];
    filteredContacts: Contact[];
    groups: Group[];
    contactRequests: any;
    showSearch: Boolean;

    constructor(private nav: NavController, private contactService: ContactService, private crService: ContactRequestService,
    private groupService: GroupService, private nm: NotificationManager) {
        this.listType = 'contacts';
        this.showSearch = true;
    }

    getContacts() {
        if (this.refresher && this.contactSubscription) {
            this.contactService.getContacts(true);

        } else {
            this.contactSubscription = this.contactService.getContacts().subscribe(contacts => {
                this.contacts = contacts;
                this.filteredContacts = contacts;
                this.getContactRequests();

                if (this.refresher) {
                    this.refresher.complete();
                    this.nm.showSuccessMessage('Refreshed');
                }
            });
        }
    }

    doRefresh(refresher) {
        this.refresher = refresher;
        this.getContacts();
    }

    getGroups() {
        this.groupService.getGroups().subscribe(groups => this.groups = groups);
    }

    // Should probably change this in the future to update whenever contacts gets updated
    getContactRequests() {
        this.contactRequests = [];
        this.crService.getContactRequests().subscribe(requests => {
            requests.map(request => {
                let contact = this.contacts.find(c => {
                    let profile: any = c.profile;
                    return profile.user === request.sender;
                });

                if (contact) {
                    this.contactRequests.push({contact: contact, user: request.sender});
                }
            });
        });
    }

    onPersonAddClick() {
        this.nav.push(ContactAddMenuPage);
    }

    onContactSelect(contact: Contact) {
        this.nav.push(ContactDetailPage, {
            id: contact.id
        });
    }

    filterByGroup(id: number) {
        id = +id;

        // "All Contacts"
        if (id === -2) {
            this.filteredContacts = this.contacts;
            return;
        }

        this.groupService.getGroup(id).subscribe(group => {
            // Check for contact ids that are in the group's list of contacts
            this.filteredContacts = this.contacts.filter(contact => group.contacts.map(c => c.id).indexOf(contact.id) !== -1);
        });
    }

    filterContacts(ev: any) {
        let val = ev.target.value;

        if (val.trim() === '') {
            this.resetContacts();
        } else {
            this.filteredContacts = this.contacts.filter((contact) => {
                return (contact.profile.first_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    getAvatarData(first: string, last: string) {
        return first + ' ' + last;
    }

    toggleSearch() {
        this.showSearch = !this.showSearch;
    }

    resetContacts() {
        this.filteredContacts = this.contacts;
    }

    clearSearch() {
        this.resetContacts();
        this.toggleSearch();
    }

    ngOnInit() {
        this.getContacts();
        this.getGroups();
    }
}
