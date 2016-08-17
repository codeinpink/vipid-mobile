import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';

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
    contactForm: ControlGroup;

    constructor(private nav: NavController, private navParams: NavParams, private contactService: ContactService,
                private formBuilder: FormBuilder) {}

    initializeForm() {
        this.contactForm = this.formBuilder.group({
            name: [this.contact.name, Validators.required],
            title: [this.contact.title, Validators.required],
            company: [this.contact.company, Validators.required],
            location: [this.contact.location, Validators.required]
        });
    }

    getContact() {
        let id = +this.navParams.get('id');
        this.contactService.getContact(id).then(contact => {
            this.contact = contact;
            this.initializeForm();
        });
    }

    onSubmit(contact) {
        contact.id = this.contact.id;
        contact.picture = this.contact.picture;

        this.contactService.editContact(contact).then(_ => {
            this.nav.pop();
        });
    }

    ngOnInit() {
        this.getContact();
    }
}
