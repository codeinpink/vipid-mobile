import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { ProfileForm } from '../../components/profile-form/profile-form';


@Component({
    templateUrl: 'build/pages/contact-create/contact-create.html',
    directives: [ProfileForm],
    providers: [ContactService]
})
export class ContactCreatePage {
    contact: Contact;
    valid: boolean;

    constructor(private nav: NavController, private contactService: ContactService) {

    }

    onChanged(ev) {
        this.contact.profile = ev.data;
        this.valid = ev.valid;
    }

    onSave() {
        if (this.valid) {
            this.contactService.addContact(this.contact).subscribe(_ => {
                this.nav.popToRoot();
            });
        }
    }

    ngOnInit() {
        this.contact = new Contact();
    }
}
