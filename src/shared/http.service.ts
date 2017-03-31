import {Injectable} from '@angular/core';
import {Http, Headers, XHRBackend, RequestOptionsArgs, Request, Response, RequestOptions} from '@angular/http';
import {LoadingController} from 'ionic-angular';
import { Events } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { NotificationManager } from '../providers/notification-manager/notification-manager';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { ENV } from "../environment/env";


@Injectable()
export class HttpService extends Http {
    private pendingRequests: number = 0;
    private isLoading: boolean = false;
    private loader: any;
    private authToken: string;
    private isAuthenticatedObserver: any;
    public isUnauthenticated: any;

    private API_TOKEN = 'api_token';

    constructor(backend: XHRBackend, options: RequestOptions, private loadingCtrl: LoadingController, public events: Events,
    public storage: Storage, private nm: NotificationManager) {
        super(backend, options);

        this.storage.get(this.API_TOKEN).then((token) => {
            this.authToken = token;
        });

        this.isUnauthenticated = Observable.create(observer => {
            this.isAuthenticatedObserver = observer;
        });

        this.events.subscribe('user:login', (token) => {
            this.authToken = token;
        });

        this.events.subscribe('user:logout', _ => {
            this.authToken = null;
        });
    }

    // is this even used?
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.patch(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
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

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }

        if (options.headers == null) {
            options.headers = new Headers();
        }

        options.headers.append('Content-Type', 'application/json');

        /*  Only include it if it exists, otherwise certain endpoints that don't require
            tokens will get confused and reject the request

            Also only add it if a service hasn't already added it; if a service has,
            that probably means it's an external call and not a call to our API
        */
        if (this.authToken && !options.headers.has('Authorization')) {
            options.headers.set('Authorization', `Token ${this.authToken}`);
        }

        return options;
    }

    private onIntercept(): void {
        //console.log('onIntercept');
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
        //console.log('onCatch');
        this.parseError(error.status, error.url);
        // TODO: display message if it's a server error
        return Observable.throw(error);
    }

    private onSubscribeSuccess(res: Response): void {
        //console.log('onSubscribeSuccess');
        /*
        let data = res.json();

        if (res.url.indexOf('/api/login') !== -1 && data.token) {
            this.authToken = data.token;
        }*/
    }

    private onSubscribeError(error: any): void {
        //console.log('onSubscribeError');
        /*this.toastService.showMessage({ message: error, duration: 3000 });*/
    }

    private onFinally(): void {
        this.pendingRequests--;

        if (this.pendingRequests == 0 && this.isLoading) {
            this.loader.dismiss().then(() => {
                this.loader = null;
                this.isLoading = false;
                console.log('done loading');
            });

        }
    }

    private logout() {
        this.storage.remove(this.API_TOKEN).then(_ => {
            this.events.publish('user:logout');
        });
    }

    private parseError(code: any, url: string) {
        switch (code) {
            case 401:
                if (url.indexOf(ENV) === 0) {
                    this.logout();
                    this.isAuthenticatedObserver.next(true);
                }
                break;
            case 503:
                this.nm.showFailureMessage('The server is currently unavailable');
                break;
            case 500:
                this.nm.showFailureAlert('Error', 'An unexpected error has occured. Please try again later.');
                break;
            default:
                break;
        }
    }
}
