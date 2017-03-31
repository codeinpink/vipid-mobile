import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpService } from '../../shared/http.service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { LinkedIn } from '../../providers/oauth/linkedin';
import { Outlook } from '../../providers/oauth/outlook';
import { RoutesConfigService } from "../../shared/routes-config-service";


@Injectable()
export class OAuthAccessTokenService {
    private oauth: OauthCordova = new OauthCordova();
    private API_TOKEN = 'api_token';

    private linkedinConnectUrl;
    private linkedinLoginUrl;
    private outlookTokenUrl;

    constructor(private http: HttpService, private storage: Storage, public events: Events, routes: RoutesConfigService) {
        this.linkedinConnectUrl = routes.routes.linkedinConnectUrl;
        this.linkedinLoginUrl = routes.routes.linkedinLoginUrl;
        this.outlookTokenUrl = routes.routes.outlookTokenUrl;
    }

    // isAuthenticationSource = should the token returned be set as the token for our API?
    public loginWithLinkedIn(isAuthenticationSource: boolean, isConnecting?: boolean) {
        let linkedinProvider: LinkedIn = new LinkedIn({
            clientId: "78701vytcosrbk",
            appScope: ["r_emailaddress", "r_basicprofile"],
            redirectUri: "http://localhost/callback",
            state: "aaaaaaaaaaaaa"
        });

        return this.oauth.logInVia(linkedinProvider).then((data: any) => {
            return new Promise(resolve => {
                this.getLinkedInTokenFromServer(data.code, data.state, isConnecting).subscribe(token => {
                    this.events.publish('connect:linkedin');

                    if (token && isAuthenticationSource) {
                        this.events.publish('user:login', token);
                        this.storage.set(this.API_TOKEN, token).then(_ => {
                            resolve(token);
                        });
                    } else {
                        resolve(token);
                    }
                }, error => {
                    resolve(error);
                });
            });
        }, (error) => {
            console.log(error);
        });
    }

    public getLinkedInTokenFromServer(code: string, state: string, isConnecting: boolean) {
        let data: any = {
            code: code,
            state: state
        };

        let url = '';

        if (isConnecting) {
            url = this.linkedinConnectUrl;
        } else {
            url = this.linkedinLoginUrl;
        }

        return this.http.post(url, data).map(res => {
            let data = res.json();
            return data.key;
        });
    }

    public isLoggedInWithOutlook() {
        if (!localStorage.getItem('outlook_access_token')) {
            console.log('no outlook token present');
            return false;
        }

        let outlook_expiration: number = +localStorage.getItem('outlook_expiration');

        if (!outlook_expiration || outlook_expiration < Date.now()) {
            console.log('no outlook expiration present');
            this.clearOutlookToken();
            return false;
        }

        return true;
    }

    public loginWithOutlook() {
        let outlookProvider: Outlook = new Outlook({
            clientId: "0b7b78f8-792d-4bce-8a90-fe1a346ccc45",
            appScope: ["https://graph.microsoft.com/contacts.readwrite", "https://graph.microsoft.com/user.read"],
            redirectUri: "http://localhost/callback"
        });

        return this.oauth.logInVia(outlookProvider).then((data: any) => {
            return new Promise(resolve => {
                this.getOutlookTokenFromServer(data.code).subscribe(token => {
                    resolve(token);
                }, error => {
                    resolve(error);
                });
            });
        }, (error) => {
            this.clearOutlookToken();
        });
    }

    public getOutlookToken() {
        return localStorage.getItem('outlook_access_token');
    }

    private getOutlookTokenFromServer(code: string) {
        let data: any = {
            code: code
        };

        return this.http.post(this.outlookTokenUrl, data).map(res => {
            let data = res.json();
            let token = data.access_token;
            let expiration = Date.now() + data.expires_in;

            localStorage.setItem('outlook_access_token', token);
            localStorage.setItem('outlook_expiration', expiration);

            return token;
        });
    }


    // so someone can tell us that our token has expired; in the future we should
    // subscribe to HttpService's errors or something so we know when our token has expired ourselves
    public clearOutlookToken() {
        localStorage.removeItem('outlook_access_token');
        localStorage.removeItem('outlook_expiration');
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

}
