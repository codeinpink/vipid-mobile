import {Contact} from './contact.model';
import {ContactPermissions} from './contact-permissions.model';

export class ContactFormData extends Contact {
    contact: Contact;
    permissions: ContactPermissions;
    referral: string;

    constructor() {
        super();
        this.permissions = new ContactPermissions();
    }
}
