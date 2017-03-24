import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ContactFormData } from '../../shared/contact-form-data.model';
import { ContactAddSetNotesPage } from '../contact-add-set-notes/contact-add-set-notes';


@Component({
    templateUrl: 'contact-add-set-permissions.html',
})
export class ContactAddSetPermissionsPage {
    data: ContactFormData;
    valid: boolean = true;

    constructor(private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController) {

    }

    onChanged(ev) {
        this.data.permissions = ev.data;
        this.valid = ev.valid;
    }

    continue() {
        if (this.valid) {
            this.navCtrl.push(ContactAddSetNotesPage, this.data);
        } else {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Please fix the form errors before continuing',
                buttons: ['OK']
            });

            alert.present();
        }
    }

    ngOnInit() {
        console.log('ngOnInit');
        this.data = this.navParams.data;
    }

}
