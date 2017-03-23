import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpService} from './http.service';
import {Headers, RequestOptionsArgs, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/Rx';
import {CONTACTS} from './mock-contacts';
import {Contact} from './contact.model';
import 'rxjs/Rx'; // for other Observable methods


@Injectable()
export class ContactService {
    private _contacts: Contact[] = [];
    private contacts: ReplaySubject<Contact[]> = new ReplaySubject<Contact[]>(1);

    private contactsUrl = 'http://localhost:8000/api/contacts/';
    private contactDetailUrl = this.contactsUrl + '{ID}' + '/';
    private getOutlookContactsUrl = 'https://graph.microsoft.com/v1.0/me/contacts';
    private importOutlookContactsUrl = this.contactsUrl + 'import_outlook_contacts/';

    constructor(private http: HttpService) {}

    public getContacts(forceRefresh?: boolean): Observable<Contact[]> {
        let numSubscribers = this.contacts.observers.length;
        console.log('Contact service - # of subscribers: ' + numSubscribers);

        if (this.contacts.observers.length === 0 || forceRefresh) {
                this._getContacts().subscribe(contacts => {
                    this._contacts = contacts;
                    console.log(this._contacts.length)
                    this.contacts.next(this._contacts);
                }, error => {
                    this.contacts.error(error);
                    this.contacts = new ReplaySubject(1);
                })
        }

        return this.contacts;
    }

    private _getContacts() {
        return this.http.get(this.contactsUrl).map(this.extractData).catch(this.handleError);
    }

    getContact(id: number) {
        return this.http.get(this.contactDetailUrl.replace('{ID}', id.toString())).map(this.extractData)
            .catch(this.handleError);
    }

    getOutlookContacts(token: string) {
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.set('Authorization', `Bearer ${token}`);

        return this.http.get(this.getOutlookContactsUrl, options).map(res => res.json().value).catch(this.handleError);
    }

    public addContact(data) {
        return this.http.post(this.contactsUrl, data).map(res => {
            let contact: Contact = res.json();

            this._contacts.push(contact);
            this.contacts.next(this._contacts);

            return contact;
        });
    }

    importOutlookContacts(data) {
        console.log(data);
        return this.http.post(this.importOutlookContactsUrl, data).map(this.extractData);
    }

    public editContact(data) {
        return this.http.patch(this.contactDetailUrl.replace('{ID}', data.id), data).map(res => {
            let contact: Contact = res.json();

            for (let i = 0; i < this._contacts.length; i++) {
                if (this._contacts[i].id === contact.id) {
                    this._contacts[i] = contact;
                    break
                }
            }

            console.log(contact);
            this.contacts.next(this._contacts);

            return contact;
        });
    }

    public deleteContact(data) {
        return this.http.delete(this.contactDetailUrl.replace('{ID}', data.id)).map(_ => {
            let contacts = this._contacts.filter(contact => contact.id !== data.id);
            this._contacts = contacts;
            this.contacts.next(this._contacts);
        });
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
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
