import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ProfileDetail } from '../../components/profile-detail/profile-detail';
import { ContactEditPage } from '../contact-edit/contact-edit';


@Component({
    templateUrl: 'build/pages/contact-profile-detail/contact-profile-detail.html',
    directives: [ProfileDetail],
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
            id: this.contact.id
        });
    }

    ngOnInit() {
        this.contact = this.navParams.data;
    }

}
