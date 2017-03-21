import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ShareableProfile } from '../../shared/shareable-profile.model';
import { ShareableProfileService } from '../../providers/shareable-profile/shareable-profile';


@Component({
    template: `
        <ion-list>
            <button ion-item (click)="onDeleteClick()">DELETE</button>
        </ion-list>
    `,
    providers: [ShareableProfileService]
})
export class PopoverPage {
    profile: ShareableProfile;

    constructor(public viewCtrl: ViewController, private navCtrl: NavController, private navParams: NavParams, private shareableProfileService: ShareableProfileService) {
        this.profile = this.navParams.get('profile');
    }

    onDeleteClick() {
        this.shareableProfileService.deleteProfile(this.profile.id).subscribe(_ => {
            this.navCtrl.pop();
            this.close();
            this.navCtrl.pop();
        });
    }

    close() {
        return this.viewCtrl.dismiss();
    }
}
