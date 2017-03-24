import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ContactFormData } from '../../shared/contact-form-data.model';
import { ContactService } from '../../shared/contact.service';
import { ContactListPage } from '../contact-list/contact-list';


@Component({
    templateUrl: 'contact-add-set-notes.html',
})
export class ContactAddSetNotesPage {
    data: ContactFormData;
    valid: boolean = true;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController, private navParams: NavParams,
    private contactService: ContactService) {

    }

    continue() {
        if (this.valid) {
            this.contactService.addContact(this.data).subscribe(_ => {
                // this doesn't work right now since it is called before http's
                // loading determines it's done, which seems to interfere
                this.navCtrl.popToRoot();

                this.navCtrl.setRoot(ContactListPage);
            });
        } else {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Please fix the form errors before continuing',
                buttons: ['OK']
            });

            alert.present();
        }
    }

    onChanged(ev) {
        this.data = ev.data;
        this.valid = ev.valid;
    }

    ngOnInit() {
        console.log('ngOnInit');
        this.data = this.navParams.data;
    }

}
