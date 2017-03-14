import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactEditPage } from '../contact-edit/contact-edit';


@Component({
    templateUrl: 'contact-profile-detail.html',
})
export class ContactProfileDetailPage {
    contact: Contact;

    constructor(private navCtrl: NavController, private navParams: NavParams) {

    }

    goBack() {
        this.navCtrl.pop();
    }

    onEditClick() {
        this.navCtrl.push(ContactEditPage, {
            id: this.contact.id,
            editingProfile: true
        });
    }

    ngOnInit() {
        this.contact = this.navParams.data;
    }

}
