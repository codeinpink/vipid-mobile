import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { GroupService } from '../../shared/group.service';


@Component({
    templateUrl: 'build/pages/group-create/group-create.html',
    providers: [FormBuilder, GroupService]
})
export class GroupCreatePage {
    groupForm: ControlGroup;

    constructor(private nav: NavController, private formBuilder: FormBuilder, private groupService: GroupService) {
        this.groupForm = this.formBuilder.group({
            name: ['', Validators.required],
        });
    }

    onSubmit(group) {
        this.groupService.createGroup(group).then(_ => this.nav.pop());
    }
}
