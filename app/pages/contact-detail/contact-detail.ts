import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { ProfileDetail } from '../../components/profile-detail/profile-detail';


@Component({
  templateUrl: 'build/pages/contact-detail/contact-detail.html',
  directives: [ProfileDetail],
  providers: [ContactService]
})
export class ContactDetailPage {
  contact: Contact;

  constructor(private nav: NavController, private navParams: NavParams, private contactService: ContactService) {}

  getContact() {
    var id = +this.navParams.get('id');
    this.contactService.getContact(id).subscribe(contact => this.contact = contact);
  }

    onEditClick() {
        this.nav.push(ContactEditPage, {
            id: this.contact.id
        });
    }

    onPageWillEnter() {
        this.getContact();
    }
}
