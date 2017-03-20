import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from '../../shared/http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
    private loginUrl = 'http://localhost:8000/rest-auth/login/';
    private signupUrl = 'http://localhost:8000/rest-auth/registration/';
    private logoutUrl = 'http://localhost:8000/rest-auth/logout/';
    private passwordResetUrl = 'http://localhost:8000/rest-auth/password/reset/';
    private passwordChangeUrl = 'http://localhost:8000/rest-auth/password/change/';

    constructor(private http: HttpService) {}

    public login(credentials: any) {
        return this.http.post(this.loginUrl, credentials).map(res => {
            let data = this.extractData(res);

            if (data.key) {
                localStorage.setItem('auth_token', data.key);
                this.http.refreshToken();
            }

            return data;
        }).catch(this.handleError);
    }

    public signup(data: any) {
        return this.http.post(this.signupUrl, data).map(res => {
            let data = this.extractData(res);

            if (data.key) {
                localStorage.setItem('auth_token', data.key);
                this.http.refreshToken();
            }

            return data;
        }).catch(this.handleError);
    }

    public logout() {
        return this.http.post(this.logoutUrl, '').map(_ => {
            localStorage.removeItem('auth_token');
            this.http.refreshToken();
        }).catch(this.handleError);
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
