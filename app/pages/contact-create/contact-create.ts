import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';


@Component({
    templateUrl: 'build/pages/contact-create/contact-create.html',
})
export class ContactCreatePage {
    contactForm: ControlGroup;

    constructor(private nav: NavController, private formBuilder: FormBuilder) {
        this.contactForm = this.formBuilder.group({
            name: ['', Validators.required],
            title: ['', Validators.required],
            company: ['', Validators.required],
            location: ['', Validators.required]
        });
    }

    onSubmit(contact) {
        console.log('onSubmit');
    }
}
