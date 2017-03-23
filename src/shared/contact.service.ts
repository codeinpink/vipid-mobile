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
                this._getContacts().subscribe(groups => {
                    this.contacts.next(groups);
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

    addContact(data) {
        return this.http.post(this.contactsUrl, data).map(this.extractData);
    }

    importOutlookContacts(data) {
        console.log(data);
        return this.http.post(this.importOutlookContactsUrl, data).map(this.extractData);
    }

    editContact(data) {
        let index = this.getContactIndex(data.id);
        CONTACTS[index] = data;
        return this.http.patch(this.contactDetailUrl.replace('{ID}', data.id), data).map(this.extractData);
    }

    deleteContact(data) {
        return this.http.delete(this.contactDetailUrl.replace('{ID}', data.id)).map(this.extractData);
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
