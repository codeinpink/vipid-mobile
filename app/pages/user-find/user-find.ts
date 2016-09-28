import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { UserAddConfirmationModal } from './user-add-confirmation';

/*
  Generated class for the UserFindPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/user-find/user-find.html',
  providers: [FormBuilder, UserService]
})
export class UserFindPage implements OnInit {
    searchForm: FormGroup;
    searchComplete: boolean;
    results: any;

    constructor(private nav: NavController, private modalCtrl: ModalController, private formBuilder: FormBuilder, private userService: UserService) {}

    onSubmit(data) {
        this.userService.getUserByEmailOrPhone(data.email, +data.phone).then(user => {
            this.searchComplete = true;
            this.results.push(user);
        });
    }

    onSearchResultClick(user) {
        let modal = this.modalCtrl.create(UserAddConfirmationModal, {'user': user});
        modal.present(modal);
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            email: [],
            phone: []
        });

        this.searchComplete = false;
        this.results = [];
    }
}
