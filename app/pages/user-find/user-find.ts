import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { UserService } from '../../shared/user.service';

/*
  Generated class for the UserFindPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/user-find/user-find.html',
  providers: [UserService]
})
export class UserFindPage implements OnInit {
    searchForm: ControlGroup;
    searchComplete: boolean;
    results: any;

    constructor(private nav: NavController, private formBuilder: FormBuilder, private userService: UserService) {}

    onSubmit(data) {
        this.userService.getUserByEmailOrPhone(data.email, +data.phone).then(user => {
            this.searchComplete = true;
            this.results.push(user);
        });
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
