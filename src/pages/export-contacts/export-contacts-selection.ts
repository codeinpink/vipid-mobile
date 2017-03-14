import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Contact as Cnt }  from "../../shared/contact.model" ;
import { Contact, ContactName, ContactAddress, ContactOrganization } from 'ionic-native';


@Component({
    templateUrl: 'export-contacts-selection.html',
})
export class ExportContactsSelectionPage {
    private methods: any; //methods of export (e.g. phone, outlook, etc.)

    constructor(private params: NavParams, private viewCtrl: ViewController , private platform: Platform) {
        this.platform = platform;
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
        if(this.platform.is("android")){
            console.log(this.params);


            for(let c of this.params.get('contacts')){
                console.log(c);
                //Initialize fields
                let contact = new Contact();
                let address = new ContactAddress();
                let name = new ContactName()
                let organization = new ContactOrganization();

                //Name work
                name.familyName = "TrumpMAGA";
                name.givenName = c.name;

                //Address work
                address.streetAddress = c.location;

                //Organization
                organization.type = "work";
                organization.name = c.company;
                organization.title = c.title;
                organization.pref = true;



                contact.displayName = "dankMemeMaster" + c.id;
                contact.addresses = [];
                //noinspection TypeScriptUnresolvedFunction
                contact.addresses.push(address);
                contact.name = name;
                contact.organizations = [];
                //noinspection TypeScriptUnresolvedFunction
                contact.organizations.push(organization);

                contact.save().then( response =>
                    console.log(response)).catch(reject => {
                        console.log("fk off");
                        console.log(reject)
                    }
                )

            }
        }
        console.log(this.params.get('contacts'));
        this.dismiss();
    }
}
