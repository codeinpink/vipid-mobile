import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Group } from '../../shared/group.model';
import { Contact } from '../../shared/contact.model';
import { ContactDetailPage } from '../contact-detail/contact-detail';


@Component({
    templateUrl: 'build/pages/group-detail/group-detail.html',
})
export class GroupDetailPage {
    group: Group;

    constructor(private navCtrl: NavController, private navParams: NavParams) {

    }

    onContactSelect(contact: Contact) {
        this.navCtrl.push(ContactDetailPage, {
            id: contact.id
        });
    }

    onPageWillEnter() {
        this.group = this.navParams.get('group');
    }

}
