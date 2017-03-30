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

    constructor(private http: HttpService, routes: RoutesConfigService) {
        this.userProfilesUrl = routes.routes.userProfilesUrl;
    }

    queryByEmail(email: string): Observable<Profile[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('email', email)
        return this.http.get(this.userProfilesUrl, {search: params}).map(this.extractData)
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
