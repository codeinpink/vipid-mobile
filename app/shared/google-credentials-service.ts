import {Injectable} from '@angular/core';

@Injectable()
export class GoogleCredentialsService {

    googleToken: string;


    constructor(){}

    setGoogleToken(token: string){
        this.googleToken = token;
    }

}