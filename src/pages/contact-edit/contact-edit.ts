import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';


@Component({
    templateUrl: 'contact-edit.html',
    providers: [ContactService]
})
export class ContactEditPage implements OnInit {
    editingProfile: boolean;
    contact: Contact;
    valid: boolean;

    constructor(private nav: NavController, private navParams: NavParams, private contactService: ContactService) {}

    getContact() {
        let id = +this.navParams.get('id');
        this.contactService.getContact(id).subscribe(contact => {
            this.contact = contact;
        });
    }

    onChanged(ev) {
        if (this.editingProfile) {
            this.contact.profile = ev.data;
        } else {
            this.contact.about = ev.data.about;
            this.contact.tags = ev.data.tags;
        }

        this.valid = ev.valid;
    }

    onSave() {
        if (this.valid) {
            this.contactService.editContact(this.contact).subscribe(_ => {
                this.nav.pop();
            });
        }
    }

    ngOnInit() {
        this.getContact();
        this.editingProfile = this.navParams.get('editingProfile');
    }
}
