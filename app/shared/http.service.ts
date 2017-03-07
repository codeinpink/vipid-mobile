import {Injectable} from '@angular/core';
import {Http, Headers, XHRBackend, RequestOptionsArgs, Request, Response, RequestOptions} from '@angular/http';
import {LoadingController} from 'ionic-angular';
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

    constructor(backend: XHRBackend, options: RequestOptions, private loadingCtrl: LoadingController) {
        super(backend, options);
        this.authToken = localStorage.getItem('auth_token');
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
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private intercept(observable: Observable<Response>): Observable<Response> {
        this.onIntercept();

        // stupid cast required until rxjs is updated to a newer version
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

        options.headers.set('Authorization', `Token ${this.authToken}`);

        return options;
    }

    private onIntercept(): void {
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
            this.parseError(body.code);
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

    private onSubscribeSuccess(res: Response): void {
        console.log('onSubscribeSuccess');
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

    private parseError(code: any) {
        switch (code) {
            case 401:
               //this.logout()
                break;
            default:
                break;
        }
    }
}
