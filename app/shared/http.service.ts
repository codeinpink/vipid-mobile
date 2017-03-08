import {Injectable} from '@angular/core';
import {Http, Headers, XHRBackend, RequestOptionsArgs, Request, Response, RequestOptions} from '@angular/http';
import {LoadingController, App} from 'ionic-angular';
import {LoginPage} from '../pages/login/login';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import {environment} from '../../environments/environment';


@Injectable()
export class HttpService extends Http {
    private pendingRequests: number = 0;
    private isLoading: boolean = false;
    private loader: any;
    private authToken: string;
    private isAuthenticatedObserver: any;
    public isUnauthenticated: any;

    constructor(backend: XHRBackend, options: RequestOptions, private loadingCtrl: LoadingController) {
        super(backend, options);
        this.authToken = localStorage.getItem('auth_token');
        this.isUnauthenticated = Observable.create(observer => {
            this.isAuthenticatedObserver = observer;
        });
    }

    // is this even used?
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    }

    refreshToken() {
        this.authToken = localStorage.getItem('auth_token');
    }

    private intercept(observable: Observable<Response>): Observable<Response> {
        this.onIntercept();

        // stupid cast required until rxjs is updated to a newer version
        // (https://github.com/ReactiveX/rxjs/issues/1672)
        return <Observable<Response>>observable
            .catch(err => this.onCatch(err))
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                this.onSubscribeError(error);
            })
            .finally(() => {
                this.onFinally();
            });
    }

    private updateUrl(req: string) {
        /* use when all services have been updated to remove the origin from their URLs
        return environment.origin + req;
        */
        return req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }

        if (options.headers == null) {
            options.headers = new Headers();
        }

        options.headers.append('Content-Type', 'application/json');

        // Only include it if it exists, otherwise certain endpoints that don't require
        // tokens will get confused and reject the request
        if (this.authToken) {
            options.headers.set('Authorization', `Token ${this.authToken}`);
        }

        return options;
    }

    private onIntercept(): void {
        console.log('onIntercept');
        this.pendingRequests++;

        if (!this.isLoading) {
            this.loader = this.loadingCtrl.create({
                content: "Please wait...",
            });

            this.loader.present();
            this.isLoading = true;
        }
    }

    private onCatch(error: any): Observable<any> {
        console.log('onCatch');
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            this.parseError(error.status);
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

    private onSubscribeSuccess(res: Response): void {
        console.log('onSubscribeSuccess');
        /*
        let data = res.json();

        if (res.url.indexOf('/api/login') !== -1 && data.token) {
            this.authToken = data.token;
        }*/
    }

    private onSubscribeError(error: any): void {
        console.log('onSubscribeError');
        /*this.toastService.showMessage({ message: error, duration: 3000 });*/
    }

    private onFinally(): void {
        this.pendingRequests--;

        if (this.pendingRequests == 0 && this.isLoading) {
            this.loader.dismiss();
            this.loader = null;
            this.isLoading = false;
        }
    }

    private logout() {
        console.log('Logging out');
        localStorage.removeItem('auth_token');
        this.authToken = null;
    }

    private parseError(code: any) {
        switch (code) {
            case 401:
                this.logout();
                this.isAuthenticatedObserver.next(true);
                break;
            default:
                break;
        }
    }
}
