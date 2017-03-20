import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserSettings as Settings } from '../shared/user-settings.model';

@Injectable()
export class UserSettings {
    private settings: Settings = null;

    private settingsUrl = 'http://localhost:8000/rest-auth/user/';

    constructor(public http: HttpService) {
        console.log('Hello UserSettings Provider');
        this.getSettings().subscribe(settings => {
            this.settings = settings;
            console.log(this.settings);
        });
    }

    private getSettings() {
        return this.http.get(this.settingsUrl).map(this.extractData)
            .catch(this.handleError);
    }

    public updateSettings(data: any) {
        return this.http.patch(this.settingsUrl, data).map(this.extractData)
            .catch(this.handleError);
    }

    public isLinkedInConnected() {
        if (!this.settings) {
            return false;
        }

        return this.settings.linkedin_connected;
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
