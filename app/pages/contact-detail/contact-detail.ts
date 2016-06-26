import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';

/*
  Generated class for the ContactDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/contact-detail/contact-detail.html',
})
export class ContactDetailPage implements OnInit {
  contact: Contact;

  constructor(private nav: NavController, private navParams: NavParams) {}

  ngOnInit() {
    this.contact = this.navParams.get('contact');
  }
}
