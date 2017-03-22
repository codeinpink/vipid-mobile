import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GroupService } from '../../shared/group.service';


@Component({
    templateUrl: 'group-create.html',
    providers: [FormBuilder, GroupService]
})
export class GroupCreatePage {
    groupForm: FormGroup;

    constructor(private nav: NavController, private formBuilder: FormBuilder, private groupService: GroupService) {
        this.groupForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    onSubmit(group) {
        this.groupService.createGroup(group).subscribe(_ => this.nav.pop());
    }
}
