import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Group } from '../../shared/group.model';
import { Contact } from '../../shared/contact.model';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { GroupContactSelectPage } from '../group-contact-select/group-contact-select';


@Component({
    templateUrl: 'group-detail.html',
})
export class GroupDetailPage {
    group: Group;

    constructor(private navCtrl: NavController, private navParams: NavParams) {

    }

    onAddClick() {
        this.navCtrl.push(GroupContactSelectPage, {group: this.group});
    }

    onContactSelect(contact: Contact) {
        this.navCtrl.push(ContactDetailPage, {
            id: contact.id
        });
    }

    ngOnInit() {
        this.group = this.navParams.get('group');
    }

}
