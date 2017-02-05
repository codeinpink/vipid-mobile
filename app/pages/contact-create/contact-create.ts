import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ContactService } from '../../shared/contact.service';


@Component({
    templateUrl: 'build/pages/contact-create/contact-create.html',
    providers: [FormBuilder, ContactService]
})
export class ContactCreatePage {
    contactForm: FormGroup;

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
        this.contactService.addContact(contact).subscribe(_ => this.nav.pop());
    }
}
