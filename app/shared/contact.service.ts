import {Injectable} from '@angular/core';
import {CONTACTS} from './mock-contacts';

@Injectable()
export class ContactService {
    getContacts() {
        return Promise.resolve(CONTACTS);
    }
}
