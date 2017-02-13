import { Component, OnInit } from '@angular/core'
import { NavController } from 'ionic-angular';
import { GooglePlus } from 'ionic-native'
import { CredentialsService } from "../../shared/credentials-service"
import { Contacts } from 'ionic-native';


@Component({
    templateUrl: 'build/pages/user-settings/user-settings.html',
    providers: [CredentialsService]
})
export class UserSettingsPage implements OnInit {

    constructor(private nav: NavController, private credentials: CredentialsService){}

    //TODO: Check if user is signed in
    ngOnInit(){


    }


    //Contacts
    onPhoneSignInClick(){
        let ionKey = "522993124605-nbheg7cbfmnarr9bm11vgkepj5kk5ivi.apps.googleusercontent.com"

        //Googleplus login options
        let loginOpts = {
            'webClientId' : ionKey,
            'offline' : true
        }



        //NOTE: BUILD WILL FAIL IF YOU DON'T ACCEPT
        //BOTH THE ANDROID SUPPORT REPOSITORY AND GOOGLE
        //REPOSITORY
        GooglePlus.login(loginOpts).then(successful => {
            // this.credentials.setGoogleToken(successful.serverAuthCode)

            console.log(successful)

        }).catch(error =>
        console.log("error " + error))

    }



}