import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { ProfileForm } from '../../components/profile-form/profile-form';


@Component({
    templateUrl: 'build/pages/contact-edit/contact-edit.html',
    directives: [ProfileForm],
    providers: [ContactService]
})
export class ContactEditPage implements OnInit {
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
        this.contact.profile = ev.data;
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
    }
}
