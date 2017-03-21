import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { ReplaySubject } from 'rxjs/Rx';
import { Profile } from '../shared/profile.model';
import { UserSettings as Settings } from '../shared/user-settings.model';

@Injectable()
export class UserSettings {
    private settings: ReplaySubject<Settings> = new ReplaySubject<Settings>(1);

    private settingsUrl = 'http://localhost:8000/rest-auth/user/';

    public settingsA: ReplaySubject<Settings>;

    constructor(public http: HttpService) {
        console.log('Hello UserSettings Provider');
    }

    public getSettings(forceRefresh?: boolean) {
        console.log('# of subscribers: ' + this.settings.observers.length);

        if (this.settings.observers.length === 0 || forceRefresh) {
                this._getSettings().subscribe(settings => {
                    this.settings.next(settings);
                }, error => {
                    this.settings.error(error);
                    this.settings = new ReplaySubject(1);
                })
        }

        return this.settings;
    }

    private _getSettings() {
        return this.http.get(this.settingsUrl).map(this.extractData)
            .catch(this.handleError);
    }

    public updateSettings(data: any) {
        return this.http.patch(this.settingsUrl, data).map(res => {
            let data = res.json();
            this.settings.next(data);
            return data;
        }).catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError (error: Response | any) {
        let errorMsg: any;

        if (error instanceof Response) {
            errorMsg = error.json();
        } else {
            errorMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errorMsg);
    }

}
