import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'contact-notes-form',
    templateUrl: 'contact-notes-form.html',
    providers: [FormBuilder]
})
export class ContactNotesForm {
    @Input() contact: any;
    @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();

    form: FormGroup;
    formErrors: any;
    validationMessages: any;

    constructor(private formBuilder: FormBuilder) {
        this.formErrors = {
            'about': [],
            'meet': []
        };

        this.validationMessages = {
            'about': {
                'maxlength': 'This field cannot exceed 1000 characters.'
            },
            'meet': {
                'maxlength': 'This field cannot exceed 80 characters.'
            },
        };
    }

    onTagAdded(tag) {
        let tags = this.form.controls['tags'].value;
        this.form.controls['tags'].setValue(tags);
    }

    onTagRemoved(tag) {
        let tags = this.form.controls['tags'].value;
        delete tags[tag.index];
        this.form.controls['tags'].setValue(tags);
    }

    emit(data) {
        let tags = data.tags.filter(tag => tag).map(tag => tag.name);
        data.tags = tags;
        this.onChanged.emit({data: data, valid: this.form.valid});
    }

    ngOnInit() {
        let formTags = this.contact.tags.map(tag => {
            return {'name': tag};
        });

        this.form = this.formBuilder.group({
            profile: [this.contact.profile],
            about: [this.contact.about, Validators.maxLength(1000)],
            meet: [this.contact.meet, Validators.maxLength(80)],
            tags: [formTags]
        });

        this.form.valueChanges.subscribe(data => {
            if (!this.form) return;

            const form = this.form;

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

            this.emit(data);
        });
    }
}
