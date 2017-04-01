import { Component, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  selector: 'profile-detail',
  templateUrl: 'profile-detail.html',
  providers: [InAppBrowser]
})
export class ProfileDetail {
    @Input() profile: any;
    @Input() disabled: boolean;
    @Input() showSummary: boolean = false;
    @Input() hide_missing: boolean;

    constructor(private iab: InAppBrowser) {

    }

    hideMissing(input: any) {
        return this.hide_missing && input == null;
    }

    openURL(url) {
        let browser = this.iab.create(url, '_system');
    }

    isValidURL(text, domain) {
        if (text.indexOf('http') === -1) {
            return true;
        }

        // by now it has http, is it going to the desired domain?
        if (text.indexOf('https://' + domain) === -1 && text.indexOf('http://' + domain) === -1) {
            console.log(text.indexOf('https://' + domain) === -1)
            return false;
        }

        return true;
    }

    getURL(text, domain) {
        let url = text;

        if (url.indexOf('http://' + domain) === 0 || url.indexOf('https://' + domain) === 0) {
            return url;
        }

        return 'https://' + domain +'/' + text;
    }
}
