import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileDetail } from '../../components/profile-detail/profile-detail';
import {ShareProfilePage} from '../share-profile/share-profile';


@Component({
    templateUrl: 'build/pages/user-find-result/user-find-result.html',
    directives: [ProfileDetail],
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
