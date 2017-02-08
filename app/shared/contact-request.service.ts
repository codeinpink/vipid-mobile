import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class ContactRequestService {
    private contactRequestsUrl = 'http://localhost:8000/api/contacts/';
    private contactRequestDetailUrl = this.contactRequestsUrl + '{ID}' + '/';

    constructor(private http: Http) {}

    getContactRequests() {
        return this.http.get(this.contactRequestsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createContactRequest(data: any) {
        // This needs to be replaced with the current user's ID, prolly through a service
        data.sender = 1;
        return this.http.post(this.contactRequestsUrl, data).map(this.extractData).catch(this.handleError);
    }

    deleteContactRequest(data: any) {
        return this.http.delete(this.contactRequestDetailUrl.replace('{ID}', data.id))
            .map(this.extractData)
            .catch(this.handleError);
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
