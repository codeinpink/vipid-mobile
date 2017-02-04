import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ContactService } from '../../shared/contact.service';
import {ExportContactsSelectionPage} from './export-contacts-selection';


@Component({
  templateUrl: 'build/pages/export-contacts/export-contacts.html',
  providers: [ContactService]
})
export class ExportContactsPage implements OnInit {
    contacts: any[]; // bypass "this property does not exist" for Contact class

    constructor(private nav: NavController, private modalCtrl: ModalController, private contactService: ContactService) {}

    getContacts() {
        this.contactService.getContacts().subscribe(contacts => {
            this.contacts = contacts;

            for (let c of this.contacts) {
                c.selected = false;
            }
        });
    }

    getCheckedContacts() {
        return this.contacts.filter(contact => contact.selected);
    }

    getCheckedContactsCount() {
        if (!this.contacts) {
            return 0;
        }

        return this.getCheckedContacts().length;
    }

    export() {
        let modal = this.modalCtrl.create(ExportContactsSelectionPage, {contacts: this.getCheckedContacts()});
        modal.present(modal);
    }

    ngOnInit() {
        this.getContacts();
    }
}
