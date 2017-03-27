import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Response } from '@angular/http';
import { HttpService } from '../../shared/http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


@Injectable()
export class AuthService {
    private loginUrl = 'http://localhost:8000/rest-auth/login/';
    private signupUrl = 'http://localhost:8000/rest-auth/registration/';
    private logoutUrl = 'http://localhost:8000/rest-auth/logout/';
    private passwordResetUrl = 'http://localhost:8000/rest-auth/password/reset/';
    private passwordChangeUrl = 'http://localhost:8000/rest-auth/password/change/';

    private API_TOKEN = 'api_token';

    constructor(private http: HttpService, public events: Events, public storage: Storage) {

    }

    public hasLoggedIn(): Promise<boolean> {
        return this.storage.get(this.API_TOKEN).then((value) => {
            return value !== null;
        });
    };

    public login(credentials: any) {
        return new Promise((resolve, reject) => {
            this.http.post(this.loginUrl, credentials).map(this.extractData).subscribe(data => {
                if (data.key) {
                    this.events.publish('user:login', data.key);
                    this.storage.set(this.API_TOKEN, data.key).then(_ => {
                        resolve(data);
                    });
                } else {
                    resolve(data);
                }
            }, error => {
                reject(error.json());
            });
        });
    }

    public signup(data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(this.signupUrl, data).map(this.extractData).subscribe(data => {
                if (data.key) {
                    this.events.publish('user:login', data.key);
                    this.storage.set(this.API_TOKEN, data.key).then(_ => {
                        resolve(data);
                    });
                } else {
                    resolve(data);
                }
            }, error => {
                reject(error.json());
            });
        });
    }

    public logout() {
        return new Promise((resolve, reject) => {
            this.http.post(this.logoutUrl, '').map(this.extractData).subscribe(_ => {
                this.events.publish('user:logout');
                this.storage.remove(this.API_TOKEN).then(_ => {
                    resolve();
                });
            }, error => {
                reject(error.json());
            });
        });
    }

    public resetPassword(data: any) {
        return this.http.post(this.passwordResetUrl, data).map(this.extractData).catch(this.handleError);
    }

    public changePassword(data: any) {
        return this.http.post(this.passwordChangeUrl, data).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        let err: string;

        if (error instanceof Response) {
            const body = error.json() || '';
            err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);
        return Observable.throw(error.json());
    }

}
