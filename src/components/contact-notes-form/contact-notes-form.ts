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

    ngOnInit() {
        this.form = this.formBuilder.group({
            about: [this.contact.about],
            tags: [this.contact.tags],
        });

        this.form.valueChanges.subscribe(data => {
            this.onChanged.emit({data: data, valid: this.form.valid});
        });
    }
}
