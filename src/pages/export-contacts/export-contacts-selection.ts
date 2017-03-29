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

      for(let c of this.params.get('contacts')){
        //Initialize fields
        let contact = new Contact();
        let address = new ContactAddress();
        let name = new ContactName()
        let organization = new ContactOrganization();


        contact.displayName = c.profile.first_name + " " + c.profile.last_name;

        //Address work
        address.streetAddress = c.profile.location;

        //Organization
        organization.type = "work";
        organization.name = c.profile.company;
        organization.title = c.profile.title;
        organization.pref = true;

        contact.addresses = [address];
        //noinspection TypeScriptUnresolvedFunction
        contact.name = name;
        contact.organizations = [organization];
        //noinspection TypeScriptUnresolvedFunction

        contact.save().then(response =>
          console.log(response))
          .catch(reject => {
              console.log(reject)
            }
          )
      }
    }
    this.dismiss();
  }
}
