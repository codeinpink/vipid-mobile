import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { NotesDetail } from '../../components/notes-detail/notes-detail';
import { ContactEditPage } from '../contact-edit/contact-edit';


@Component({
    templateUrl: 'build/pages/contact-notes-detail/contact-notes-detail.html',
    directives: [NotesDetail],
})
export class ContactNotesDetailPage {
    contact: Contact;

    constructor(private navCtrl: NavController, private navParams: NavParams) {

    }

    goBack() {
        this.navCtrl.pop();
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
