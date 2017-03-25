import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpService } from '../../shared/http.service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { LinkedIn } from '../../providers/oauth/linkedin';
import { Outlook } from '../../providers/oauth/outlook';


@Injectable()
export class OAuthAccessTokenService {
    private oauth: OauthCordova = new OauthCordova();

    constructor(private http: HttpService, private storage: Storage) {

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
            console.log(data);
            return new Promise(resolve => {
                this.getLinkedInTokenFromServer(data.code, data.state, isConnecting).subscribe(token => {
                    console.log('token ' + token);

                    if (token && isAuthenticationSource) {
                        localStorage.setItem('auth_token', token);
                        this.http.refreshToken();
                    }

                    resolve(token);
                }, error => {
                    resolve(error);
                });
            });
        }, (error) => {
            this.clearLinkedInConnection();
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
            url = 'http://localhost:8000/rest-auth/connect_linkedin/'
        } else {
            url = 'http://localhost:8000/rest-auth/linkedin/'
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
            console.log(data);
            return new Promise(resolve => {
                this.getOutlookTokenFromServer(data.code).subscribe(token => {
                    console.log('token ' + token);
                    resolve(token);
                }, error => {
                    resolve(error);
                });
            });
        }, (error) => {
            this.clearOutlookToken();
            console.log(error);
        });
    }

    public getOutlookToken() {
        return localStorage.getItem('outlook_access_token');
    }

    private getOutlookTokenFromServer(code: string) {
        let data: any = {
            code: code
        };

        return this.http.post('http://localhost:8000/api/get-outlook-token/', data).map(res => {
            let data = res.json();
            let token = data.access_token;
            let expiration = Date.now() + data.expires_in;

            console.log('token: ' + token + ', expiration: ' + expiration);
            localStorage.setItem('outlook_access_token', token);
            localStorage.setItem('outlook_expiration', expiration);

            return token;
        });
    }

    // so someone can tell us that our token has expired; in the future we should
    // subscribe to HttpService's errors or something so we know when our token has expired ourselves
    public clearLinkedInConnection() {
        localStorage.removeItem('is_linkedin_connected');
        localStorage.removeItem('linkedin_expiration');
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
