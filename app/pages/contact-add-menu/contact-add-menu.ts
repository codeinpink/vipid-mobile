import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ContactCreatePage } from '../contact-create/contact-create';
import { UserFindPage } from '../user-find/user-find';
import { NfcAddPage } from '../nfc-add/nfc-add';
import { BarcodeScanner } from 'ionic-native';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';
import { SharedProfileViewPage } from '../shared-profile-view/shared-profile-view';

/*
  Generated class for the ContactAddMenuPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/contact-add-menu/contact-add-menu.html',
  providers: [ShareableProfileService]
})
export class ContactAddMenuPage {
    constructor(private nav: NavController, private alertCtrl: AlertController, private shareableProfileService: ShareableProfileService) {}

    onFindContactClick() {
        this.nav.push(UserFindPage);
    }

    onCreateContactClick() {
        this.nav.push(ContactCreatePage);
    }

    onNFCAddClick() {
        this.nav.push(NfcAddPage);
    }

    onQRScanClick() {
        BarcodeScanner.scan({
            formats: "QR_CODE",
            prompt: "Place a QR code inside the scan area"
        }).then((barcodeData) => {
            if (barcodeData.cancelled === false) {
                console.log(barcodeData.text);
                this.shareableProfileService.decodeProfileURL(barcodeData.text).subscribe(data => {
                    console.log(data);
                    this.nav.push(SharedProfileViewPage, data.profile);
                }, errors => {
                    console.log(errors);
                })
            }
        }, (error) => {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'The QR Scanner could not be opened.',
                buttons: ['OK']
            });

            alert.present();
        });
    }
}
