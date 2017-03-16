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

    constructor(private formBuilder: FormBuilder) {

    }

    onTagAdded(tag) {

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
            about: [this.contact.about],
            tags: [formTags]
        });

        this.form.valueChanges.subscribe(data => {
            this.emit(data);
        });
    }
}
