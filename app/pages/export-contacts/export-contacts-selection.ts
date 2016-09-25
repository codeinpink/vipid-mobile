import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';


@Component({
    templateUrl: 'build/pages/export-contacts/export-contacts-selection.html',
})
export class ExportContactsSelectionPage {
    private methods: any; //methods of export (e.g. phone, outlook, etc.)

    constructor(private params: NavParams, private viewCtrl: ViewController) {
        this.methods = {
            phone: false,
            outlook: false,
            gmail: false,
        };
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    exportContacts() {
        console.log(this.params.get('contacts'));
        this.dismiss();
    }
}
