import {Injectable} from '@angular/core';
import {Http, Headers, XHRBackend, RequestOptionsArgs, Request, Response, ConnectionBackend, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService extends Http {
    constructor(backend: XHRBackend, options: RequestOptions) {
        let token = localStorage.getItem('auth_token');
        options.headers.set('Authorization', `Token ${token}`);
        super(backend, options);
    }
}
