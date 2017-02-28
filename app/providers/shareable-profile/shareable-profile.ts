import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ShareableProfile} from '../../shared/shareable-profile.model';


@Injectable()
export class ShareableProfileService {
    private shareableProfilesUrl = 'http://localhost:8000/api/shareable-profiles/';
    private shareableProfileDetailUrl = this.shareableProfilesUrl + '{ID}' + '/';

    constructor(private http: Http) {}

    getProfiles(): Observable<ShareableProfile[]> {
        return this.http.get(this.shareableProfilesUrl).map(this.extractData)
            .catch(this.handleError);
    }

    getProfile(id: number) {
        return this.http.get(this.shareableProfileDetailUrl.replace('{ID}', id.toString())).map(this.extractData)
            .catch(this.handleError);
    }

    createProfile(data: any) {
        return this.http.post(this.shareableProfilesUrl, data).map(this.extractData).catch(this.handleError);
    }

    updateProfile(id: number, data: any) {
        return this.http.patch(this.shareableProfileDetailUrl.replace('{ID}', id.toString()), data).map(this.extractData)
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
