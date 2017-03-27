import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'profile-form',
    templateUrl: 'profile-form.html',
    providers: [FormBuilder]
})
export class ProfileForm {
    @Input() profile: any
    @Input() isUserProfile: boolean;
    @Input() disabled: boolean;
    @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();

    profileForm: FormGroup;
    errors: any;
    formErrors: any;
    validationMessages: any;

    constructor(private formBuilder: FormBuilder) {
        this.formErrors = {
            'first_name': [],
            'last_name': [],
            'title': [],
            'industry': [],
            'company': [],
            'location': [],
            'summary': [],
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

        let genericRequiredMsg = 'This field may not be blank.';

        this.validationMessages = {
            'first_name': {
                'required': genericRequiredMsg,
                'maxlength': 'This field cannot exceed 30 characters.'
            },
            'last_name': {
                'required': genericRequiredMsg,
                'maxlength': 'This field cannot exceed 30 characters.'
            },
            'title': {
                'maxlength': 'This field cannot exceed 120 characters.'
            },
            'industry': {
                'maxlength': 'This field cannot exceed 20 characters.'
            },
            'company': {
                'maxlength': 'This field cannot exceed 50 characters.'
            },
            'location': {
                'maxlength': 'This field cannot exceed 75 characters.'
            },
            'summary': {
                'maxlength': 'This field cannot exceed 2000 characters.'
            },
            'email': {
                'maxlength': 'This field cannot exceed 80 characters.'
            },
            'phone_number': {
                'maxlength': 'This field cannot exceed 25 characters.'
            },
            'website': {
                'maxlength': 'This field cannot exceed 254 characters.'
            },
            'linkedin': {
                'maxlength': 'This field cannot exceed 64 characters.'
            },
            'twitter': {
                'maxlength': 'This field cannot exceed 64 characters.'
            },
            'github': {
                'maxlength': 'This field cannot exceed 64 characters.'
            },
            'facebook': {
                'maxlength': 'This field cannot exceed 64 characters.'
            },
            'youtube': {
                'maxlength': 'This field cannot exceed 64 characters.'
            },
            'instagram': {
                'maxlength': 'This field cannot exceed 64 characters.'
            },
        };
    }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            first_name: [{value: this.profile.first_name, disabled: this.isUserProfile}, Validators.compose([Validators.required, Validators.maxLength(30)])],
            last_name: [{value: this.profile.last_name, disabled: this.isUserProfile}, Validators.compose([Validators.required, Validators.maxLength(30)])],
            title: [this.profile.title, Validators.maxLength(120)],
            industry: [this.profile.industry, Validators.maxLength(20)],
            company: [this.profile.company, Validators.maxLength(50)],
            location: [this.profile.location, Validators.maxLength(75)],
            summary: [this.profile.summary, Validators.maxLength(2000)],
            email: [{value: this.profile.email, disabled: this.isUserProfile}, Validators.maxLength(80)],
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
