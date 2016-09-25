import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactService } from '../../shared/contact.service';


@Component({
  templateUrl: 'build/pages/export-contacts/export-contacts.html',
  providers: [ContactService]
})
export class ExportContactsPage implements OnInit {
    contacts: any[]; // bypass "this property does not exist" for Contact class

    constructor(private nav: NavController, private contactService: ContactService) {}

    getContacts() {
        this.contactService.getContacts().then(contacts => {
            this.contacts = contacts;

            for (let c of this.contacts) {
                c.checked = false;
            }
        });
    }

    getCheckedContacts() {
        return this.contacts.filter(contact => contact.checked);
    }

    getCheckedContactsCount() {
        if (!this.contacts) {
            return 0;
        }

        return this.getCheckedContacts().length;
    }

    export() {

    }

    ngOnInit() {
        this.getContacts();
    }
}
