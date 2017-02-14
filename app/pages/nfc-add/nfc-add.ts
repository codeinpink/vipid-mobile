import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {NFC, Ndef} from 'ionic-native';
import {ShareProfilePage} from '../share-profile/share-profile';


@Component({
    templateUrl: 'build/pages/nfc-add/nfc-add.html',
})
export class NfcAddPage {
    enabled: any;
    message: string;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController) {

    }

    continue() {
        this.navCtrl.push(ShareProfilePage);
    }

    onPageWillEnter() {
        nfc.enabled(_ => this.enabled = true, msg => {
            this.enabled = msg;

            if (this.enabled == 'NFC_DISABLED') {
                let alert = this.alertCtrl.create({
                    title: 'Disabled',
                    subTitle: 'NFC is currently disabled on your device. Please enable it.',
                    buttons: [{
                        text: 'OK',
                        handler: _ => nfc.showSettings()
                    }]
                });
                alert.present();
            } else {
                let alert = this.alertCtrl.create({
                    title: 'Not Supported',
                    subTitle: 'Your device does not support NFC.',
                    buttons: ['OK']
                });
                alert.present();
            }
        });

        let message = Ndef.textRecord('Hello world');
        NFC.share([message]).then(_ => this.message = 'Worked').catch(_ => this.message = "Didn't work");
    }
}
