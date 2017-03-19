import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from '../../shared/http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
    private loginUrl = 'http://localhost:8000/api/login/';
    //private signupUrl = 'http://localhost:8000/api/signup/';
    private signupUrl = 'http://localhost:8000/rest-auth/registration/';

    constructor(private http: HttpService) {}

    public login(credentials: any) {
        return this.http.post(this.loginUrl, credentials).map(res => {
            let data = this.extractData(res);

            if (data.token) {
                localStorage.setItem('auth_token', data.token);
                this.http.refreshToken();
            }

            return data;
        }).catch(this.handleError);
    }

    public signup(data: any) {
        return this.http.post(this.signupUrl, data).map(res => {
            let data = this.extractData(res);

            if (data.token) {
                localStorage.setItem('auth_token', data.token);
                this.http.refreshToken();
            }

            return data;
        }).catch(this.handleError);
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
        return Observable.throw(err);
    }

}
