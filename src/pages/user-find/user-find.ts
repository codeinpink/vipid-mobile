import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfileService } from '../../providers/user-profile/user-profile';
import { UserFindResultPage } from '../user-find-result/user-find-result';
import { SharedProfileViewPage } from '../shared-profile-view/shared-profile-view';
import { ContactFormData } from '../../shared/contact-form-data.model';


@Component({
    templateUrl: 'user-find.html'
})
export class UserFindPage implements OnInit {
    showNoResults: boolean = false;
    searchForm: FormGroup;

    constructor(private nav: NavController, private formBuilder: FormBuilder, private userProfileService: UserProfileService) {}

    onSubmit(data) {
        if (this.searchForm.valid) {
            this.showNoResults = false;
            this.userProfileService.queryByEmail(data.email).subscribe(users => {
                if (users.length === 1) {
                    console.log('opening profile');
                    let contactFormData = new ContactFormData();
                    contactFormData.profile = users[0];
                    contactFormData.profileViewTitle = 'User Found';
                    this.nav.push(SharedProfileViewPage, contactFormData);
                } else {
                    this.showNoResults = true;
                }
            });
        } else {

        }
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            email: ['', Validators.required]
        });
    }
}
