import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { OAuthAccessTokenService } from '../../providers/oauth/oauth-access-token';
import { ContactService } from '../../shared/contact.service';
import { Contact } from '../../shared/contact.model';
import { SelectableOutlookContact } from '../../shared/selectable-outlook-contact.model';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
    templateUrl: 'import-outlook-contacts.html'
})
export class ImportOutlookContactsPage {
    contacts: SelectableOutlookContact[];

    constructor(private navCtrl: NavController, private accessTokenService: OAuthAccessTokenService,
    private contactService: ContactService, private nm: NotificationManager, private alertCtrl: AlertController) {

    }

    getLocationString(location) {
        return location.city + ', ' + location.state;
    }

    getAvatarData(contact) {
        let parts = contact.displayName.split(' ');
        if (parts.length > 1) {
            return parts[0] + ' ' + parts[1];
        }

        return parts[0];
    }

    import() {
        let selected: Contact[] = [];
        this.contacts.filter(contact => contact.selected === true).map(oc => {
            let c = new Contact();
            let loc = this.getLocationString(oc.homeAddress);
            let parts = oc.displayName.split(' ');
            let first = parts.length > 2 ? (parts[0] + ' ' + parts[1]) : parts[0];
            let last = parts.length > 2 ? parts[2] : parts[1]

            c.profile.first_name = first;
            c.profile.last_name = last;
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
        contact.selected = true;
    }

    handleOutlookError(error) {
        let title = error.title ? error.title : 'Error';
        let detail = error.detail ? error.detail : 'Could not authenticate with Outlook. Please try again later.';

        let alert = this.alertCtrl.create({
            title: title,
            subTitle: detail,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        alert.dismiss().then(_ => {
                            this.navCtrl.pop();
                        });
                    }
                }
            ]
        });

        alert.present();
    }

    getOutlookContacts() {
        let token = this.accessTokenService.getOutlookToken();
        this.contactService.getOutlookContacts(token).subscribe(contacts => {
            this.contacts = contacts;
        }, error => this.handleOutlookError(error));
    }

    ngOnInit() {
        if (this.accessTokenService.isLoggedInWithOutlook()) {
            this.getOutlookContacts();
        } else {
            this.accessTokenService.loginWithOutlook().then(res => {
                this.getOutlookContacts();
            }, error => this.handleOutlookError(error));
        }

    }

}
