import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileDetail } from '../../components/profile-detail/profile-detail';
import { ShareProfilePage } from '../share-profile/share-profile';


@Component({
    templateUrl: 'build/pages/shared-profile-view/shared-profile-view.html',
    directives: [ProfileDetail],
})
export class SharedProfileViewPage {
    profile: any;

    constructor(private navCtrl: NavController, private navParams: NavParams) {

    }

    onAddClick() {
        this.navCtrl.push(ShareProfilePage);
    }

    onPageWillEnter() {
        this.profile = this.navParams.data;
        console.log(this.profile);
    }

}
