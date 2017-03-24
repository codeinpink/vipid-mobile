import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Group } from '../../shared/group.model';
import { SelectableContact } from '../../shared/selectable-contact.model';
import { ContactService } from '../../shared/contact.service';
import { GroupService } from '../../shared/group.service';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
  selector: 'page-group-contact-select',
  templateUrl: 'group-contact-select.html'
})
export class GroupContactSelectPage {
    group: Group;
    contacts: SelectableContact[];

    constructor(public navCtrl: NavController, public navParams: NavParams, public contactService: ContactService,
    private groupService: GroupService, private nm: NotificationManager) {

    }

    save() {
        this.group.contacts = this.contacts.filter(c => c.selected === true);
        this.groupService.updateGroup(this.group).subscribe(_ => {
            this.navCtrl.pop().then(_ => {
                this.nm.showSuccessMessage('Contacts updated');
            });
        });
    }

    getAvatarData(first: string, last: string) {
        return first + ' ' + last;
    }

    ngOnInit() {
        this.group = this.navParams.get('group');

        this.contactService.getContacts().subscribe(contacts => {
            let groupContacts = this.group.contacts.map(c => c.id);
            this.contacts = contacts.map((contact: SelectableContact) => {
                if (groupContacts.indexOf(contact.id) !== -1) {
                    contact.selected = true;
                } else {
                    contact.selected = false;
                }

                return contact;
            });
        });
    }

}
