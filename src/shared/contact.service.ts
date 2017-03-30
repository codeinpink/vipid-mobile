import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpService} from './http.service';
import {Headers, RequestOptionsArgs, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/Rx';
import {CONTACTS} from './mock-contacts';
import {Contact} from './contact.model';
import 'rxjs/Rx';
import {RoutesConfigService} from "./routes-config-service"; // for other Observable methods


@Injectable()
export class ContactService {
    private _contacts: Contact[] = [];
    private contacts: ReplaySubject<Contact[]> = new ReplaySubject<Contact[]>(1);

    private contactsUrl;
    private contactDetailUrl;
    private addReferralUrl;
    private getOutlookContactsUrl;
    private importOutlookContactsUrl;

    constructor(private http: HttpService, routes: RoutesConfigService) {
    this.contactsUrl = routes.routes.contactsUrl;
    this.contactDetailUrl = routes.routes.contactDetailUrl;
    this.addReferralUrl = routes.routes.addReferralUrl;
    this.getOutlookContactsUrl = routes.routes.getOutlookContactsUrl;
    this.importOutlookContactsUrl = routes.routes.importOutlookContactsUrl;

    }

    public getContacts(forceRefresh?: boolean): Observable<Contact[]> {
        let numSubscribers = this.contacts.observers.length;
        console.log('Contact service - # of subscribers: ' + numSubscribers);

        if (this.contacts.observers.length === 0 || forceRefresh) {
                this._getContacts().subscribe(contacts => {
                    this._contacts = contacts;
                    this.contacts.next(this._contacts);
                }, error => {
                    //this.contacts.error(error);
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

        return this.http.get(this.getOutlookContactsUrl, options).map(res => res.json().value).catch(error => {
            let msg: any = {};

            if (error.status === 401) {
                msg.title = 'Unauthorized';
                msg.detail = 'Please authenticate with Outlook and try again.';
            } else {
                msg.title = 'Error';
                msg.detail = 'Could not get contact list from Outlook. Try again later.';
            }

            return Observable.throw(msg);
        });
    }

    public addContact(data) {
        return this.http.post(this.contactsUrl, data).map(res => {
            let contact: Contact = res.json();

            this._contacts.push(contact);
            this.contacts.next(this._contacts);

            return contact;
        }).catch(this.handleError);
    }

    public addReferral(data) {
        return this.http.post(this.addReferralUrl, data).map(res => {
            let contact: Contact = res.json();

            this._contacts.push(contact);
            this.contacts.next(this._contacts);

            return contact;
        }).catch(this.handleError);
    }

    importOutlookContacts(data) {
        return this.http.post(this.importOutlookContactsUrl, data).map(this.extractData).catch(this.handleError);
    }

    public editContact(data) {
        return this.http.patch(this.contactDetailUrl.replace('{ID}', data.id), data).map(res => {
            let contact = res.json();
            /*
            let contacts = this._contacts;

            for (let i = 0; i < contacts.length; i++) {
                if (contacts[i].id === contact.id) {
                    //contacts[i] = contact;
                    break;
                }
            }

            this.contacts.next(this._contacts);
            */
            return contact;
        }).catch(this.handleError);
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
        let body = {};

        if (error.text()) {
            body = error.json();
        }

        return Observable.throw(body);
    }
}
