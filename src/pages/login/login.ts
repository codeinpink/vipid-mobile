import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth';
import { OAuthAccessTokenService } from '../../providers/oauth/oauth-access-token';
import { ContactListPage } from '../contact-list/contact-list';
import { SignUpPage } from '../sign-up/sign-up';
import { ResetPasswordPage } from './reset-password/reset-password';


@Component({
    templateUrl: 'login.html',
    providers: [FormBuilder, AuthService],
})
export class LoginPage {
    form: FormGroup;
    errors: any;
    formErrors: any;
    validationMessages: any;

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private authService: AuthService,
    private accessTokenService: OAuthAccessTokenService) {

    }

    goHome() {
        this.navCtrl.setRoot(ContactListPage);
    }

    onPasswordResetClick() {
        this.navCtrl.push(ResetPasswordPage);
    }

    onSignUpClick() {
        this.navCtrl.push(SignUpPage);
    }

    onLoginWithLinkedInClick() {
        this.accessTokenService.loginWithLinkedIn(true).then(_ => {
            this.navCtrl.setRoot(ContactListPage);
        });
    }

    onSubmit(value) {
        this.authService.login(value).subscribe(_ => this.goHome(), errors => {
            for (const key in errors) {
                this.formErrors[key] = [];

                for (let error in errors[key]) {
                    this.formErrors[key].push(errors[key][error]);
                }
            }
        });
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.formErrors = {
            'email': [],
            'password': [],
            'non_field_errors': []
        };

        this.validationMessages = {
            'email': {
                'required': 'Email address is required'
            },
            'password': {
                'required': 'Password is required'
            }
        };

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
