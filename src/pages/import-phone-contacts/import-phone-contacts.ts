import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contacts } from 'ionic-native';

/*
  Generated class for the ImportPhoneContactsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'import-phone-contacts.html',
})
export class ImportPhoneContactsPage implements OnInit {
    contacts: any;

    constructor(private nav: NavController) {}

    ngOnInit() {
        //this.contacts = Contacts.find(["*"]);
    }
}
