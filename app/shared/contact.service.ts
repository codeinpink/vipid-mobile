import {Injectable} from '@angular/core';
import {CONTACTS} from './mock-contacts';

@Injectable()
export class ContactService {
    getContacts() {
        return Promise.resolve(CONTACTS);
    }

    getContact(id: number) {
        return Promise.resolve(this.getContacts().then(contacts => contacts.filter(contact => contact.id === id)[0]));
    }
}
