import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileDetail } from '../../components/profile-detail/profile-detail';
import { ContactAddSetPermissionsPage } from '../contact-add-set-permissions/contact-add-set-permissions';
import { ContactFormData } from '../../shared/contact-form-data.model';


@Component({
    templateUrl: 'build/pages/shared-profile-view/shared-profile-view.html',
    directives: [ProfileDetail],
})
export class SharedProfileViewPage {
    title: string;
    data: ContactFormData;

    constructor(private navCtrl: NavController, private navParams: NavParams) {

    }

    onAddClick() {
        console.log('onAddClick');
        this.navCtrl.push(ContactAddSetPermissionsPage, this.data);
    }

    ngOnInit() {
        console.log('ngOnInit');
        this.title = this.navParams.data.profileViewTitle;
        this.data = this.navParams.data;
    }

}
