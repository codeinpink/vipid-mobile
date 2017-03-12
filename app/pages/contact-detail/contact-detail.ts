import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { ContactNotesDetailPage } from '../contact-notes-detail/contact-notes-detail';
import { ContactProfileDetailPage } from '../contact-profile-detail/contact-profile-detail';
import { ProfileDetail } from '../../components/profile-detail/profile-detail';


@Component({
  templateUrl: 'build/pages/contact-detail/contact-detail.html',
  directives: [ProfileDetail],
  providers: [ContactService]
})
export class ContactDetailPage {
  contact: Contact;
  profileDetailTab: any = ContactProfileDetailPage;
  notesDetailTab: any = ContactNotesDetailPage;

  constructor(private nav: NavController, private navParams: NavParams, private contactService: ContactService) {

  }

  getContact() {
    var id = +this.navParams.get('id');
    this.contactService.getContact(id).subscribe(contact => this.contact = contact);
  }

    onPageWillEnter() {
        this.getContact();
    }
}
