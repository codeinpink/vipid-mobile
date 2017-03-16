import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { ContactPermissionsService } from '../../providers/contact-permissions/contact-permissions';
import { Contact } from '../../shared/contact.model';
import { ContactEditPage } from '../contact-edit/contact-edit';


@Component({
    selector: 'page-contact-permissions-detail',
    templateUrl: 'contact-permissions-detail.html'
})
export class ContactPermissionsDetailPage {
    contact: Contact;
    permissions: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private appCtrl: App,
    private cpService: ContactPermissionsService) {}

    goBack() {
        this.appCtrl.getRootNav().pop();
    }

    ngOnInit() {
        this.contact = this.navParams.data;
        this.cpService.getContactPermissions(this.contact.profile.id).subscribe(permissions => {
            this.permissions = permissions;
        });
    }

}
