import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'shareable-profile-form',
    templateUrl: 'shareable-profile-form.html',
    providers: [FormBuilder]
})
export class ShareableProfileForm {
    @Input() permissions: any;
    @Input() disabled: boolean;
    @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();

    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {

    }

    getProfileLink(permissions) {
        return 'http://vipidapp.com/profiles/' + permissions.unique_link + '/';
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            id: [this.permissions.id, Validators.required],
            profile: [this.permissions.profile],
            title: [this.permissions.title, Validators.required],
            groups: [this.permissions.groups],
            can_view_phone_number: [this.permissions.can_view_phone_number, Validators.required],
            can_view_website: [this.permissions.can_view_website, Validators.required],
            can_view_linkedin: [this.permissions.can_view_linkedin, Validators.required],
            can_view_github: [this.permissions.can_view_github, Validators.required],
            can_view_twitter: [this.permissions.can_view_twitter, Validators.required],
            can_view_facebook: [this.permissions.can_view_facebook, Validators.required],
            can_view_instagram: [this.permissions.can_view_instagram, Validators.required],
            can_view_youtube: [this.permissions.can_view_youtube, Validators.required]
        });

        this.form.valueChanges.subscribe(data => {
            this.onChanged.emit({data: data, valid: this.form.valid});
        })
    }

}
