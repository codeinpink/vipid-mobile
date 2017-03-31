import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { HttpService } from '../shared/http.service';
import { Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { ReplaySubject } from 'rxjs/Rx';
import { Profile } from '../shared/profile.model';
import { UserSettings as Settings } from '../shared/user-settings.model';
import { RoutesConfigService } from "../shared/routes-config-service";


@Injectable()
export class UserSettings {
    private _settings: Settings = new Settings();
    private settings: ReplaySubject<Settings> = new ReplaySubject<Settings>(1);

    private settingsUrl;
    private settingsRefreshUrl;


    constructor(public http: HttpService, public events: Events, routes: RoutesConfigService) {
        this.settingsUrl = routes.routes.settingsUrl;
        this.settingsRefreshUrl = routes.routes.settingsRefreshUrl;

        this.events.subscribe('user:login', () => {
            // clear settings so they will get refreshed
            this.settings = new ReplaySubject(1);
        });

        this.events.subscribe('user:logout', () => {
            this._settings = new Settings();
            this.settings.next(this._settings);
        });

        this.events.subscribe('connect:linkedin', () => {
            this._settings.linkedin_connected = true;
            this.settings.next(this._settings);
        });
    }

    public getSettings(forceRefresh?: boolean) {
        console.log('# of subscribers: ' + this.settings.observers.length);

        if (this.settings.observers.length === 0 || forceRefresh) {
                this._getSettings().subscribe(settings => {
                    this._settings = settings;
                    this.settings.next(this._settings);
                }, error => {
                    //this.settings.error(error);
                    this.settings = new ReplaySubject(1);
                })
        }

        return this.settings;
    }

    private _getSettings() {
        return this.http.get(this.settingsUrl).map(this.extractData)
            .catch(this.handleError);
    }

    public refresh() {
        this.http.post(this.settingsRefreshUrl, '').map(this.extractData).catch(this.handleError).subscribe(settings => {
            this._settings = settings;
            this.settings.next(this._settings);
        }, error => {
            //this.settings.error(error);
            this.settings = new ReplaySubject(1);
        });
    }

    public updateSettings(data: any) {
        return this.http.patch(this.settingsUrl, data).map(res => {
            let data = res.json();
            this._settings = data;
            this.settings.next(this._settings);
            return data;
        }).catch(this.handleError);
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
