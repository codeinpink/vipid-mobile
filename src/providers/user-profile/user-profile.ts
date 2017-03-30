import {Injectable} from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';
import {HttpService} from '../../shared/http.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Profile} from '../../shared/profile.model';
import {RoutesConfigService} from "../../shared/routes-config-service";


@Injectable()
export class UserProfileService {
    private userProfilesUrl;
    private userProfileDetailUrl;
    private userProfileRefreshUrl;

    constructor(private http: HttpService, routes: RoutesConfigService) {
    this.userProfilesUrl = routes.routes.userProfilesUrl;
    this.userProfileDetailUrl = routes.routes.userProfileDetailUrl;
    this.userProfileRefreshUrl = routes.routes.userProfileRefreshUrl;

    }

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
        let body = {};

        if (error.text()) {
            body = error.json();
        }

        return Observable.throw(body);
    }
}
