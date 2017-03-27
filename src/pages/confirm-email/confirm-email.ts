import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ContactListPage } from '../contact-list/contact-list';
import { AuthService } from '../../providers/auth/auth';


@Component({
    selector: 'page-confirm-email',
    templateUrl: 'confirm-email.html'
})
export class ConfirmEmailPage {
    email: string;
    password: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {}

    onCloseClick() {
        this.navCtrl.setRoot(LoginPage);
    }

    goHome() {
        this.navCtrl.setRoot(ContactListPage);
    }

    onConfirmedClick() {
        this.authService.login({email: this.email, password: this.password}).subscribe(_ => this.goHome(), errors => {
            this.navCtrl.setRoot(LoginPage);
        });
    }

    ngOnInit() {
        this.email = this.navParams.get('email');
        this.password = this.navParams.get('password');
    }

}
