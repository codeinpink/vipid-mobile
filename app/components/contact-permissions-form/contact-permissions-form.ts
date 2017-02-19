import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'contact-permissions-form',
    templateUrl: 'build/components/contact-permissions-form/contact-permissions-form.html',
    providers: [FormBuilder]
})
export class ContactPermissionsForm {
    @Input() permissions: any;
    @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();

    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            profile: [this.permissions.profile],
            can_view_phone_number: [this.permissions.can_view_phone_number, Validators.required],
            can_view_website: [this.permissions.can_view_website, Validators.required],
            can_view_linkedin: [this.permissions.can_view_linkedin, Validators.required],
            can_view_github: [this.permissions.can_view_github, Validators.required],
            can_view_twitter: [this.permissions.can_view_twitter, Validators.required],
            can_view_facebook: [this.permissions.can_view_facebook, Validators.required],
            can_view_instagram: [this.permissions.can_view_instagram, Validators.required],
            can_view_youtube: [this.permissions.can_view_youtube, Validators.required]
        });

        this.form.valueChanges.subscribe(data => {
            this.onChanged.emit({data: data, valid: this.form.valid});
        })
    }
}
