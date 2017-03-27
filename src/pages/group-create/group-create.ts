import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Group } from '../../shared/group.model';
import { GroupService } from '../../shared/group.service';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
    templateUrl: 'group-create.html',
})
export class GroupCreatePage {
    mode: string = 'CREATE';
    title: string = 'Create Group';
    submitText: string = 'Create Group';
    group: Group;
    groupForm: FormGroup;
    formErrors: any;
    validationMessages: any;

    constructor(private nav: NavController, private navParams: NavParams, private fb: FormBuilder, private groupService: GroupService,
    private nm: NotificationManager) {

    }

    onSubmit(group) {
        if (this.groupForm.valid && this.groupForm.dirty) {
            if (this.mode === 'CREATE') {
                this.groupService.createGroup(group).subscribe(_ => {
                    this.nav.pop().then(_ => this.nm.showSuccessMessage('Group created'));
                }, errors => {
                    this.handleErrorsFromServer(errors);
                });
            } else {
                this.group.name = group.name;
                this.groupService.updateGroup(this.group).subscribe(_ => {
                    this.nav.pop().then(_ => this.nm.showSuccessMessage('Group updated'));
                }, errors => {
                    this.handleErrorsFromServer(errors);
                });
            }
        }
    }

    handleErrorsFromServer(errors) {
        for (const key in errors) {
            this.formErrors[key] = [];

            for (let error in errors[key]) {
                this.formErrors[key].push(errors[key][error]);
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

        this.formErrors = {
            'name': [],
            'non_field_errors': []
        };

        this.validationMessages = {
            'name': {
                'required': 'This field may not be blank.',
                'maxlength': 'This field cannot exceed 50 characters.'
            },
        };

        this.groupForm.valueChanges.subscribe(data => {
            if (!this.groupForm) return;

            const form = this.groupForm;

            for (const field in this.formErrors) {
                this.formErrors[field] = [];
                const control = form.get(field);

                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        this.formErrors[field].push(messages[key]);
                    }
                }
            }
        });
    }
}
