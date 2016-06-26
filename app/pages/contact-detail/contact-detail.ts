import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';

/*
  Generated class for the ContactDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/contact-detail/contact-detail.html',
  providers: [ContactService]
})
export class ContactDetailPage implements OnInit {
  contact: Contact;

  constructor(private nav: NavController, private navParams: NavParams, private contactService: ContactService) {}

  getContact() {
    var id = +this.navParams.get('id');
    this.contactService.getContact(id).then(contact => this.contact = contact);
  }

  ngOnInit() {
    this.getContact();
  }
}