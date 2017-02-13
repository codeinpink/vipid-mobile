import { Component, OnInit } from '@angular/core'
import { NavController } from 'ionic-angular';
import { GooglePlus } from 'ionic-native'
import { GoogleCredentialsService } from "../../shared/google-credentials-service"
import { Contacts } from 'ionic-native';

//https://github.com/EddyVerbruggen/cordova-plugin-googleplus/issues/165
//https://github.com/EddyVerbruggen/cordova-plugin-googleplus
//Cordova ui plugin requires wizardry. Proceed with caution
@Component({
    templateUrl: 'build/pages/user-settings/user-settings.html',
    providers: [GoogleCredentialsService]
})
export class UserSettingsPage implements OnInit {

    constructor(private nav: NavController, private credentials: GoogleCredentialsService){}

    //TODO: Check if user is signed in
    ngOnInit(){



    }


    //Contacts
    onPhoneSignInClick(){
        //Temp store of ion key. retrieve from server later on. Client side should NOT Keep our key.
        //Also key should be passed via TLS for security to guard from packet sniffing.
        let ionKey = "522993124605-nbheg7cbfmnarr9bm11vgkepj5kk5ivi.apps.googleusercontent.com"

        //Googleplus login options
        let loginOpts = {
            'webClientId' : ionKey,
            'offline' : true
        }

        //NOTE: BUILD WILL FAIL IF YOU DON'T ACCEPT
        //BOTH THE ANDROID SUPPORT REPOSITORY AND GOOGLE
        //REPOSITORY ON ANDROID SDK MANAGER
        GooglePlus.login(loginOpts).then(successful => {
            this.credentials.setGoogleToken(successful)

            //Console output for debug
            console.log(successful)
        }).catch(error =>
        console.log("error " + error)
        )
    }

    //Contacts
    onPhoneSignOutClick(){

        GooglePlus.logout().then(success => {
            console.log(success)
        }).catch(err => console.log(err))
    }



}