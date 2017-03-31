import {Contact} from './contact.model';
import {ContactPermissions} from './contact-permissions.model';

export class ContactFormData extends Contact {
    contact: Contact;
    permissions: ContactPermissions;
    referral: string;
    profileViewTitle: string;
    popDestination: number;

    constructor() {
        super();
        this.permissions = new ContactPermissions();
        this.profileViewTitle = 'View Shared Profile';
        this.popDestination = 0;
    }
}
