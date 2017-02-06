import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { Group } from '../../shared/group.model';
import { GroupService } from '../../shared/group.service';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { ContactAddMenuPage } from '../contact-add-menu/contact-add-menu';
import { GroupCreatePage } from '../group-create/group-create';

/*
  Generated class for the ContactListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/contact-list/contact-list.html',
    providers: [ContactService, GroupService]
})
export class ContactListPage implements OnInit {
    contacts: Contact[];
    filteredContacts: Contact[];
    groups: Group[];
    showSearch: Boolean;

    constructor(private nav: NavController, private contactService: ContactService, private groupService: GroupService) {}

    getContacts() {
        this.contactService.getContacts().subscribe(contacts => {
            this.contacts = contacts;
            this.filteredContacts = contacts;
        });
    }

    getGroups() {
        this.groupService.getGroups().then(groups => this.groups = groups);
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

        // "Create New Group"
        if (id === -1) {
            this.nav.push(GroupCreatePage);
            return;
        }

        this.groupService.getGroup(id).then(group => {
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
                return (contact.profile.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
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
        this.showSearch = false;
        this.getContacts();
        this.getGroups();
    }
}
