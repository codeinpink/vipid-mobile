import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { Group } from '../../shared/group.model';
import { GroupService } from '../../shared/group.service';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { ContactAddMenuPage } from '../contact-add-menu/contact-add-menu';

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

    constructor(private nav: NavController, private contactService: ContactService, private groupService: GroupService) {}

    getContacts() {
        this.contactService.getContacts().then(contacts => {
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
        if (id === -1) {
            this.filteredContacts = this.contacts;
            return;
        }

        this.groupService.getGroup(id).then(group => {
            // Check for contact ids that are in the group's list of contacts
            this.filteredContacts = this.contacts.filter(contact => group.contacts.map(c => c.id).indexOf(contact.id) !== -1);
        });
    }

    ngOnInit() {
        this.getContacts();
        this.getGroups();
    }
}
