import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/Rx';
import { ContactRequest } from './contact-request.model';
import {routesConfig} from "../routesConfig";

@Injectable()
export class ContactRequestService {
    private _requests: ContactRequest[] = [];
    private requests: ReplaySubject<ContactRequest[]> = new ReplaySubject<ContactRequest[]>(1);

    private contactRequestsUrl = routesConfig.contactRequestsUrl;
    private contactRequestDetailUrl = routesConfig.contactRequestDetailUrl;

    constructor(private http: HttpService) {}

    public getContactRequests(forceRefresh?: boolean): Observable<ContactRequest[]> {
        let numSubscribers = this.requests.observers.length;
        console.log('[CONTACT REQUEST SERVICE] # of subscribers: ' + numSubscribers);

        if (this.requests.observers.length === 0 || forceRefresh) {
                this._getContactRequests().subscribe(requests => {
                    this._requests = requests;
                    console.log(this._requests.length)
                    this.requests.next(this._requests);
                }, error => {
                    //this.requests.error(error);
                    this.requests = new ReplaySubject(1);
                })
        }

        return this.requests;
    }

    private _getContactRequests() {
        return this.http.get(this.contactRequestsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public send(data: any) {
        return this.http.post(this.contactRequestsUrl, data).map(res => {
            let request = res.json();
            this._requests.push(request);
            this.requests.next(this._requests);
        }).catch(this.handleError);
    }

    public accept(data: any) {
        return this.http.post(this.contactRequestsUrl, data).map(res => {
            let requests = this._requests.filter(request => request.id !== data.id);
            this._requests = requests;
            this.requests.next(this._requests);
        }).catch(this.handleError);
    }

    public delete(data: any) {
        return this.http.delete(this.contactRequestDetailUrl.replace('{ID}', data.id))
            .map(_ => {
                let requests = this._requests.filter(request => request.id !== data.id);
                this._requests = requests;
                this.requests.next(this._requests);
            })
            .catch(this.handleError);
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
