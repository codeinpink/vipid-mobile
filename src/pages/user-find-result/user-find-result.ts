import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ShareProfilePage} from '../share-profile/share-profile';


@Component({
    templateUrl: 'user-find-result.html',
})
export class UserFindResultPage {
    user: any;

    constructor(private navCtrl: NavController, private navParams: NavParams) {

    }

    onAddClick() {
        this.navCtrl.push(ShareProfilePage);
    }

    onPageWillEnter() {
        this.user = this.navParams.data;
        console.log(this.user);
    }

}
