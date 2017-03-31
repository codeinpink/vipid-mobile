import { Injectable } from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';
import {HttpService} from '../../shared/http.service';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {ShareableProfile} from '../../shared/shareable-profile.model';
import { RoutesConfigService } from "../../shared/routes-config-service";


@Injectable()
export class ShareableProfileService {
    private _profiles: ShareableProfile[];
    private profiles: ReplaySubject<ShareableProfile[]> = new ReplaySubject<ShareableProfile[]>(1);

    private shareableProfilesUrl;
    private shareableProfileDetailUrl;
    private shareableProfileDecodeUrl;

    constructor(private http: HttpService, routes: RoutesConfigService) {
        this.shareableProfilesUrl = routes.routes.shareableProfilesUrl;
        this.shareableProfileDetailUrl = routes.routes.shareableProfileDetailUrl;
        this.shareableProfileDecodeUrl = routes.routes.shareableProfileDecodeUrl;
    }


    public getProfiles(forceRefresh?: boolean) {
        let numSubscribers = this.profiles.observers.length;
        console.log('[SHAREABLE PROFILE SERVICE] # of subscribers: ' + numSubscribers);

        if (this.profiles.observers.length === 0 || forceRefresh) {
                this._getProfiles().subscribe(profiles => {
                    this._profiles = profiles;
                    this.profiles.next(this._profiles);
                }, error => {
                    this.profiles.error(error);
                    this.profiles = new ReplaySubject(1);
                })
        }

        return this.profiles;
    }

    private _getProfiles(): Observable<ShareableProfile[]> {
        return this.http.get(this.shareableProfilesUrl).map(this.extractData)
            .catch(this.handleError);
    }

    getProfile(id: number) {
        return this.http.get(this.shareableProfileDetailUrl.replace('{ID}', id.toString())).map(this.extractData)
            .catch(this.handleError);
    }

    public createProfile(data: any) {
        return this.http.post(this.shareableProfilesUrl, data).map(res => {
            let profile = res.json();
            this._profiles.push(profile);
            this.profiles.next(this._profiles);
        }).catch(this.handleError);
    }

    public updateProfile(data: any) {
        return this.http.patch(this.shareableProfileDetailUrl.replace('{ID}', data.id.toString()), data).map(res => {
            let profile = res.json();
            let index = this._profiles.findIndex(sp => sp.id === profile.id);
            this._profiles[index] = profile;
            this.profiles.next(this._profiles);
            return profile;
        }).catch(this.handleError);
    }

    public deleteProfile(id: number) {
        return this.http.delete(this.shareableProfileDetailUrl.replace('{ID}', id.toString())).map(_ => {
            let profiles = this._profiles.filter(profile => profile.id !== id);
            this._profiles = profiles;
            this.profiles.next(this._profiles);
        }).catch(this.handleError);
    }

    public decodeProfileURL(url: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('url', url);
        return this.http.get(this.shareableProfileDecodeUrl, {search: params}).map(this.extractData)
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
