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
        return 'https://vipidapp.com/profiles/' + permissions.unique_link + '/';
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            id: [{value: this.permissions.id, disabled: true}, Validators.required],
            unique_link: [{value: this.permissions.unique_link, disabled: true}],
            profile: [this.permissions.profile],
            title: [{value: this.permissions.title, disabled: this.disabled}, Validators.required],
            groups: [this.permissions.groups],
            can_view_phone_number: [{value: this.permissions.can_view_phone_number, disabled: this.disabled}, Validators.required],
            can_view_website: [{value: this.permissions.can_view_website, disabled: this.disabled}, Validators.required],
            can_view_linkedin: [{value: this.permissions.can_view_linkedin, disabled: this.disabled}, Validators.required],
            can_view_github: [{value: this.permissions.can_view_github, disabled: this.disabled}, Validators.required],
            can_view_twitter: [{value: this.permissions.can_view_twitter, disabled: this.disabled}, Validators.required],
            can_view_facebook: [{value: this.permissions.can_view_facebook, disabled: this.disabled}, Validators.required],
            can_view_instagram: [{value: this.permissions.can_view_instagram, disabled: this.disabled}, Validators.required],
            can_view_youtube: [{value: this.permissions.can_view_youtube, disabled: this.disabled}, Validators.required]
        });

        this.form.valueChanges.subscribe(data => {
            data.id = this.permissions.id;
            data.unique_link = this.permissions.unique_link;
            this.onChanged.emit({data: data, valid: this.form.valid});
        });
    }

}
