import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OAuthAccessTokenService } from '../../providers/oauth/oauth-access-token';
import { ContactService } from '../../shared/contact.service';
import { Contact } from '../../shared/contact.model';
import { SelectableOutlookContact } from '../../shared/selectable-outlook-contact.model';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
    templateUrl: 'import-outlook-contacts.html',
    providers: [ContactService]
})
export class ImportOutlookContactsPage {
    contacts: SelectableOutlookContact[];

    constructor(private navCtrl: NavController, private accessTokenService: OAuthAccessTokenService,
    private contactService: ContactService, private nm: NotificationManager) {

    }

    getLocationString(location) {
        return location.city + ', ' + location.state;
    }

    import() {
        let selected: Contact[] = [];
        this.contacts.filter(contact => contact.selected === true).map(oc => {
            let c = new Contact();
            let loc = this.getLocationString(oc.homeAddress);

            c.profile.name = oc.displayName;
            c.profile.email = oc.emailAddresses[0].address ? oc.emailAddresses[0].address : '';
            c.profile.phone_number = oc.mobilePhone ? oc.mobilePhone : '';
            c.profile.title = oc.jobTitle ? oc.jobTitle : '';
            c.profile.company = oc.companyName ? oc.companyName : '';
            c.profile.location = loc ? loc : '';
            c.outlook_id = oc.id;

            selected.push(c);
        });
        this.contactService.importOutlookContacts({'contacts': selected}).subscribe(_ => {
            this.navCtrl.popToRoot().then(_ => {
                this.nm.showSuccessMessage('Contacts imported');
            });
        });
    }

    onContactSelect($event, contact) {
        console.log(contact);
        contact.selected = true;
    }

    getOutlookContacts() {
        console.log('gettingContacts');
        let token = this.accessTokenService.getOutlookToken();
        this.contactService.getOutlookContacts(token).subscribe(contacts => {
            console.log(contacts);
            this.contacts = contacts;
        });
    }

    ngOnInit() {
        if (this.accessTokenService.isLoggedInWithOutlook()) {
            console.log('isLoggedIn');
            this.getOutlookContacts();
        } else {
            this.accessTokenService.loginWithOutlook().then(res => {
                console.log(res);
                this.getOutlookContacts();
            });
        }

    }

}
