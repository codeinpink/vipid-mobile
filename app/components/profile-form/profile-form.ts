import { Component, Input, Output, EventEmitter } from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'profile-form',
    templateUrl: 'build/components/profile-form/profile-form.html',
    providers: [FormBuilder],
    directives: [IONIC_DIRECTIVES]
})
export class ProfileForm {
    @Input() profile: any;
    @Input() disabled: boolean;
    @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();

    profileForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            name: [this.profile.name, Validators.required],
            title: [this.profile.title],
            company: [this.profile.company],
            location: [this.profile.location],
            email: [this.profile.email],
            phone_number: [this.profile.phone_number],
            website: [this.profile.website],
            linkedin: [this.profile.linkedin],
            twitter: [this.profile.twitter],
            github: [this.profile.github],
            facebook: [this.profile.facebook],
            youtube: [this.profile.youtube],
            instagram: [this.profile.instagram],
        });

        this.profileForm.valueChanges.subscribe(data => {
            this.onChanged.emit({data: data, valid: this.profileForm.valid});
        })
    }
}
