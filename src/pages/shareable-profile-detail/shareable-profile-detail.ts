import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { ShareableProfile } from '../../shared/shareable-profile.model';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';
import { ShareableProfileEditPage } from '../shareable-profile-edit/shareable-profile-edit';
import { PopoverPage } from './popover';
import { BarcodeScanner } from 'ionic-native';
import { ContactFormData } from '../../shared/contact-form-data.model';
import { SharedProfileViewPage } from '../shared-profile-view/shared-profile-view';


@Component({
    templateUrl: 'shareable-profile-detail.html'
})
export class ShareableProfileDetailPage {
    profileSubscription: any;
    profile: ShareableProfile;

    constructor(private navCtrl: NavController, private navParams: NavParams, private shareableProfileService: ShareableProfileService,
    private popoverCtrl: PopoverController, private alertCtrl: AlertController) {

    }

    getProfileLink(profile) {
        return 'https://vipidapp.com/profiles/' + profile.unique_link + '/';
    }

    onQRScanClick() {
        BarcodeScanner.scan({
            formats: "QR_CODE",
            prompt: "Place a QR code inside the scan area"
        }).then((barcodeData) => {
            if (barcodeData.cancelled === false) {
                this.shareableProfileService.decodeProfileURL(barcodeData.text).subscribe(data => {
                    let contactFormData = new ContactFormData();
                    contactFormData.profile = data.profile;
                    contactFormData.referral = data.unique_link;
                    contactFormData.popDestination = 1;
                    this.navCtrl.push(SharedProfileViewPage, contactFormData);
                }, errors => {
                    let alert = this.alertCtrl.create({
                        title: 'Profile Not Found',
                        subTitle: 'The profile associated with that code could not be found.',
                        buttons: ['OK']
                    });

                    alert.present();
                });
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

    onMoreClick(event) {
        let popover = this.popoverCtrl.create(PopoverPage, {profile: this.profile});
        popover.present({ev: event});
    }

    onEditClick() {
        this.navCtrl.push(ShareableProfileEditPage, {profile: this.profile});
    }

    onChanged() {}

    ngOnInit() {
        let id = +this.navParams.get('id');
        this.profileSubscription = this.shareableProfileService.getProfiles().subscribe(profiles => {
            this.profile = profiles.filter(profile => profile.id === id)[0];
        });
    }

    ngOnDestroy() {
        this.profileSubscription.unsubscribe();
    }
}
