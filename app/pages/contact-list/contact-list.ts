import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { ContactDetailPage } from '../contact-detail/contact-detail';

/*
  Generated class for the ContactListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/contact-list/contact-list.html',
    providers: [ContactService]
})
export class ContactListPage implements OnInit {
    contacts: Contact[];

    constructor(private nav: NavController, private contactService: ContactService) {}

    getContacts() {
        this.contactService.getContacts().then(contacts => this.contacts = contacts);
    }

    onContactSelect(contact: Contact) {
        console.log(contact);
        this.nav.push(ContactDetailPage, {
            contact: contact
        });
    }

    ngOnInit() {
        this.getContacts();
    }
}
