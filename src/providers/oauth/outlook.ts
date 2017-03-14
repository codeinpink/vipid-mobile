import { OAuthProvider } from 'ng2-cordova-oauth/provider';


export class Outlook extends OAuthProvider {
    protected authUrl: string = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
    protected APP_SCOPE_DELIMITER: string = ' ';
    protected defaults: Object = {responseType: 'code'};
}
