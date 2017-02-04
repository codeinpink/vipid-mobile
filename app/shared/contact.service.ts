import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {CONTACTS} from './mock-contacts';
import {Contact} from './contact.model';
import 'rxjs/Rx'; // for other Observable methods

@Injectable()
export class ContactService {
    private contactsUrl = 'http://localhost:8000/api/contacts/';

    constructor(private http: Http) {}

    getContacts(): Observable<Contact[]> {
        return this.http.get(this.contactsUrl).map(() => this.extractData)
            .catch(this.handleError);
    }

    getContact(id: number) {
        return this.getContacts().map(contacts => contacts.filter(contact => contact.id === id)[0]);
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

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
  }
  private handleError (error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;

      if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
          errMsg = error.message ? error.message : error.toString();
      }
          console.error(errMsg);
          return Observable.throw(errMsg);
    }
}
