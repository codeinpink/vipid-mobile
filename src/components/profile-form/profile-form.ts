import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'profile-form',
    templateUrl: 'profile-form.html',
    providers: [FormBuilder]
})
export class ProfileForm {
    @Input() profile: any;
    @Input() disabled: boolean;
    @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();

    profileForm: FormGroup;
    errors: any;
    formErrors: any;
    validationMessages: any;

    constructor(private formBuilder: FormBuilder) {
        this.formErrors = {
            'name': [],
            'title': [],
            'company': [],
            'location': [],
            'email': [],
            'phone_number': [],
            'website': [],
            'linkedin': [],
            'twitter': [],
            'github': [],
            'facebook': [],
            'youtube': [],
            'instagram': []
        };

        this.validationMessages = {
            'name': {
                'required': 'Your name is required',
                'maxlength': 'Your name cannot exceed 80 characters'
            },
            'title': {
                'maxlength': 'Your name cannot exceed 120 characters'
            },
            'company': {
                'maxlength': 'Your company cannot exceed 50 characters'
            },
            'location': {
                'maxlength': 'Your location cannot exceed 75 characters'
            },
            'email': {
                'maxlength': 'Your email cannot exceed 80 characters'
            },
            'phone_number': {
                'maxlength': 'Your phone number cannot exceed 25 characters'
            },
            'website': {
                'maxlength': 'Your name cannot exceed 254 characters'
            },
            'linkedin': {
                'maxlength': 'Your linkedin cannot exceed 64 characters'
            },
            'twitter': {
                'maxlength': 'Your twitter cannot exceed 64 characters'
            },
            'github': {
                'maxlength': 'Your github cannot exceed 64 characters'
            },
            'facebook': {
                'maxlength': 'Your facebook cannot exceed 64 characters'
            },
            'youtube': {
                'maxlength': 'Your youtube cannot exceed 64 characters'
            },
            'instagram': {
                'maxlength': 'Your instagram cannot exceed 64 characters'
            },
        };
    }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            name: [this.profile.name, Validators.compose([Validators.required, Validators.maxLength(80)])],
            title: [this.profile.title, Validators.maxLength(120)],
            company: [this.profile.company, Validators.maxLength(50)],
            location: [this.profile.location, Validators.maxLength(75)],
            email: [this.profile.email, Validators.maxLength(80)],
            phone_number: [this.profile.phone_number, Validators.maxLength(25)],
            website: [this.profile.website, Validators.maxLength(256)],
            linkedin: [this.profile.linkedin, Validators.maxLength(64)],
            twitter: [this.profile.twitter, Validators.maxLength(64)],
            github: [this.profile.github, Validators.maxLength(64)],
            facebook: [this.profile.facebook, Validators.maxLength(64)],
            youtube: [this.profile.youtube, Validators.maxLength(64)],
            instagram: [this.profile.instagram, Validators.maxLength(64)],
        });

        this.profileForm.valueChanges.subscribe(data => {
            if (!this.profileForm) return;

            const form = this.profileForm;

            for (const field in this.formErrors) {
                this.formErrors[field] = [];
                const control = form.get(field);

                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        this.formErrors[field].push(messages[key]);
                    }
                }
            }

            this.onChanged.emit({data: data, valid: this.profileForm.valid});
        })
    }
}
