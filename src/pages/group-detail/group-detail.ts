import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Group } from '../../shared/group.model';
import { Contact } from '../../shared/contact.model';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { GroupContactSelectPage } from '../group-contact-select/group-contact-select';
import { GroupService } from '../../shared/group.service';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';
import { GroupCreatePage } from '../group-create/group-create';


@Component({
    templateUrl: 'group-detail.html',
})
export class GroupDetailPage {
    group: Group;

    constructor(private navCtrl: NavController, private navParams: NavParams, private groupService: GroupService,
    private alertCtrl: AlertController, private nm: NotificationManager) {

    }

    onEditClick() {
        this.navCtrl.push(GroupCreatePage, {
            group: this.group
        });
    }

    onDeleteClick() {
        let alert = this.alertCtrl.create({
            title: 'Delete Contact',
            message: 'Are you sure you want to delete this group?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {}
                },
                {
                    text: 'Delete',
                    handler: () => {
                        this.groupService.deleteGroup(this.group).subscribe(_ => {
                            this.navCtrl.pop().then(_ => this.nm.showSuccessMessage('Group deleted'));
                        });
                    }
                }
            ]
        });

        alert.present();
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
