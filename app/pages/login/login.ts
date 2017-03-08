import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth';
import { ContactListPage } from '../contact-list/contact-list';


@Component({
    templateUrl: 'build/pages/login/login.html',
    providers: [FormBuilder, AuthService],
})
export class LoginPage {
    form: FormGroup;
    errors: any;

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private authService: AuthService) {

    }

    goHome() {
        this.navCtrl.setRoot(ContactListPage);
    }

    onSubmit(value) {
        this.authService.login(value).subscribe(_ => this.goHome(), errors => this.errors = errors);
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

}
