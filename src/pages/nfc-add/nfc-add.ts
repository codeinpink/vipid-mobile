import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {NFC, Ndef} from 'ionic-native';
import { ContactPermissions } from '../../shared/contact-permissions.model';


@Component({
    templateUrl: 'nfc-add.html',
})
export class NfcAddPage {
    enabled: any;
    message: string;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController) {

    }

    continue() {
        let permissions = new ContactPermissions();
        //this.navCtrl.push(ShareProfilePage, {permissions: permissions, isCreating: true});
    }

    onNfcTagReceived() {
        this.message = 'Received';
    }

    onPageWillEnter() {
        NFC.enabled().then(() => {
            this.enabled = true;

            NFC.addMimeTypeListener('text/json', this.onNfcTagReceived);//.subscribe(_ => this.message = 'Received');
            let message = Ndef.textRecord('Hello world');
            NFC.share([message]).then(_ => this.message = 'Worked').catch(_ => this.message = "Didn't work");
        }, msg => {
            this.enabled = msg;

            if (this.enabled == 'NFC_DISABLED') {
                let alert = this.alertCtrl.create({
                    title: 'Disabled',
                    subTitle: 'NFC is currently disabled on your device. Please enable it.',
                    buttons: [{
                        text: 'OK',
                        handler: _ => NFC.showSettings()
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
