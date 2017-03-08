import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import {HttpService} from '../../shared/http.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ContactPermissions} from '../../shared/contact-permissions.model';


@Injectable()
export class ContactPermissionsService {
    private contactPermissionsUrl = 'http://localhost:8000/api/contact-permissions/';
    private contactPermissionsDetailUrl = this.contactPermissionsUrl + '{ID}' + '/';

    constructor(private http: HttpService) {}

    // PROFILE'S id, not the id of the contact permission
    getContactPermissions(id: number) {
        return this.http.get(this.contactPermissionsDetailUrl.replace('{ID}', id.toString())).map(this.extractData)
            .catch(this.handleError);
    }

    // PROFILE'S id, not the id of the contact permission
    updateContactPermissions(id: number, data: any) {
        return this.http.patch(this.contactPermissionsDetailUrl.replace('{ID}', id.toString()), data).map(this.extractData)
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
