import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contacts, Contact } from 'ionic-native';

/*
  Generated class for the ImportPhoneContactsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/import-phone-contacts/import-phone-contacts.html',
})
export class ImportPhoneContactsPage implements OnInit {
    contacts: Contact[];

    constructor(private nav: NavController) {}

    ngOnInit() {
        this.contacts = Contact.filter("*");
    }
}
