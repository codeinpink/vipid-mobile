import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfileService } from '../../providers/user-profile/user-profile';
import { UserFindResultPage } from '../user-find-result/user-find-result';


@Component({
    templateUrl: 'build/pages/user-find/user-find.html',
    providers: [FormBuilder, UserProfileService]
})
export class UserFindPage implements OnInit {
    searchForm: FormGroup;

    constructor(private nav: NavController, private formBuilder: FormBuilder, private userProfileService: UserProfileService) {}

    onSubmit(data) {
        this.userProfileService.queryByEmail(data.email).subscribe(users => {
            this.nav.push(UserFindResultPage, users[0]);
        });
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            email: []
        });
    }
}
