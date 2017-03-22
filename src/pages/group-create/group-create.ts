import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Group } from '../../shared/group.model';
import { GroupService } from '../../shared/group.service';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
    templateUrl: 'group-create.html',
    providers: [FormBuilder, GroupService]
})
export class GroupCreatePage {
    mode: string = 'CREATE';
    title: string = 'Create Group';
    submitText: string = 'Create Group';
    group: Group;
    groupForm: FormGroup;

    constructor(private nav: NavController, private navParams: NavParams, private fb: FormBuilder, private groupService: GroupService,
    private nm: NotificationManager) {

    }

    onSubmit(group) {
        if (this.groupForm.valid && this.groupForm.dirty) {
            if (this.mode === 'CREATE') {
                this.groupService.createGroup(group).subscribe(_ => {
                    this.nav.pop().then(_ => this.nm.showSuccessMessage('Group created'));
                });
            } else {
                this.group.name = group.name;
                this.groupService.updateGroup(this.group).subscribe(_ => {
                    this.nav.pop().then(_ => this.nm.showSuccessMessage('Group updated'));
                });
            }
        }
    }

    ngOnInit() {
        let group = this.navParams.get('group');

        if (group) {
            this.mode = 'UPDATE';
            this.title = 'Update Group';
            this.submitText = 'Update Group';
            this.group = group;
        } else {
            this.group = new Group();
        }

        this.groupForm = this.fb.group({
            name: [this.group.name, Validators.compose([Validators.required, Validators.maxLength(50)])]
        });
    }
}
