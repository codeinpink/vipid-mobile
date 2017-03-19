import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth';
import { ContactListPage } from '../contact-list/contact-list';


@Component({
    templateUrl: 'login.html',
    providers: [FormBuilder, AuthService],
})
export class LoginPage {
    form: FormGroup;
    errors: any;
    formErrors: any;
    validationMessages: any;

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private authService: AuthService) {

    }

    goHome() {
        this.navCtrl.setRoot(ContactListPage);
    }

    onSubmit(value) {
        this.authService.login(value).subscribe(_ => this.goHome(), errors => {
            this.errors = errors;
        }
        );
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        console.log(this.form);
        this.formErrors = {
            'email': [],
            'password': []
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

            console.log(data);
        })
    }

}
