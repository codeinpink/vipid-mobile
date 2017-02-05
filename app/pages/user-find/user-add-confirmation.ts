import {Component} from '@angular/core';
import {Modal, NavController, ViewController, NavParams} from 'ionic-angular';
import {User} from '../../shared/user.model';
import {ContactService} from '../../shared/contact.service';

@Component({
    templateUrl: 'build/pages/user-find/user-add-confirmation.html',
    providers: [ContactService]
})
export class UserAddConfirmationModal {
    user: User;

    constructor(private viewCtrl: ViewController, private nav: NavController, navParams: NavParams,
        private contactService: ContactService) {
        this.user = navParams.get('user');
    }

    onAddClick() {
        this.contactService.addContact(this.user).subscribe(_ => {
            this.close();
        });
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
