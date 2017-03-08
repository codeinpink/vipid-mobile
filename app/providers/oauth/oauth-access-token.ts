import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Storage, LocalStorage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class OAuthAccessTokenService {
    storage: Storage;

    constructor(private http: Http) {
        this.storage = new Storage(LocalStorage);
    }

    getLinkedInToken(code: string, state: string) {
        return this.http.post('http://localhost:8000/rest-auth/linkedin/', {
            code: code,
            state: state
        }).map(res => {
            let data = res.json();
            this.storage.set('linkedin_token', data.key);
            return data.key;
        });

        /*
        return this.http.post('https://www.linkedin.com/oauth/v2/accessToken', {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://localhost/callback',
            client_id: '78701vytcosrbk',
            client_secret: '2zccxtTlSu2IwV0Z'
        }).map(this.extractData);
        */
    }

    getLinkedInProfiles(token) {
        let hugeUrl = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,headline,picture-url,industry,summary,specialties,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),associations,interests,num-recommenders,date-of-birth,publications:(id,title,publisher:(name),authors:(id,name),date,url,summary),patents:(id,title,summary,number,status:(id,name),office:(name),inventors:(id,name),date,url),languages:(id,language:(name),proficiency:(level,name)),skills:(id,skill:(name)),certifications:(id,name,authority:(name),number,start-date,end-date),courses:(id,name,number),recommendations-received:(id,recommendation-type,recommendation-text,recommender),honors-awards,three-current-positions,three-past-positions,volunteer)?oauth2_access_token=';
        hugeUrl = hugeUrl + token;
        let url = 'https://api.linkedin.com/v1/people/~?format=json';
        console.log(token);
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(hugeUrl, {
            headers: headers
        }).map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

}
