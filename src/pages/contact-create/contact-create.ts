import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { ContactAddSetNotesPage } from '../contact-add-set-notes/contact-add-set-notes';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
    templateUrl: 'contact-create.html',
    providers: [ContactService]
})
export class ContactCreatePage {
    contact: Contact;
    valid: boolean;

    constructor(private nav: NavController, private contactService: ContactService, private nm: NotificationManager) {

    }

    onChanged(ev) {
        this.contact.profile = ev.data;
        this.valid = ev.valid;
    }

    continue() {
        if (this.valid) {
            this.nav.push(ContactAddSetNotesPage, this.contact);
        }
    }

    onSave() {
        if (this.valid) {
            this.contactService.addContact(this.contact).subscribe(_ => {
                this.nav.popToRoot().then(_ => {
                    this.nm.showSuccessMessage('Contact created');
                });
            });
        }
    }

    ngOnInit() {
        this.contact = new Contact();
    }
}
