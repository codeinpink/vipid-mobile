import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactEditPage } from '../contact-edit/contact-edit';


@Component({
    templateUrl: 'contact-notes-detail.html',
})
export class ContactNotesDetailPage {
    contact: Contact;

    constructor(private navCtrl: NavController, private navParams: NavParams, private appCtrl: App) {

    }

    goBack() {
        this.appCtrl.getRootNav().pop();
    }

    onEditClick() {
        this.navCtrl.push(ContactEditPage, {
            id: this.contact.id,
            editingProfile: false
        });
    }

    ngOnInit() {
        this.contact = this.navParams.data;
    }

}
