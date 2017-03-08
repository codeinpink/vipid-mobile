import {Injectable} from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';
import {HttpService} from '../../shared/http.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Profile} from '../../shared/profile.model';


@Injectable()
export class UserProfileService {
    private userProfilesUrl = 'http://localhost:8000/api/user-profiles/';
    private userProfileDetailUrl = this.userProfilesUrl + '{ID}' + '/';
    private userProfileRefreshUrl = this.userProfileDetailUrl + 'refresh/';

    constructor(private http: HttpService) {}

    getProfiles(): Observable<Profile[]> {
        return this.http.get(this.userProfilesUrl).map(this.extractData)
            .catch(this.handleError);
    }

    queryByEmail(email: string): Observable<Profile[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('email', email)
        return this.http.get(this.userProfilesUrl, {search: params}).map(this.extractData)
            .catch(this.handleError);
    }

    // USER'S id, not the id of the profile
    getProfile(id: number) {
        return this.http.get(this.userProfileDetailUrl.replace('{ID}', id.toString())).map(this.extractData)
            .catch(this.handleError);
    }

    // USER'S id, not the id of the profile
    updateProfile(id: number, data: any) {
        return this.http.patch(this.userProfileDetailUrl.replace('{ID}', id.toString()), data).map(this.extractData)
            .catch(this.handleError);
    }

    // USER'S id, not the id of the profile
    refreshProfileData(id: number) {
        return this.http.get(this.userProfileRefreshUrl.replace('{ID}', id.toString())).map(this.extractData)
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
