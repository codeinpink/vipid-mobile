import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { ContactService } from '../../shared/contact.service';


@Component({
    templateUrl: 'build/pages/contact-create/contact-create.html',
    providers: [ContactService]
})
export class ContactCreatePage {
    contactForm: ControlGroup;

    constructor(private nav: NavController, private formBuilder: FormBuilder,
                private contactService: ContactService) {
        this.contactForm = this.formBuilder.group({
            name: ['', Validators.required],
            title: ['', Validators.required],
            company: ['', Validators.required],
            location: ['', Validators.required]
        });
    }

    onSubmit(contact) {
        this.contactService.addContact(contact).then(_ => this.nav.pop());
    }
}
