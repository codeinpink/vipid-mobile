import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmEmailPage } from '../confirm-email/confirm-email';
import { ContactListPage } from '../contact-list/contact-list';
import { AuthService } from '../../providers/auth/auth';
import { OAuthAccessTokenService } from '../../providers/oauth/oauth-access-token';


@Component({
    selector: 'page-sign-up',
    templateUrl: 'sign-up.html'
})
export class SignUpPage {
    form: FormGroup;
    errors: any;
    formErrors: any;
    validationMessages: any;

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private authService: AuthService,
    private accessTokenService: OAuthAccessTokenService) {
        this.formErrors = {
            'email': [],
            'password': [],
            'first_name': [],
            'last_name': []
        };

        let genericRequiredMsg = 'This field may not be blank.';

        this.validationMessages = {
            'email': {
                'required': genericRequiredMsg
            },
            'password': {
                'required': genericRequiredMsg
            },
            'first_name': {
                'required': genericRequiredMsg
            },
            'last_name': {
                'required': genericRequiredMsg
            }
        };
    }

    goHome() {
        this.navCtrl.setRoot(ContactListPage);
    }

    onCloseClick() {
        this.navCtrl.pop();
    }

    onLogInClick() {
        this.navCtrl.pop();
    }

    onSignupWithLinkedInClick() {
        this.accessTokenService.loginWithLinkedIn(true).then(_ => {
            this.goHome();
        });
    }

    onSubmit(value) {
        this.authService.signup(value).subscribe(_ => {
            this.navCtrl.push(ConfirmEmailPage, {email: value.email, password: value.password});
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
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
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

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignUpPage');
    }

}
