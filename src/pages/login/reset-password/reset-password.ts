import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationManager } from '../../../providers/notification-manager/notification-manager';
import { UserSettings } from '../../../providers/user-settings';
import { AuthService } from '../../../providers/auth/auth';


@Component({
    selector: 'reset-password',
    templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
    form: FormGroup;
    errors: any;
    formErrors: any;
    validationMessages: any;

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private nm: NotificationManager,
    private authService: AuthService) {

    }

    onCloseClick() {
        this.navCtrl.pop();
    }

    onSubmit(value) {
        this.authService.resetPassword(value).subscribe(_ => {
            this.navCtrl.pop().then(_ => this.nm.showSuccessMessage('Password reset email sent'));
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
            'email': []
        };

        this.validationMessages = {
            'email': {
                'required': 'This field may not be blank.'
            }
        };

        this.form = this.formBuilder.group({
            email: ['', Validators.required]
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
