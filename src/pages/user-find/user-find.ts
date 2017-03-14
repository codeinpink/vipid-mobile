import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfileService } from '../../providers/user-profile/user-profile';
import { UserFindResultPage } from '../user-find-result/user-find-result';
import { SharedProfileViewPage } from '../shared-profile-view/shared-profile-view';
import { ContactFormData } from '../../shared/contact-form-data.model';


@Component({
    templateUrl: 'user-find.html',
    providers: [FormBuilder, UserProfileService]
})
export class UserFindPage implements OnInit {
    searchForm: FormGroup;

    constructor(private nav: NavController, private formBuilder: FormBuilder, private userProfileService: UserProfileService) {}

    onSubmit(data) {
        this.userProfileService.queryByEmail(data.email).subscribe(users => {
            console.log('opening profile');
            let contactFormData = new ContactFormData();
            contactFormData.profile = users[0];
            contactFormData.profileViewTitle = 'User Found';
            this.nav.push(SharedProfileViewPage, contactFormData);
        });
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            email: []
        });
    }
}
