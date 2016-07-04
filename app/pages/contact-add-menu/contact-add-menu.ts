import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactCreatePage } from '../contact-create/contact-create';

/*
  Generated class for the ContactAddMenuPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/contact-add-menu/contact-add-menu.html',
})
export class ContactAddMenuPage {
    constructor(private nav: NavController) {}

    onFindContactClick() {
        console.log('onFindContactClick');
    }

    onCreateContactClick() {
        this.nav.push(ContactCreatePage);
    }
}
