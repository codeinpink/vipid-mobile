import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactPermissionsForm } from '../../components/contact-permissions-form/contact-permissions-form';
import { ContactFormData } from '../../shared/contact-form-data.model';
import { ContactAddSetNotesPage } from '../contact-add-set-notes/contact-add-set-notes';


@Component({
    templateUrl: 'build/pages/contact-add-set-permissions/contact-add-set-permissions.html',
    directives: [ContactPermissionsForm],
    providers: []
})
export class ContactAddSetPermissionsPage {
    data: ContactFormData;
    valid: boolean = true;

    constructor(private navCtrl: NavController, private navParams: NavParams) {

    }

    onChanged(ev) {
        this.data.permissions = ev.data;
        this.valid = ev.valid;
    }

    continue() {
        if (this.valid) {
            this.navCtrl.push(ContactAddSetNotesPage, this.data);
        }
    }

    ngOnInit() {
        console.log('ngOnInit');
        this.data = this.navParams.data;
    }

}
