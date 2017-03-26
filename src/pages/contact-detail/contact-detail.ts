import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { ContactNotesDetailPage } from '../contact-notes-detail/contact-notes-detail';
import { ContactProfileDetailPage } from '../contact-profile-detail/contact-profile-detail';
import { ContactPermissionsDetailPage } from '../contact-permissions-detail/contact-permissions-detail';


@Component({
  templateUrl: 'contact-detail.html'
})
export class ContactDetailPage {
    private contactSubscription: any;

    contact: Contact;
    profileDetailTab: any = ContactProfileDetailPage;
    notesDetailTab: any = ContactNotesDetailPage;
    permissionsDetailTab: any = ContactPermissionsDetailPage;

    displayTabs: boolean;

    constructor(private nav: NavController, private navParams: NavParams, private contactService: ContactService) {

    }

    getContact() {
        var id = +this.navParams.get('id');
        this.contactSubscription = this.contactService.getContacts().subscribe(contacts => {
            console.log('updating detail view contact');
            this.contact = contacts.filter(contact => contact.id === id)[0];
        });
    }

    ngOnInit() {
        this.getContact();
    }

    ngOnDestroy() {
        this.contactSubscription.unsubscribe();
    }

    ionViewDidEnter() {
        // https://github.com/driftyco/ionic/issues/9377#issuecomment-263221516
        this.displayTabs = true;
    }
}
