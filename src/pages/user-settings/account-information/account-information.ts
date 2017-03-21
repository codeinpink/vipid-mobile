import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationManager } from '../../../providers/notification-manager/notification-manager';
import { UserSettings } from '../../../providers/user-settings';


@Component({
    selector: 'account-information',
    templateUrl: 'account-information.html'
})
export class AccountInformationPage {
    form: FormGroup;
    errors: any;
    formErrors: any;
    validationMessages: any;

    email: string;
    first_name: string;
    last_name: string;

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private settings: UserSettings,
    private nm: NotificationManager) {

    }

    onSubmit(value) {
        this.settings.updateSettings(value).subscribe(_ => {
            this.navCtrl.pop().then(_ => this.nm.showSuccessMessage('Account information updated'));
        }, errors => {
            for (const key in errors) {
                this.formErrors[key] = [];

                for (let error in errors[key]) {
                    this.formErrors[key].push(errors[key][error]);
                }
            }
        });
    }

    initForm() {
        this.formErrors = {
            'email': [],
            'first_name': [],
            'last_name': []
        };

        this.validationMessages = {
            'email': {
                'required': 'This field may not be blank.',
                'maxlength': 'Your email cannot exceed 80 characters.'
            },
            'first_name': {
                'required': 'This field may not be blank.',
                'maxlength': 'Your first name cannot exceed 30 characters.'
            },
            'last_name': {
                'required': 'This field may not be blank.',
                'maxlength': 'Your last name cannot exceed 30 characters.'
            }
        };

        this.form = this.formBuilder.group({
            email: [{value: this.email, disabled: true}, Validators.maxLength(80)],
            first_name: [this.first_name, Validators.maxLength(30)],
            last_name: [this.last_name, Validators.maxLength(30)],
        });

        this.form.valueChanges.subscribe(data => {
            if (!this.form) return;

            const form = this.form;

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
        });
    }

    ngOnInit() {
        this.settings.getSettings().subscribe(settings => {
            this.email = settings.email;
            this.first_name = settings.first_name;
            this.last_name = settings.last_name;
        });

        this.initForm();
    }
}
