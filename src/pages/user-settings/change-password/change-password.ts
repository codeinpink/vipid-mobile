import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationManager } from '../../../providers/notification-manager/notification-manager';
import { UserSettings } from '../../../providers/user-settings';
import { AuthService } from '../../../providers/auth/auth';


@Component({
    selector: 'change-password',
    templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
    form: FormGroup;
    errors: any;
    formErrors: any;
    validationMessages: any;

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private settings: UserSettings,
    private nm: NotificationManager, private authService: AuthService) {

    }

    onSubmit(value) {
        this.authService.changePassword(value).subscribe(_ => {
            this.navCtrl.pop().then(_ => this.nm.showSuccessMessage('Password changed'));
        }, errors => {
            for (const key in errors) {
                this.formErrors[key] = [];

                for (let error in errors[key]) {
                    this.formErrors[key].push(errors[key][error]);
                }
            }
        });
    }

    ngOnInit() {
        this.formErrors = {
            'old_password': [],
            'new_password1': [],
            'new_password2': []
        };

        this.validationMessages = {
            'old_password': {
                'required': 'This field may not be blank.'
            },
            'new_password1': {
                'required': 'This field may not be blank.'
            },
            'new_password2': {
                'required': 'This field may not be blank.'
            }
        };

        this.form = this.formBuilder.group({
            old_password: ['', Validators.required],
            new_password1: ['', Validators.required],
            new_password2: ['', Validators.required],
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
}
