import {Injectable} from '@angular/core';

@Injectable()
export class CredentialsService {

    googleToken: string;


    constructor(){}

    setGoogleToken(token: string){
        this.googleToken = token;
    }

}