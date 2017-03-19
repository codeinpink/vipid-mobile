import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth';


@Component({
    selector: 'page-sign-up',
    templateUrl: 'sign-up.html'
})
export class SignUpPage {
    form: FormGroup;
    errors: any;
    formErrors: any;
    validationMessages: any;

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private authService: AuthService) {
        this.formErrors = {
            'email': [],
            'password': [],
            'name': []
        };

        this.validationMessages = {
            'email': {
                'required': 'Email address is required'
            },
            'password': {
                'required': 'Password is required'
            },
            'name': {
                'required': 'Name is required'
            }
        };
    }

    onCloseClick() {
        this.navCtrl.pop();
    }

    onLogInClick() {
        this.navCtrl.pop();
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            name: ['', Validators.required],
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
