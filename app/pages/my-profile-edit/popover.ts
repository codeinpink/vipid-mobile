import { Component } from '@angular/core';
import { NavController, PopoverController, ViewController } from 'ionic-angular';
import { ShareableProfileListPage } from '../shareable-profile-list/shareable-profile-list';


@Component({
    template: `
        <ion-list>
            <button ion-item (click)="openShareableProfilesList()">Shareable Profiles</button>
        </ion-list>
    `
})
export class PopoverPage {
    constructor(public viewCtrl: ViewController, private navCtrl: NavController) {}

    openShareableProfilesList() {
        this.navCtrl.push(ShareableProfileListPage);
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
