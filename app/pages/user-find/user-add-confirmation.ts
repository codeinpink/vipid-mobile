import {Component} from '@angular/core';
import {Modal, NavController, ViewController, NavParams} from 'ionic-angular';
import {User} from '../../shared/user.model';

@Component({
  templateUrl: 'build/pages/user-find/user-add-confirmation.html'

})
export class UserAddConfirmationModal {
    user: User;

    constructor(private viewCtrl: ViewController, navParams: NavParams) {
        console.log(navParams);
        this.user = navParams.get('user');
    }

    onAddClick() {
        console.log('onAddClick');
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
