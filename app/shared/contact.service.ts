import {Injectable} from '@angular/core';
import {CONTACTS} from './mock-contacts';
import {Contact} from './contact.model';

@Injectable()
export class ContactService {
    getContacts() {
        return Promise.resolve(CONTACTS);
    }

    getContact(id: number) {
        return Promise.resolve(this.getContacts().then(contacts => contacts.filter(contact => contact.id === id)[0]));
    }

    addContact(data) {
        return Promise.resolve(this.mockCreateContact(data));
    }

    editContact(data) {
        let index = this.getContactIndex(data.id);
        CONTACTS[index] = data;
        return Promise.resolve(true);
    }

    private getContactIndex(id: number) {
        let index = -1;

        for (let i = 0; i < CONTACTS.length; i++) {
            if (CONTACTS[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    private mockCreateContact(data) {
        let contact = new Contact();

        contact.name = data.name;
        contact.title = data.title;
        contact.company = data.company;
        contact.location = data.location;
        contact.id = CONTACTS.length + 1;

        CONTACTS.push(contact);
    }
}
