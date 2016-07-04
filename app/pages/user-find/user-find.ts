import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';

/*
  Generated class for the UserFindPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/user-find/user-find.html',
})
export class UserFindPage implements OnInit {
    searchForm: ControlGroup;

    constructor(private nav: NavController, private formBuilder: FormBuilder) {}

    onSubmit(data) {
        console.log(data);
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            email: [],
            phone: []
        });
    }
}
