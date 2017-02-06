import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/*
  Generated class for the ContactEditPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/contact-edit/contact-edit.html',
    providers: [FormBuilder, ContactService]
})
export class ContactEditPage implements OnInit {
    contact: Contact;
    contactForm: FormGroup;

    constructor(private nav: NavController, private navParams: NavParams, private contactService: ContactService,
                private formBuilder: FormBuilder) {}

    initializeForm() {

        this.contactForm = this.formBuilder.group({
            name: [this.contact.profile.name, Validators.required],
            profile: this.formBuilder.group({
                title: [this.contact.profile.title, Validators.required],
                company: [this.contact.profile.company, Validators.required],
                location: [this.contact.profile.location, Validators.required]
            })
        });
        console.log(this.contactForm.controls);
    }

    getContact() {
        let id = +this.navParams.get('id');
        this.contactService.getContact(id).subscribe(contact => {
            this.contact = contact;
            this.initializeForm();
        });
    }

    onSubmit(contact) {
        contact.id = this.contact.id;
        contact.picture = this.contact.profile.picture;

        this.contactService.editContact(this.contact).subscribe(_ => {
            this.nav.pop();
        });
    }

    ngOnInit() {
        this.getContact();
    }
}
